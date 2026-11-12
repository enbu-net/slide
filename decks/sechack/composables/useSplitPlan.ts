import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useLiveSlide } from './liveSlide'
import { parseEst } from './biimTimer'
import { slideSteps } from './splitSteps'

/** 予定表とオート送りで、同じ累計の開始・終了時刻を使う。 */
export function useSplitPlan() {
  const { total, currentSlideNo, clicks } = useNav()
  const lives = Array.from({ length: total.value }, (_, i) => useLiveSlide(i + 1))
  const rows = computed(() => {
    let sum = 0
    return lives.flatMap((l, i) => {
      const duration = parseEst(l.frontmatter.value.est) ?? 0
      const steps = slideSteps(i + 1, l.comments.value.map(c => c.click), duration, l.frontmatter.value.clickEst)
      const result = steps.map((step, j) => ({
        ...step,
        start: sum + (j ? steps[j - 1].end : 0),
        cumulative: sum + step.end,
      }))
      sum += duration
      return result
    })
  })
  const current = computed(() => rows.value.find(row => row.page === currentSlideNo.value && row.click === clicks.value))
  return { rows, current }
}
