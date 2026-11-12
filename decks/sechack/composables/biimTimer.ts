import { reactive, ref } from 'vue'

// タイマーと、クリック段階ごとのスプリット(その段階を終えた瞬間のタイマー値)。
// 外枠(global-top)は 1 つだけなので、状態はモジュールで共有する。
export const elapsed = ref(0) // ms
export const running = ref(false)
/** "ページ番号:クリック番号" -> 終えた瞬間のタイマー値(ms) */
export const splits = reactive<Record<string, number>>({})
export const splitKey = (page: number, click: number) => `${page}:${click}`

let startedAt = 0
let base = 0
// 停止で確定した段階(再開したら、その段階だけ進行中に戻す)
let pausedKey: string | null = null
let frameId = 0

function tick() {
  elapsed.value = base + (performance.now() - startedAt)
  frameId = requestAnimationFrame(tick)
}

/**
 * その段階を終えた瞬間のタイマー値を確定する。
 * 一度確定した段階は、戻ってからもう一度進んでも上書きしない
 */
export function recordSplit(no: number, click = 0) {
  const key = splitKey(no, click)
  if (elapsed.value > 0 && splits[key] == null)
    splits[key] = elapsed.value
}

/**
 * 開始/停止。停止した瞬間は、いまの段階を終えたものとして確定する。
 * ただし、戻ってきた確定済みの段階で止めたときは、元の値を残す
 */
export function toggle(currentNo: number, click = 0) {
  const key = splitKey(currentNo, click)
  if (running.value) {
    cancelAnimationFrame(frameId)
    running.value = false
    pausedKey = splits[key] == null && elapsed.value > 0 ? key : null
    recordSplit(currentNo, click)
    return
  }
  // 再開したら、停止で確定した段階だけ進行中に戻す
  if (pausedKey != null)
    delete splits[pausedKey]
  pausedKey = null
  base = elapsed.value
  startedAt = performance.now()
  running.value = true
  tick()
}

/** まだ一度も動かしていない(またはリセット直後の)ときだけ開始する */
export function startIfIdle(currentNo: number, click = 0) {
  if (!running.value && elapsed.value === 0)
    toggle(currentNo, click)
}

/** タイマーとスプリットを 0 に戻す */
export function reset() {
  base = 0
  startedAt = performance.now()
  elapsed.value = 0
  pausedKey = null
  for (const k of Object.keys(splits))
    delete splits[k]
}

/** est(予定時間)を秒にする。数値は秒、文字列は "m:ss" か "h:mm:ss" */
export function parseEst(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value))
    return value
  if (typeof value !== 'string' || !value.trim())
    return null
  const parts = value.trim().split(':').map(Number)
  if (parts.some(n => !Number.isFinite(n)))
    return null
  return parts.reduce((total, n) => total * 60 + n, 0)
}

/** 秒を mm:ss に(1 時間以上は分が 60 を超える) */
export function formatSeconds(sec: number) {
  const s = Math.max(0, Math.floor(sec)) // タイマーの mm:ss 表示と同じく切り捨て
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** 予定との差を、符号付きの mm:ss.cc に(オーバーは +、アンダーは -) */
export function formatDelta(ms: number) {
  const abs = Math.abs(Math.round(ms / 10)) // 1/100 秒
  const cc = abs % 100
  const total = Math.floor(abs / 100)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${ms > 0 ? '+' : '-'}${pad(Math.floor(total / 60))}:${pad(total % 60)}.${pad(cc)}`
}
