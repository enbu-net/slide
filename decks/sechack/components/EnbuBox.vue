<script setup lang="ts">
// enbu デッキの図で使う箱(絵文字のアイコン + 名前 + 補足)
withDefaults(defineProps<{
  icon?: string
  title?: string
  sub?: string
  tone?: 'plain' | 'accent' | 'good' | 'bad' | 'muted'
}>(), {
  tone: 'plain',
})
</script>

<template>
  <div class="enbu-box" :class="tone">
    <div v-if="icon" class="icon">{{ icon }}</div>
    <div v-if="title" class="title">{{ title }}</div>
    <div v-if="sub" class="sub">{{ sub }}</div>
    <slot />
  </div>
</template>

<style scoped>
.enbu-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  padding: 0.6rem 0.9rem;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  line-height: 1.25;
}
.icon {
  font-size: 2.2rem;
  line-height: 1.1;
}
.title {
  font-weight: bold;
  font-size: 1rem;
}
.sub {
  font-size: 0.75rem;
  color: #6b7280;
}
.accent { border-color: #dd2e44; background: #fff1f2; }
.good { border-color: #16a34a; background: #f0fdf4; }
.bad { border-color: #9ca3af; background: #f3f4f6; color: #6b7280; }
.muted { border-style: dashed; }
</style>
