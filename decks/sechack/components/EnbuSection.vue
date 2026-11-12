<script setup lang="ts">
// セクションの区切り。暗い背景に番号と見出しを大きく出し、右に全体の目次を出して今どこかを示す
import { sections } from '../composables/sections'

const props = defineProps<{ n: number }>()
const title = sections[props.n - 1]
</script>

<template>
  <div class="enbu-section">
    <div class="main">
      <div class="num">{{ String(n).padStart(2, '0') }}</div>
      <div class="title">{{ title }}</div>
    </div>
    <ol class="toc">
      <li v-for="(s, i) in sections" :key="s" :class="{ now: i + 1 === n, done: i + 1 < n }">
        <span class="i">{{ i + 1 }}</span>{{ s }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.enbu-section {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 4rem;
  background: #1e293b;
  color: #f8fafc;
}
.num {
  font-size: 7rem;
  font-weight: bold;
  line-height: 1;
  color: #fda4af;
  font-family: var(--slidev-code-font-family, monospace);
}
.title {
  margin-top: 0.6rem;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.2;
}
.toc {
  list-style: none;
  margin: 0;
  padding: 0 0 0 1.6rem;
  border-left: 2px solid #475569;
  font-size: 1.45rem;
  line-height: 1.6;
  color: #cbd5e1;
}
.toc li { display: flex; gap: 0.6rem; }
.toc li.done { color: #94a3b8; }
.toc li.now { color: #fff; font-weight: bold; }
.toc li.now .i { background: #fda4af; color: #1e293b; }
.i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.2rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  font-size: 0.8rem;
}
.toc li.now .i { border-color: #fda4af; }
</style>
