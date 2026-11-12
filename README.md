# enbu slides

enbu のスライド置き場。[Slidev](https://sli.dev/) で作っていて、GitHub Pages で見られる。

| デッキ | 内容 | URL |
|---|---|---|
| `decks/intro/` | enbu の紹介(biim スタイル) | https://enbu-net.github.io/slide/intro/ |
| `decks/sechack/` | SecHack365 の 10 分発表(biim スタイル、1 ページ 1 メッセージ) | https://enbu-net.github.io/slide/sechack/ |
| `decks/workflow/` | `init` / `add` / `pull` / `sync` の流れのアニメーション | https://enbu-net.github.io/slide/workflow/ |

https://enbu-net.github.io/slide/ に一覧が出る。

開いている PR のスライドは https://enbu-net.github.io/slide/pr/<PR 番号>/ で見られる(一覧は https://enbu-net.github.io/slide/pr/)。
PR ごとに `preview.yml` が読み取り権限だけでビルドし、`deploy.yml` が main と開いている PR の成果物をまとめて公開し直す(`scripts/collect-previews.mjs`)。
閉じた PR のプレビューは次の公開で消える。フォークからの PR は載せない。

## 使い方

```sh
pnpm install
pnpm dev:intro      # 紹介スライドを開く
pnpm dev:sechack    # SecHack365 の 10 分発表を開く
pnpm dev:workflow   # workflow のスライドを開く
pnpm build          # すべてのデッキを dist/<名前>/ にビルドし、dist/index.html に一覧を作る
```

## 構成

デッキは `decks/<名前>/slides.md` に置く。Slidev は `slides.md` のあるフォルダから
`components/`、`layouts/`、`global-top.vue`、`style.css` などを読むので、デッキごとに部品と見た目が分かれている。
`decks/<名前>/` を足せば `pnpm build` が自動で拾う。ルーターは hash モードなので、リロードしても 404 にならない。

### intro / sechack(biim スタイル)

`decks/sechack/` は intro の外枠と部品をコピーしたもの。外枠を直すときは両方そろえる。

sechack は各ページの `section`（1〜9）で所属セクションを指定し、本文の上に現在位置を表示する。
表紙は `section: 0`、章の区切りは `sectionDivider: true` を指定する。
章名は `decks/sechack/composables/sections.ts` で、現在位置と目次に共通で使う。

sechack はノートをあかねボイスで読み上げられる。URL に `?voice` を付けるか `v` キーで読み上げる。`a` キー(または `?voice=auto`)はオートモードで、タイマーを動かし、読み終わると次へ進んで最後まで通す。デモのスライド(`voiceHold: true`)では `est` の時間まで待ってから進むので、動画の長さをその時間に合わせる。 `0` か `Home` キーで最初のページに戻る。
音声は `decks/sechack/public/voice/` にあり、ノートを変えたら [aoikane](https://github.com/a-kaibu/aoikane) と FFmpeg で作り直す。
各スライドの `est` も実測値(セリフ + 0.6 秒)に直し、デモに残りを割り当てて合計 10 分にそろえる。

```sh
aoikane serve --listen 127.0.0.1:18080   # 別の端末で
python3 scripts/sechack-voice.py --rate 1.25
```

読み上げ速度は既定で1.25倍。`--rate` で変更でき、声と速度ごとに音声をキャッシュする。

sechack の右側の予定表はクリック段階ごとに分かれる。ページを開いた直後が `3 - 1`、
次のクリック後が `3 - 2`。右上の現在位置も連動し、段階を進めた瞬間に予定との差を記録する。
`clickEst` は各段階を終える予定時刻（ページ開始からの秒数）で、音声生成時に実測値から更新する。
音声生成前の編集中は、ページの `est` を段階数で均等に分ける。
タイマーのクリック別記録、停止と再開、リセットは `pnpm test` で検証できる。
オート送りは予定表と同じ累計時刻を使い、読み込みなどの遅れを次の間から吸収する。
次の音声を先読みし、再生が許可されてからタイマーを開始する。音声は途中で切らない。

[yashikota/biim-slide](https://github.com/yashikota/biim-slide) の外枠をそのまま使っている。

- 各スライドの frontmatter に `est`(予定時間)を書く。右下のスプリット表に累計で出る
- セリフ欄はスライド末尾のノート(`<!-- -->`)。1 行 1 コメントで、`[click:N]` で N クリック目に出す
- タイマーは最初に先へ進んだときに自動で始まる。`s` で開始/停止、`r` でリセット(停止中のみ)
- `components/Enbu*.vue` はこのデッキの図の部品(`EnbuStage` は中身を中央に置いて拡大、`EnbuBox` は箱、`EnbuArrow` は矢印)
