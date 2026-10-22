<script setup lang="ts">
export type PacketIcon = 'public-key' | 'private-key' | 'lock' | 'file'
export type PacketDir  = 'right' | 'left' | 'pulse' | null

const ICON_COLOR: Record<PacketIcon, string> = {
  'public-key':  '#f59e0b',
  'private-key': '#f97316',
  'file':        '#22c55e',
  'lock':        '#6366f1',
}

const props = defineProps<{
  dir: PacketDir
  icon: PacketIcon
  clickKey: string | number
  trackTop?: number   // px offset for track/packet center (default 96)
}>()

const top = props.trackTop ?? 140
const color = ICON_COLOR[props.icon] ?? '#6366f1'
</script>

<template>
  <div class="track-area" :style="{ '--track-top': top + 'px' }">
    <div class="track" />
    <div
      v-if="dir"
      :key="clickKey"
      class="packet"
      :class="{
        'anim-right': dir === 'right',
        'anim-left':  dir === 'left',
        'anim-pulse': dir === 'pulse',
      }"
      :style="{ borderColor: color, boxShadow: `0 0 10px ${color}` }"
    >
      <svg v-if="icon === 'public-key'"  width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
      <svg v-else-if="icon === 'private-key'" width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <svg v-else-if="icon === 'file'"   width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <svg v-else                        width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
    </div>
    <slot name="extra" />
  </div>
</template>

<style scoped>
.track-area {
  position: relative;
  flex: 1;
  height: 192px;
  flex-shrink: 0;
}

.track {
  position: absolute;
  top: var(--track-top, 96px);
  left: 0; right: 0;
  height: 2px;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    90deg,
    rgba(148,163,184,.35) 0,
    rgba(148,163,184,.35) 5px,
    transparent 5px,
    transparent 10px
  );
}

.packet {
  position: absolute;
  top: calc(var(--track-top, 96px) - 15px);
  left: 50%;
  width: 36px;
  height: 28px;
  background: #0f172a;
  border: 2px solid;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
</style>
