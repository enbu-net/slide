import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useNav } from '@slidev/client'
import { recordSplit, reset, running, startIfIdle, toggle } from './biimTimer'

// Slidev の「次へ」のキー(右、下、PageDown、Space)
const isNextKey = (e: KeyboardEvent) =>
  ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)

/**
 * タイマーの操作(外枠を置く global-top で 1 回だけ呼ぶ)。
 * - 最初に先へ進んだ(クリックかページ送り)ときに自動で開始する。s を押さなくてよい
 * - s: 開始/停止  r: リセット(停止中のみ。リセット後は、また最初に進んだときに開始する)
 * - 先のスライドへ進んだら、離れたスライドを終えた瞬間のタイマー値を確定する
 * - 最後のスライドの最後のクリックで「次へ」を押したら、停止して確定する
 * 入力欄での入力や、修飾キーとの組み合わせは無視する。
 */
export function useBiimControls() {
  const { currentSlideNo, clicks, hasNext } = useNav()

  // 自動開始は人が操作したあとだけ(URL の ?clicks= などで、読み込み直後にクリックが進むことがある)
  let interacted = false
  const markInteracted = () => {
    interacted = true
  }
  const autoStart = (no: number, click: number) => {
    if (interacted)
      startIfIdle(no, click)
  }

  // ページ送りと同じように、各クリック段階を離れた時点でも記録する。
  // 戻る操作や途中へのジャンプで、未通過の段階の記録を作らない。
  watch([currentSlideNo, clicks], ([no, now], [prevNo, prev]) => {
    if (prevNo != null && (no > prevNo || (no === prevNo && now > prev))) {
      recordSplit(prevNo, prev)
      autoStart(no, now)
    }
  })

  function onKeydown(e: KeyboardEvent) {
    markInteracted()
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat)
      return
    const el = e.target as HTMLElement | null
    if (el?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName ?? ''))
      return
    if (e.key === 's')
      toggle(currentSlideNo.value, clicks.value)
    else if (e.key === 'r' && !running.value)
      reset()
    else if (isNextKey(e) && !hasNext.value && running.value)
      toggle(currentSlideNo.value, clicks.value)
  }

  const pointerEvents = ['pointerdown', 'wheel', 'touchstart'] as const
  onMounted(() => {
    // capture で受け取り、Slidev がページを送るより先に印を付ける
    window.addEventListener('keydown', onKeydown, true)
    for (const name of pointerEvents)
      window.addEventListener(name, markInteracted, { capture: true, passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown, true)
    for (const name of pointerEvents)
      window.removeEventListener(name, markInteracted, { capture: true })
  })
}
