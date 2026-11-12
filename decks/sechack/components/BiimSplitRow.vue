<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { elapsed, formatDelta, formatSeconds, splits, splitKey } from '../composables/biimTimer'

// 予定の何 ms 前からカウントダウンを始めるか
const COUNTDOWN_MS = 5000

// 1 クリック段階分の行: ページ番号 / 予定との差 / 予定時間(累計)。
// 差は累計の予定とタイマー値の差。いまの段階は、予定の 5 秒前からカウントダウンし(緑の -)、
// 超えたらそのままカウントアップする(赤の +)。色は style.css の --biim-good / --biim-bad。段階を終えると、その時点の差で確定する。
const props = defineProps<{
  no: number
  click: number
  label: string
  /** この段階までの予定時間の累計(秒) */
  cumulative: number
}>()

const { currentSlideNo, clicks } = useNav()
const isCurrent = computed(() => currentSlideNo.value === props.no && clicks.value === props.click)

// 予定との差(ms)。正ならオーバー。表示しないときは null
const delta = computed(() => {
  const split = splits[splitKey(props.no, props.click)]
  // 終えた段階は確定した値。前の段階に戻っても、確定した値のまま動かさない
  if (split != null)
    return split - props.cumulative * 1000
  if (!isCurrent.value)
    return null
  const live = elapsed.value - props.cumulative * 1000 // いまの段階: 進行中
  return live >= -COUNTDOWN_MS ? live : null
})
</script>

<template>
  <div class="biim-split-row" :class="{ current: isCurrent }" :aria-current="isCurrent ? 'step' : undefined">
    <span class="no">{{ label }}</span>
    <span
      v-if="delta != null"
      class="delta font-mono"
      :class="delta > 0 ? 'over' : 'under'"
    >{{ formatDelta(delta) }}</span>
    <span class="est font-mono">{{ formatSeconds(cumulative) }}</span>
  </div>
</template>

<style scoped>
.biim-split-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px;
  align-items: baseline;
  padding: 1px 3px;
  line-height: 1.4;
  white-space: nowrap;
}
.no {
  font-size: 0.95rem;
  font-weight: bold;
}
.delta {
  grid-row: 2;
  grid-column: 1 / -1;
  font-size: 0.75rem;
  text-align: right;
}
.est {
  grid-row: 1;
  grid-column: 2;
  font-size: 0.85rem; /* 予定時間は白 */
}
.over {
  color: var(--biim-bad);
}
.under {
  color: var(--biim-good);
}
.current {
  background: rgba(156, 163, 175, 0.25);
  border-radius: 3px;
}
</style>
