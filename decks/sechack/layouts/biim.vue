<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { useLiveSlide } from '../composables/liveSlide'

// frontmatter の background を、メインの枠の背景として使う(seriph の cover と同様)
defineProps<{ background?: string }>()

// ノートで指定された最大のクリック番号まで、クリックを用意する
const { $page } = useSlideContext()
const { comments, title } = useLiveSlide($page)
const extraClicks = computed(() => Math.max(0, ...comments.value.map(c => c.click)))

// 見出し: いまのセクション(直前の「§N 名前」のスライド)と、このスライドのタイトル。
// 表紙とセクションの区切りには出さない
const { slides } = useNav()
const SECTION = /^§(\d+)\s*(.*)$/
const section = computed(() => {
  for (let i = $page.value - 1; i >= 0; i--) {
    const m = String(slides.value[i]?.meta?.slide?.title ?? '').match(SECTION)
    if (m)
      return { n: Number(m[1]), name: m[2] }
  }
  return null
})
const showHeader = computed(() => $page.value > 1 && !SECTION.test(title.value))
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
      :class="{ 'has-bg': !!background }"
      :style="background ? { backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${background})` } : undefined"
    >
      <!-- 980x552 の画面として描画し、メインの窓に収まるよう縮小する -->
      <div class="biim-screen" :class="{ 'with-header': showHeader }">
        <header v-if="showHeader" class="biim-head">
          <span v-if="section" class="sec"><b>{{ section.n }}</b>{{ section.name }}</span>
          <span class="ttl">{{ title }}</span>
        </header>
        <div class="biim-body">
          <slot />
        </div>
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
  width: 980px;
  height: 552px;
  transform: scale(var(--biim-s));
  transform-origin: top left;
  box-sizing: border-box;
  padding: 1.5rem 2rem; /* 文字を大きくできるよう、Slidev 標準より余白を狭くする */
}
.biim-screen.with-header {
  display: flex;
  flex-direction: column;
  padding-top: 0.9rem;
}
.biim-body {
  flex: 1;
  min-height: 0;
  height: 100%;
}
/* どのスライドでも同じ高さ・同じ形の見出し */
.biim-head {
  flex: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 2.6rem;
  margin-bottom: 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #1e293b;
  white-space: nowrap;
}
.biim-head .sec {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.15rem 0.8rem 0.15rem 0.2rem;
  border-radius: 999px;
  background: #1e293b;
  color: #f8fafc;
  font-size: 1.15rem;
  font-weight: bold;
}
.biim-head .sec b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: #fda4af;
  color: #1e293b;
  font-size: 1rem;
}
.biim-head .ttl {
  font-size: 1.45rem;
  font-weight: bold;
  color: #1e293b;
}
.has-bg .biim-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
