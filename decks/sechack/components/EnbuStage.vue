<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

// enbu デッキの 1 枚ぶんの中身を拡大する。
// zoom なので中身は親の幅に収まったまま大きくなる(transform の scale と違い、はみ出さない)。
// 揺れないよう、メッセージ(.lead)はどのスライドでも同じ位置・同じ大きさにして、残りを下の空きの中央に置く。
// 中身が下にはみ出すときは、収まるまで zoom を下げる
const props = withDefaults(defineProps<{ zoom?: number }>(), { zoom: 1.3 })
const z = ref(props.zoom)
const stage = ref<HTMLElement>()
const inner = ref<HTMLElement>()

async function fit() {
  z.value = props.zoom
  for (let i = 0; i < 4; i++) {
    await nextTick()
    const s = stage.value?.getBoundingClientRect()
    const last = inner.value?.lastElementChild?.getBoundingClientRect()
    const first = inner.value?.firstElementChild?.getBoundingClientRect()
    if (!s || !last || !first || s.height === 0 || last.bottom <= s.bottom + 1)
      return
    z.value *= Math.max(0.5, (s.bottom - first.top) / (last.bottom - first.top)) * 0.99
  }
}
onMounted(() => {
  fit()
  document.fonts?.ready.then(fit)
})
</script>

<template>
  <div ref="stage" class="enbu-stage">
    <div ref="inner" class="enbu-stage-inner" :style="{ zoom: z, '--z': z }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.enbu-stage {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.enbu-stage-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.enbu-stage-inner > :slotted(.lead) {
  zoom: calc(1.2 / var(--z));
  margin-top: 0.4rem;
}
.enbu-stage-inner > :slotted(.lead + *) { margin-top: auto; }
.enbu-stage-inner > :slotted(:last-child) { margin-bottom: auto; }
</style>
