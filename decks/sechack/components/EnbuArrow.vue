<script setup lang="ts">
// enbu デッキの図で使う矢印。flow を付けると、矢印に沿って点が流れ続ける
withDefaults(defineProps<{
  label?: string
  dir?: 'right' | 'left' | 'down' | 'up'
  flow?: boolean
  color?: string
  size?: string // 矢印の長さ(CSS の長さ)
}>(), {
  dir: 'right',
  color: '#6b7280',
  size: '5rem',
})
</script>

<template>
  <div class="enbu-arrow" :class="[dir, { flow }]" :style="{ '--c': color, '--len': size }">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="track">
      <div class="line" />
      <div class="head" />
      <div v-if="flow" class="dot" />
      <div v-if="flow" class="dot d2" />
    </div>
  </div>
</template>

<style scoped>
.enbu-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: var(--c);
}
.label {
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.75rem;
  white-space: nowrap;
}
.track {
  position: relative;
  width: var(--len);
  height: 14px;
}
.line {
  position: absolute;
  left: 0;
  right: 8px;
  top: 6px;
  height: 3px;
  border-radius: 2px;
  background: var(--c);
}
.head {
  position: absolute;
  right: 0;
  top: 0;
  border-left: 12px solid var(--c);
  border-top: 7.5px solid transparent;
  border-bottom: 7.5px solid transparent;
}
.dot {
  position: absolute;
  top: 3px;
  left: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 25%, transparent);
  animation: enbu-flow 1.8s linear infinite;
}
.d2 {
  animation-delay: 0.9s;
}
@keyframes enbu-flow {
  from { left: 0; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  to { left: calc(100% - 12px); opacity: 0; }
}
/* 向きは、横向きの矢印を回転して作る(ラベルは回さない) */
.left .track { transform: rotate(180deg); }
.down .track,
.up .track {
  width: var(--len);
  margin: calc((var(--len) - 14px) / 2) 0;
}
.down .track { transform: rotate(90deg); }
.up .track { transform: rotate(-90deg); }
</style>
