<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useLiveSlide } from '../composables/liveSlide'

// あかねボイスの読み上げ(public/voice/sNN_J.mp3、NN = ページ、J = そのページの何個目のセリフか)。
// URL に ?voice を付けるか v キーで ON / OFF。?voice=auto なら読み終わったら次へ進む(自動再生)。
// 発表者の画面だけで鳴らすため、発表者ビューやエクスポートでは何もしない。
const { currentPage, clicks, next, isPresenter, isPrintMode } = useNav()
const { comments, frontmatter } = useLiveSlide(currentPage)

const params = new URLSearchParams(location.search || location.hash.split('?')[1] || '')
const enabled = ref(params.has('voice'))
const auto = params.get('voice') === 'auto'
const audio = new Audio()
// ブラウザが操作前の再生を止めたとき、押して始めるボタンを出す
const blocked = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function src(page: number, index: number) {
  return `${import.meta.env.BASE_URL}voice/s${String(page).padStart(2, '0')}_${index}.mp3`
}

function stop() {
  audio.pause()
  clearTimeout(timer)
}

function play() {
  stop()
  if (!enabled.value || isPresenter.value || isPrintMode.value)
    return
  const index = comments.value.findIndex(c => c.click === clicks.value)
  if (index < 0)
    return
  audio.src = src(currentPage.value, index)
  audio.play().then(() => {
    blocked.value = false
  }).catch((e: unknown) => {
    blocked.value = true
    console.warn('読み上げを再生できません', audio.src, e)
  })
}

audio.addEventListener('ended', () => {
  // デモ動画のように、読み終わっても進めたくないページは frontmatter に voiceHold: true
  if (auto && !frontmatter.value.voiceHold)
    timer = setTimeout(() => next(), 400)
})

watch([currentPage, clicks], play)

function onKey(e: KeyboardEvent) {
  if (e.key !== 'v' || e.ctrlKey || e.metaKey || e.altKey)
    return
  enabled.value = !enabled.value
  enabled.value ? play() : stop()
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  play()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  stop()
})
</script>

<template>
  <button v-if="enabled && blocked" class="biim-voice start" @click="play">▶ 読み上げを始める</button>
  <span v-else-if="enabled" class="biim-voice" :title="auto ? '読み上げ(自動送り)' : '読み上げ'">🔊</span>
</template>

<style scoped>
.biim-voice {
  position: absolute;
  right: 0.4rem;
  bottom: 0.2rem;
  font-size: 0.9rem;
  opacity: 0.7;
}
.biim-voice.start {
  padding: 0.1rem 0.6rem;
  border: 2px solid currentColor;
  border-radius: 6px;
  background: var(--biim-bg, #fff);
  opacity: 1;
  pointer-events: auto;
  cursor: pointer;
}
</style>
