<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useSplitPlan } from '../composables/useSplitPlan'

// スプリット表(RTA のスプリットのように、予定時間は累計)。いまのスライドが見える位置にスクロールする。
const { currentSlideNo, clicks } = useNav()
const list = ref<HTMLElement>()
const { rows } = useSplitPlan()

watch([currentSlideNo, clicks, rows], async () => {
  await nextTick()
  const el = list.value?.querySelector<HTMLElement>('.current')
  if (list.value && el)
    list.value.scrollTop = el.offsetTop - (list.value.clientHeight - el.offsetHeight) / 2
}, { immediate: true, flush: 'post' })
</script>

<template>
  <div ref="list" class="biim-splits">
    <BiimSplitRow v-for="row in rows" :key="`${row.page}:${row.click}`" :no="row.page" :click="row.click" :label="row.label" :cumulative="row.cumulative" />
  </div>
</template>

<style scoped>
.biim-splits {
  position: relative; /* 行の offsetTop の基準 */
  flex: 1;
  min-height: 0;
  margin: 0.3rem 0;
  overflow: hidden;
}
</style>
