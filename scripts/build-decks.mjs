// decks/<名前>/slides.md をすべてビルドして dist/<名前>/ に出力し、一覧ページ dist/index.html を作る。
// Slidev は slides.md のあるフォルダから components / layouts / global-top.vue / style.css を読むので、
// デッキごとに見た目や部品を分けられる(decks/intro は biim スタイル、decks/workflow はダークのアニメーション)。
//
//   node scripts/build-decks.mjs [--base /slide/]
//
// GitHub Pages のようにサブディレクトリで公開する場合、各デッキの base は <base><名前>/ になる。
// ルーターは hash モードにするので、リロードや URL の直打ちでも 404 にならない。
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const decksDir = join(root, 'decks')
// シェルを通さず、Slidev の CLI を node で直接実行する
const slidevBin = join(dirname(createRequire(import.meta.url).resolve('@slidev/cli/package.json')), 'bin', 'slidev.mjs')
const dist = join(root, 'dist')

const args = process.argv.slice(2)
const baseIndex = args.indexOf('--base')
let base = baseIndex >= 0 ? args[baseIndex + 1] : '/'
if (!base.startsWith('/')) base = `/${base}`
if (!base.endsWith('/')) base = `${base}/`

const names = readdirSync(decksDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(join(decksDir, d.name, 'slides.md')))
  .map(d => d.name)
  .sort()

if (!names.length) {
  console.error('decks/<名前>/slides.md のデッキが見つかりません')
  process.exit(1)
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

/** 冒頭の frontmatter から title を読む(なければ名前) */
function readTitle(name) {
  const text = readFileSync(join(decksDir, name, 'slides.md'), 'utf8')
  const head = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  return head.match(/^title:\s*(.+?)\s*$/m)?.[1] ?? name
}

const escapeHtml = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

for (const name of names) {
  console.log(`\n=== ${name} ===`)
  const result = spawnSync(process.execPath, [
    slidevBin, 'build', join('decks', name, 'slides.md'),
    '--base', `${base}${name}/`,
    '--out', join(dist, name),
    '--router-mode', 'hash',
  ], { cwd: root, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const items = names.map(name =>
  `      <li><a href="./${name}/"><span class="t">${escapeHtml(readTitle(name))}</span><span class="p">/${name}/</span></a></li>`,
).join('\n')

writeFileSync(join(dist, 'index.html'), `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>enbu slides</title>
    <style>
      :root { color-scheme: light dark; }
      body { max-width: 40rem; margin: 3rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
      h1 { font-size: 1.4rem; }
      ul { list-style: none; padding: 0; }
      li + li { margin-top: .5rem; }
      a { display: flex; justify-content: space-between; gap: 1rem; padding: .75rem 1rem; border: 1px solid #8884; border-radius: 6px; color: inherit; text-decoration: none; }
      a:hover { background: #8882; }
      .p { opacity: .6; font-family: ui-monospace, monospace; }
    </style>
  </head>
  <body>
    <h1>enbu slides</h1>
    <ul>
${items}
    </ul>
  </body>
</html>
`)
console.log(`\n${names.length} 件のデッキを dist/ に出力しました: ${names.join(', ')}`)
