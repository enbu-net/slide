<script setup lang="ts">
import { computed } from 'vue'
import type { PacketDir } from './PacketTrack.vue'

type Segment = 'bob-to-reg' | 'reg-to-alice' | 'alice-policy' | 'alice-local' | 'alice-to-reg' | 'reg-to-bob' | 'bob-local'

interface Step {
  label: string
  segment: Segment
  aliceAct?: string
  bobAct?: string
  regActLeft?: string
  regActRight?: string
}

const props = defineProps<{
  steps: Step[]
  click: number
}>()

const started = computed(() => props.click > 0)
const done    = computed(() => props.click > props.steps.length)
const step    = computed(() => props.steps[Math.min(props.click - 1, props.steps.length - 1)])

const seg = computed<Segment | null>(() => started.value && !done.value ? step.value?.segment ?? null : null)

const aliceActive = computed(() => ['reg-to-alice', 'alice-policy', 'alice-local', 'alice-to-reg'].includes(seg.value ?? ''))
const regActive   = computed(() => !!seg.value && !['bob-local', 'alice-policy'].includes(seg.value))
const bobActive   = computed(() => ['bob-to-reg', 'reg-to-bob', 'bob-local'].includes(seg.value ?? ''))

const leftPacketDir = computed<PacketDir>(() => {
  if (seg.value === 'reg-to-alice') return 'left'
  if (seg.value === 'alice-to-reg') return 'right'
  if (seg.value === 'alice-local')  return 'pulse'
  return null
})

const rightPacketDir = computed<PacketDir>(() => {
  if (seg.value === 'bob-to-reg') return 'left'
  if (seg.value === 'reg-to-bob') return 'right'
  return null
})

// act types per node per segment
const aliceAct = computed(() => {
  if (!started.value || done.value) return undefined
  const map: Partial<Record<Segment, string>> = {
    'reg-to-alice': 'recv-ciphertext',
    'alice-policy': 'policy-eval',
    'alice-local':  'reencrypt',
    'alice-to-reg': 'send-cipher-local',
  }
  return seg.value ? map[seg.value] : undefined
})

const bobAct = computed(() => {
  if (!started.value || done.value) return undefined
  const map: Partial<Record<Segment, string>> = {
    'bob-to-reg': 'gen-keys',
    'reg-to-bob': 'recv-ciphertext',
    'bob-local':  'decrypt',
  }
  return seg.value ? map[seg.value] : undefined
})

const regAct = computed(() => {
  if (!started.value || done.value) return undefined
  const map: Partial<Record<Segment, string>> = {
    'bob-to-reg':   'store-pubkey',
    'reg-to-alice': 'send-pubkey-cipher',
    'alice-to-reg': 'store-cipher',
    'reg-to-bob':   'send-cipher-right',
  }
  return seg.value ? map[seg.value] : undefined
})

const regNote = computed(() => started.value && !done.value
  ? step.value?.regActLeft || step.value?.regActRight
  : undefined
)
</script>

<template>
  <div class="sync-stage">

    <!-- Alice (left) -->
    <NodeEndpoint
      label="Alice"
      :active="aliceActive"
      :note="started && !done ? step?.aliceAct : undefined"
      :note-active="aliceActive"
      :act="aliceAct"
      :click="click"
      key-prefix="alice"
    />

    <!-- Left track (Alice ↔ Registry) -->
    <PacketTrack
      :dir="leftPacketDir"
      icon="lock"
      :click-key="'lp' + click"
    />

    <!-- Registry (center) -->
    <NodeEndpoint
      label="Container Registry"
      variant="registry"
      size="large"
      :active="regActive"
      :note="regNote"
      :note-active="regActive"
      :act="regAct"
      :click="click"
      key-prefix="reg"
    />

    <!-- Right track (Registry ↔ Bob) -->
    <PacketTrack
      :dir="rightPacketDir"
      :icon="seg === 'reg-to-bob' ? 'lock' : 'public-key'"
      :click-key="'rp' + click"
    />

    <!-- Bob (right) -->
    <NodeEndpoint
      label="Bob"
      :active="bobActive"
      :note="started && !done ? step?.bobAct : undefined"
      :note-active="bobActive"
      :act="bobAct"
      :click="click"
      key-prefix="bob"
    />

  </div>

  <div v-if="done" class="done-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  </div>

  <!-- legend -->
  <div class="legend">
    <span class="legend-item" style="color:#f59e0b"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>公開鍵</span>
    <span class="legend-item" style="color:#6366f1"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>暗号文</span>
  </div>

  <!-- step label -->
  <div class="step-label" :class="{ done }">
    <template v-if="click === 0">&nbsp;</template>
    <template v-else-if="done">完了</template>
    <template v-else>{{ step?.label }}</template>
  </div>
</template>

<style scoped>
.sync-stage {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 8px;
}

.done-center {
  display: flex;
  justify-content: center;
  margin: 4px 0;
}
</style>
