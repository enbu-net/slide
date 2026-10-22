<script setup lang="ts">
defineProps<{
  label: string
  active: boolean
  note?: string
  noteActive?: boolean
  act?: string
  click: number
  keyPrefix?: string
  variant?: 'user' | 'registry'
  size?: 'normal' | 'large'
}>()
</script>

<template>
  <div class="endpoint">
    <!-- note bubble -->
    <div class="note-slot">
      <div
        v-if="note"
        class="note"
        :class="noteActive ? 'note-on' : 'note-off'"
      >{{ note }}</div>
    </div>

    <!-- act zone -->
    <ActZone :act="act" :click="click" :key-prefix="keyPrefix" />

    <!-- node circle -->
    <div class="node" :class="[{ active }, size === 'large' ? 'node-lg' : '']">
      <!-- registry icon -->
      <svg v-if="variant === 'registry'" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
      <!-- user icon (default) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>

    <div class="node-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.endpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  width: 220px;
}

.note-slot {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note {
  font-size: 1.1rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 99px;
  border: 1px solid;
  white-space: nowrap;
  transition: all 0.3s;
}

.note-on {
  color: #6366f1;
  border-color: #6366f1;
  background: rgba(99,102,241,.12);
  animation: note-pulse 1.2s ease-in-out infinite;
}

.note-off {
  color: rgba(148,163,184,.45);
  border-color: rgba(148,163,184,.18);
}

.node {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1e293b;
  border: 2px solid rgba(148,163,184,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: rgba(148,163,184,.7);
}

.node.active {
  border-color: #6366f1;
  box-shadow: 0 0 18px rgba(99,102,241,.55);
  color: #6366f1;
}

.node-lg {
  width: 92px !important;
  height: 92px !important;
}

.node-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(148,163,184,.6);
  letter-spacing: 0.04em;
  text-align: center;
}

@keyframes note-pulse { 0%,100%{opacity:.75} 50%{opacity:1} }
</style>
