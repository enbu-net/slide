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

sechack はノートをあかねボイスで読み上げられる。URL に `?voice` を付けるか `v` キーで読み上げ、`?voice=auto` なら読み終わると次へ進む。
音声は `decks/sechack/public/voice/` にあり、ノートを変えたら [aoikane](https://github.com/a-kaibu/aoikane) で作り直す。
各スライドの `est` も実測値(セリフ + 0.6 秒)に直し、デモに残りを割り当てて合計 10 分にそろえる。

```sh
aoikane serve --listen 127.0.0.1:18080   # 別の端末で
python3 scripts/sechack-voice.py
```

[yashikota/biim-slide](https://github.com/yashikota/biim-slide) の外枠をそのまま使っている。

- 各スライドの frontmatter に `est`(予定時間)を書く。右下のスプリット表に累計で出る
- セリフ欄はスライド末尾のノート(`<!-- -->`)。1 行 1 コメントで、`[click:N]` で N クリック目に出す
- タイマーは最初に先へ進んだときに自動で始まる。`s` で開始/停止、`r` でリセット(停止中のみ)
- `components/Enbu*.vue` はこのデッキの図の部品(`EnbuStage` は中身を中央に置いて拡大、`EnbuBox` は箱、`EnbuArrow` は矢印)
