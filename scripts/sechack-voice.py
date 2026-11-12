#!/usr/bin/env python3
"""decks/sechack のノートを、あかねボイス(aoikane)で読み上げ音声にして、est を実測値に合わせる。

  aoikane serve --listen 127.0.0.1:18080   # 別の端末で(複数立てると並列で速い)
  python3 scripts/sechack-voice.py [--url http://127.0.0.1:18080 ...] [--total 600] [--rate 1.25]

- ノートを [click:N] ごとに区切り、public/voice/sNN_J.mp3(NN = ページ、J = 何個目のセリフ)に書く。
  合成した wav は文章と合成条件のハッシュで .cache/ に置き、同じ条件なら作り直さない。
- 各スライドの est を「セリフの長さ + 区切りごとの間(GAP 秒)」にし、
  デモのスライドに残りを割り当てて、合計をちょうど --total 秒にする。
- 要るもの: aoikane(github.com/a-kaibu/aoikane)と ffmpeg。
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import tempfile
import threading
import urllib.request
import wave
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DECK = os.path.join(ROOT, 'decks', 'sechack')
SLIDES = os.path.join(DECK, 'slides.md')
OUT = os.path.join(DECK, 'public', 'voice')
CACHE = os.path.join(ROOT, '.cache', 'sechack-voice')
VOICE = 'KotonohaAkane_ns_48'
DEMO_TITLE = 'デモ'
# 区切りごとの間(秒)。BiimVoice.vue の自動送りの待ち(600 ms)と同じ値にしておく
GAP = 0.6

ap = argparse.ArgumentParser()
ap.add_argument('--url', action='append', help='aoikane serve の URL(複数可)')
ap.add_argument('--total', type=int, default=600, help='合計の秒数(オートモードで通すと毎回この長さになる)')
ap.add_argument('--rate', type=float, default=1.25, help='読み上げ速度(既定: 1.25 倍。説明とデモを10分に収める)')
args = ap.parse_args()
urls = args.url or ['http://127.0.0.1:18080']

text = open(SLIDES, encoding='utf-8').read()
parts = re.split(r'\n(?=---\ntitle: )', text)


def segments(part):
    """ノートのセリフ。composables/liveSlide.ts の parseComments と同じく、空でない 1 行が 1 セリフ。"""
    notes = re.findall(r'<!--\n(.*?)\n-->', part, re.S)
    note = notes[-1] if notes else ''
    lines = (line.strip() for line in note.split('\n'))
    return [re.sub(r'^\[click(?::\d+|\+\d+)?\]\s*', '', line) for line in lines if line]


os.makedirs(OUT, exist_ok=True)
os.makedirs(CACHE, exist_ok=True)
jobs = []
for i, part in enumerate(parts):
    for j, seg in enumerate(segments(part)):
        jobs.append((f's{i + 1:02d}_{j}', seg))

# localhost の aoikane にはプロキシを通さない
opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
lock = threading.Lock()
counter = iter(range(10 ** 9))


def synth(job):
    """1 セリフを合成して(前回と同じ文章なら使い回し)mp3 にし、長さ(秒)を返す。"""
    name, seg = job
    # 声や速度が違う音声を再利用しないよう、合成条件もキャッシュキーに含める。
    cache_key = json.dumps({'text': seg, 'voice': VOICE, 'rate': args.rate}, ensure_ascii=False, sort_keys=True)
    wav = os.path.join(CACHE, hashlib.sha256(cache_key.encode()).hexdigest()[:16] + '.wav')
    if not os.path.exists(wav):
        with lock:
            url = urls[next(counter) % len(urls)]
        req = urllib.request.Request(
            url.rstrip('/') + '/v1/synthesize',
            data=json.dumps({'text': seg, 'voice': VOICE, 'rate': args.rate}).encode(),
            headers={'Content-Type': 'application/json'},
        )
        data = opener.open(req, timeout=1800).read()
        # 同じ文章を別のスレッドが同時に書いても壊れないよう、書き手ごとの一時ファイルから置き換える
        fd, tmp = tempfile.mkstemp(dir=CACHE, suffix='.wav')
        with os.fdopen(fd, 'wb') as f:
            f.write(data)
        os.replace(tmp, wav)
        print('synth', name, flush=True)
    mp3 = os.path.join(OUT, name + '.mp3')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-ar', '24000',
                    '-codec:a', 'libmp3lame', '-b:a', '48k', mp3], check=True)
    w = wave.open(wav)
    return name, w.getnframes() / w.getframerate()


with ThreadPoolExecutor(len(urls)) as ex:
    durations = dict(ex.map(synth, jobs))

# 使われなくなった音声を消す
names = {name for name, _ in jobs}
for f in os.listdir(OUT):
    if f.endswith('.mp3') and f[:-4] not in names:
        os.remove(os.path.join(OUT, f))

ests = []
demo = None
for i, part in enumerate(parts):
    title = re.search(r'^title: (.*)$', part, re.M).group(1) if i else ''
    segs = segments(part)
    sec = sum(durations[f's{i + 1:02d}_{j}'] for j in range(len(segs))) + GAP * len(segs)
    if title == DEMO_TITLE:
        demo = i
        ests.append(0)
    else:
        ests.append(round(sec))
if demo is None:
    raise SystemExit(f'title: {DEMO_TITLE} のスライドが見つかりません')
non_demo_total = sum(ests)
ests[demo] = args.total - non_demo_total
if ests[demo] <= 0:
    raise SystemExit(f'デモを除いても {non_demo_total} 秒あり、{args.total} 秒に収まりません')

out = []
for part, est in zip(parts, ests):
    new, n = re.subn(r'^est: .*$', f'est: {est // 60}:{est % 60:02d}', part, count=1, flags=re.M)
    if n != 1:
        raise SystemExit('est のないスライドがあります: ' + part.split('\n', 3)[1])
    out.append(new)
# 途中で失敗しても slides.md を壊さないよう、同じフォルダの一時ファイルに書いてから置き換える
fd, tmp = tempfile.mkstemp(dir=DECK, prefix='.slides-', suffix='.md')
try:
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))
    os.chmod(tmp, os.stat(SLIDES).st_mode)
    os.replace(tmp, SLIDES)
finally:
    if os.path.exists(tmp):
        os.remove(tmp)
print(f'合計 {sum(ests)} 秒(デモ {ests[demo]} 秒)')
