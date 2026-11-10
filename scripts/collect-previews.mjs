// 開いている PR のプレビュー(preview.yml がビルドした静的ファイル)を dist/pr/<番号>/ に集め、
// 一覧 dist/pr/index.html を作る。main のビルドのあとに、deploy.yml から実行する。
//
//   GH_TOKEN=... GITHUB_REPOSITORY=enbu-net/slide node scripts/collect-previews.mjs
//
// GitHub Pages を「GitHub Actions から公開」のまま使うので、公開は毎回サイト全体の差し替えになる。
// そのため main と開いている PR をまとめて公開し直す。閉じた PR は次の公開で消える。
// ここでは PR のコードを実行しない。読み取り権限だけでビルドされた成果物を取ってくるだけ。
// 同じ origin で公開するので、対象は同じリポジトリのブランチの PR だけ(フォークの PR は載せない)。
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const repo = process.env.GITHUB_REPOSITORY ?? '{owner}/{repo}' // ローカルでは gh が origin から補う
const site = (process.env.PAGES_URL ?? '').replace(/\/$/, '')

const gh = (...args) => {
  const r = spawnSync('gh', args, { cwd: root, encoding: 'utf8' })
  return { ok: r.status === 0, out: r.stdout, err: r.stderr }
}
const api = path => {
  const r = gh('api', path)
  if (!r.ok) throw new Error(`gh api ${path}: ${r.err}`)
  return JSON.parse(r.out)
}
const escapeHtml = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const prs = api(`repos/${repo}/pulls?state=open&per_page=100`)
  .filter(pr => pr.head.repo?.full_name === pr.base.repo.full_name)
  .sort((a, b) => a.number - b.number)

rmSync(join(dist, 'pr'), { recursive: true, force: true })
mkdirSync(join(dist, 'pr'), { recursive: true })

const results = []
for (const pr of prs) {
  // preview.yml がまだ一度も動いていないと 404 になる。そのときはビルド待ちとして扱う
  const found = gh('api', `repos/${repo}/actions/workflows/preview.yml/runs?head_sha=${pr.head.sha}&status=success&per_page=1`)
  const runs = found.ok ? JSON.parse(found.out).workflow_runs : []
  let state = 'pending' // まだビルド中か、失敗した
  if (runs.length) {
    const out = join(dist, 'pr', String(pr.number))
    const r = gh('run', 'download', String(runs[0].id), '--repo', repo, '--name', 'preview', '--dir', out)
    state = r.ok && existsSync(join(out, 'index.html')) ? 'ok' : 'missing'
    if (state !== 'ok') {
      console.error(`PR #${pr.number}: プレビューを取得できませんでした: ${r.err}`)
      rmSync(out, { recursive: true, force: true })
    }
  }
  console.log(`PR #${pr.number}: ${state}`)
  results.push({ number: pr.number, title: pr.title, url: pr.html_url, state })
}

const label = { pending: 'ビルド待ち / 失敗', missing: '取得できず' }
const items = results.length
  ? results.map(pr => pr.state === 'ok'
    ? `      <li><a href="./${pr.number}/"><span class="t">#${pr.number} ${escapeHtml(pr.title)}</span><span class="p">/pr/${pr.number}/</span></a></li>`
    : `      <li><a href="${escapeHtml(pr.url)}"><span class="t">#${pr.number} ${escapeHtml(pr.title)}</span><span class="p">${label[pr.state]}</span></a></li>`).join('\n')
  : '      <li>開いている PR はありません</li>'

writeFileSync(join(dist, 'pr', 'index.html'), `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>enbu slides: PR のプレビュー</title>
    <style>
      :root { color-scheme: light dark; }
      body { max-width: 40rem; margin: 3rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
      h1 { font-size: 1.4rem; }
      ul { list-style: none; padding: 0; }
      li + li { margin-top: .5rem; }
      a { display: flex; justify-content: space-between; gap: 1rem; padding: .75rem 1rem; border: 1px solid #8884; border-radius: 6px; color: inherit; text-decoration: none; }
      a:hover { background: #8882; }
      .p { opacity: .75; font-family: ui-monospace, monospace; white-space: nowrap; }
    </style>
  </head>
  <body>
    <h1>PR のプレビュー</h1>
    <p><a href="../">← main のスライド</a></p>
    <ul>
${items}
    </ul>
  </body>
</html>
`)

// main の一覧からプレビューの一覧へリンクする
const indexPath = join(dist, 'index.html')
const index = readFileSync(indexPath, 'utf8')
if (!index.includes('href="./pr/"'))
  writeFileSync(indexPath, index.replace('  </body>', '    <p><a href="./pr/">PR のプレビュー</a></p>\n  </body>'))

// ジョブの概要にプレビューの URL を出す
if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = results.map(pr => `- #${pr.number} ${pr.title}: ${pr.state === 'ok' ? `${site}/pr/${pr.number}/` : label[pr.state]}`)
  writeFileSync(process.env.GITHUB_STEP_SUMMARY, `## PR のプレビュー\n\n${lines.join('\n') || '開いている PR はありません'}\n`, { flag: 'a' })
}

console.log(`PR のプレビュー: ${results.filter(r => r.state === 'ok').length} / ${results.length} 件`)
