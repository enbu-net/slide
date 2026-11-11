<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useLiveSlide } from '../composables/liveSlide'
import { parseEst, running, toggle } from '../composables/biimTimer'

// あかねボイスの読み上げ(public/voice/sNN_J.mp3、NN = ページ、J = そのページの何個目のセリフか)。
// - v キーか URL の ?voice で読み上げを ON / OFF
// - a キーか ?voice=auto でオートモード: 読み終わったら次へ進み、タイマーも自動で動かして、最後まで通す。
//   最後のスライドを読み終えたらタイマーを止める
// - デモ動画のように読み上げより長く見せるページ(frontmatter に voiceHold: true)は、est の時間が経つまで待つ
// 発表者の画面だけで鳴らすため、発表者ビューやエクスポートでは何もしない。
const { currentPage, clicks, next, hasNext, isPresenter, isPrintMode } = useNav()
const { comments, frontmatter } = useLiveSlide(currentPage)

const params = new URLSearchParams(location.search || location.hash.split('?')[1] || '')
const enabled = ref(params.has('voice'))
const auto = ref(params.get('voice') === 'auto')
// いまのページに来た時刻(voiceHold のページで est まで待つため)
let pageStartedAt = performance.now()
const audio = new Audio()
// ブラウザが操作前の再生を止めたとき、押して始めるボタンを出す
const blocked = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
// 何回目の再生か。ページ移動で古い再生の結果が届いても無視する
let attempt = 0

function src(page: number, index: number) {
  return `${import.meta.env.BASE_URL}voice/s${String(page).padStart(2, '0')}_${index}.mp3`
}

function stop() {
  attempt++
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
  const mine = attempt
  audio.play().then(() => {
    if (mine === attempt)
      blocked.value = false
  }).catch((e: unknown) => {
    if (mine !== attempt || (e instanceof DOMException && e.name === 'AbortError'))
      return
    blocked.value = true
    console.warn('読み上げを再生できません', audio.src, e)
  })
}

audio.addEventListener('ended', () => {
  if (!auto.value)
    return
  const isLast = !hasNext.value
  // est はセリフの長さ + 0.6 秒で計算している。voiceHold のページは est まで待つ
  let wait = 600
  if (frontmatter.value.voiceHold && clicks.value === comments.value.at(-1)?.click) {
    const est = parseEst(frontmatter.value.est) ?? 0
    wait = Math.max(wait, est * 1000 - (performance.now() - pageStartedAt))
  }
  timer = setTimeout(() => {
    if (isLast) {
      if (running.value)
        toggle(currentPage.value) // 最後まで読んだら止めて確定する
      auto.value = false
      return
    }
    next()
  }, wait)
})

watch(currentPage, () => {
  pageStartedAt = performance.now()
})
watch([currentPage, clicks], play)

function onKey(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat)
    return
  const el = e.target as HTMLElement | null
  if (el?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName ?? ''))
    return
  if (e.key === 'v') {
    enabled.value = !enabled.value
    if (!enabled.value)
      auto.value = false
    enabled.value ? play() : stop()
  }
  else if (e.key === 'a') {
    auto.value = !auto.value
    if (auto.value) {
      enabled.value = true
      pageStartedAt = performance.now()
      if (!running.value)
        toggle(currentPage.value) // タイマーも動かす(止めていたら続きから)
      play()
    }
    else {
      stop()
    }
  }
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
  <span v-else-if="enabled" class="biim-voice" :title="auto ? '読み上げ(オートモード)' : '読み上げ'">{{ auto ? '▶︎🔊' : '🔊' }}</span>
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
