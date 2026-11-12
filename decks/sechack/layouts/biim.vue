<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { useLiveSlide } from '../composables/liveSlide'
import { sections } from '../composables/sections'

// frontmatter の background を、メインの枠の背景として使う(seriph の cover と同様)
defineProps<{ background?: string }>()

// ノートで指定された最大のクリック番号まで、クリックを用意する
const { $page } = useSlideContext()
const { comments, frontmatter } = useLiveSlide($page)
const extraClicks = computed(() => Math.max(0, ...comments.value.map(c => c.click)))
const sectionLabel = computed(() => {
  const n = Number(frontmatter.value.section ?? 0)
  return n ? `${String(n).padStart(2, '0')} / ${sections[n - 1]}` : 'はじめに'
})
</script>

<template>
  <!--
    スライド本文だけを担当する。枠・アイコン・タイマーなどの外枠は global-top.vue が
    ページ遷移をまたいで固定表示し、メインの窓以外を覆う。
    そのため遷移アニメーションは窓の中だけに見える。
  -->
  <div class="slidev-layout biim">
    <div
      class="biim-viewport"
      :class="{ 'has-bg': !!background, 'section-divider': frontmatter.sectionDivider }"
      :style="background ? { backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${background})` } : undefined"
    >
      <!-- 980x552 の画面として描画し、メインの窓に収まるよう縮小する -->
      <div class="biim-screen">
        <div class="biim-section-label" aria-label="現在のセクション">{{ sectionLabel }}</div>
        <div class="biim-content"><slot /></div>
      </div>
    </div>

    <!-- セリフ欄用のクリック。絶対位置(v-click="i")なので、スライド側の v-click と順番が競合しない -->
    <span v-for="i in extraClicks" :key="i" v-click="i" class="biim-click" />
  </div>
</template>

<style scoped>
.biim {
  position: relative;
  padding: 0;
}
.biim-viewport {
  position: absolute;
  left: var(--biim-hole-l);
  top: var(--biim-hole-t);
  width: var(--biim-main-w);
  height: var(--biim-main-h);
  overflow: hidden;
}
.biim-viewport.has-bg {
  background-size: cover;
  background-position: center;
  color: #fff;
}
.biim-click {
  position: absolute;
  width: 0;
  height: 0;
}
.biim-screen {
  position: relative;
  width: 980px;
  height: 552px;
  transform: scale(var(--biim-s));
  transform-origin: top left;
  box-sizing: border-box;
  padding: 3.5rem 2rem 1.5rem;
}
.biim-content { position: relative; height: 100%; }
.biim-section-label {
  position: absolute;
  top: 0.75rem;
  left: 2rem;
  right: 2rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid #d1d5db;
  color: #4b5563;
  font-size: 1rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}
.section-divider { background: #1e293b; color: #f8fafc; }
.section-divider .biim-section-label { color: #fda4af; border-color: #475569; }
.has-bg .biim-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
