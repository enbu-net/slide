<script setup lang="ts">
// enbu デッキの 1 枚ぶんの中身を、縦方向の中央に置いて拡大する。
// zoom なので中身は親の幅に収まったまま大きくなる(transform の scale と違い、はみ出さない)
withDefaults(defineProps<{ zoom?: number }>(), { zoom: 1.3 })
</script>

<template>
  <div class="enbu-stage">
    <div class="enbu-stage-inner" :style="{ zoom }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.enbu-stage {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
