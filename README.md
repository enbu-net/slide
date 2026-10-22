# enbu slides

enbu のスライド置き場。[Slidev](https://sli.dev/) で作っていて、GitHub Pages で見られる。

| デッキ | 内容 | URL |
|---|---|---|
| `decks/intro/` | enbu の紹介(biim スタイル) | https://enbu-net.github.io/slide/intro/ |
| `decks/workflow/` | `init` / `add` / `pull` / `sync` の流れのアニメーション | https://enbu-net.github.io/slide/workflow/ |

https://enbu-net.github.io/slide/ に一覧が出る。

## 使い方

```sh
pnpm install
pnpm dev:intro      # 紹介スライドを開く
pnpm dev:workflow   # workflow のスライドを開く
pnpm build          # すべてのデッキを dist/<名前>/ にビルドし、dist/index.html に一覧を作る
```

## 構成

デッキは `decks/<名前>/slides.md` に置く。Slidev は `slides.md` のあるフォルダから
`components/`、`layouts/`、`global-top.vue`、`style.css` などを読むので、デッキごとに部品と見た目が分かれている。
`decks/<名前>/` を足せば `pnpm build` が自動で拾う。ルーターは hash モードなので、リロードしても 404 にならない。

### intro(biim スタイル)

[yashikota/biim-slide](https://github.com/yashikota/biim-slide) の外枠をそのまま使っている。

- 各スライドの frontmatter に `est`(予定時間)を書く。右下のスプリット表に累計で出る
- セリフ欄はスライド末尾のノート(`<!-- -->`)。1 行 1 コメントで、`[click:N]` で N クリック目に出す
- タイマーは最初に先へ進んだときに自動で始まる。`s` で開始/停止、`r` でリセット(停止中のみ)
- `components/Enbu*.vue` はこのデッキの図の部品(`EnbuStage` は中身を中央に置いて拡大、`EnbuBox` は箱、`EnbuArrow` は矢印)
