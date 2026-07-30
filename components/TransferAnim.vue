<script setup lang="ts">
import { computed } from 'vue'
import type { PacketIcon, PacketDir } from './PacketTrack.vue'

type Direction = 'left-to-right' | 'right-to-left' | 'local'

interface Step {
  label: string
  direction: Direction
  icon?: PacketIcon
  leftNote?: string
  rightNote?: string
  leftAct?: string
  rightAct?: string
}

const props = defineProps<{
  steps: Step[]
  click: number
  leftLabel?: string
  rightLabel?: string
}>()

const started = computed(() => props.click > 0)
const done    = computed(() => props.click > props.steps.length)
const step    = computed(() => props.steps[Math.min(props.click - 1, props.steps.length - 1)])

const isRightToLeft = computed(() => started.value && !done.value && step.value?.direction === 'right-to-left')
const isLeftToRight = computed(() => started.value && !done.value && step.value?.direction === 'left-to-right')

const leftActive  = computed(() => started.value && !done.value && (isLeftToRight.value || step.value?.direction === 'local' || !!step.value?.leftAct))
const rightActive = computed(() => started.value && !done.value && (isRightToLeft.value || !!step.value?.rightAct))

const packetDir = computed<PacketDir>(() => {
  if (!started.value || done.value) return null
  if (isLeftToRight.value) return 'right'
  if (isRightToLeft.value) return 'left'
  return null
})
</script>

<template>
  <div class="stage">

    <!-- Alice (left) -->
    <NodeEndpoint
      :label="leftLabel ?? 'Alice'"
      :active="leftActive"
      :note="started && !done ? step?.leftNote : undefined"
      :note-active="leftActive"
      :act="started && !done ? step?.leftAct : undefined"
      :click="click"
      key-prefix="l"
    />

    <!-- Track -->
    <PacketTrack
      :dir="packetDir"
      :icon="step?.icon ?? 'lock'"
      :click-key="click"
    >
      <template #extra>
        <div v-if="done" class="done-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
      </template>
    </PacketTrack>

    <!-- Registry (right) -->
    <NodeEndpoint
      :label="rightLabel ?? 'Container Registry'"
      variant="registry"
      :active="rightActive"
      :note="started && !done ? step?.rightNote : undefined"
      :note-active="rightActive"
      :act="started && !done ? step?.rightAct : undefined"
      :click="click"
      key-prefix="r"
    />

  </div>

  <!-- legend -->
  <div class="legend">
    <span class="legend-item" style="color:#f59e0b"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>公開鍵</span>
    <span class="legend-item" style="color:#f97316"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>秘密鍵</span>
    <span class="legend-item" style="color:#6366f1"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>暗号文</span>
    <span class="legend-item" style="color:#22c55e"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>.env</span>
  </div>

  <!-- step label -->
  <div class="step-label" :class="{ done }">
    <template v-if="click === 0">&nbsp;</template>
    <template v-else-if="done">完了</template>
    <template v-else>{{ step?.label }}</template>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 12px;
}

.done-badge {
  position: absolute;
  top: calc(96px - 17px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>
