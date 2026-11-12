<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useLiveSlide } from '../composables/liveSlide'
import { getElapsed, running, toggle } from '../composables/biimTimer'
import { useSplitPlan } from '../composables/useSplitPlan'
import { AutoSchedule } from '../composables/autoSchedule'

// あかねボイスの読み上げ(public/voice/sNN_J.mp3、NN = ページ、J = そのページの何個目のセリフか)。
// - v キーか URL の ?voice で読み上げを ON / OFF
// - a キーか ?voice=auto でオートモード: 読み終えたうえで、予定表と同じ累計時刻に次へ進む。
//   読み込みや終了通知の遅れは間から吸収し、音声は途中で切らない。次の音声は先読みする。
//   最後のスライドを読み終えたらタイマーを止める
// - デモの待ち時間も、予定表の clickEst に含まれる
// 発表者の画面だけで鳴らすため、発表者ビューやエクスポートでは何もしない。
const { currentPage, clicks, next, hasNext, total, isPresenter, isPrintMode } = useNav()
const { comments } = useLiveSlide(currentPage)
const { current: currentStep } = useSplitPlan()
const schedule = new AutoSchedule()

const params = new URLSearchParams(location.search || location.hash.split('?')[1] || '')
const enabled = ref(params.has('voice'))
const auto = ref(params.get('voice') === 'auto')
let audio = new Audio()
let prefetched: HTMLAudioElement | undefined
let plannedEnd: number | undefined
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

function release(media: HTMLAudioElement) {
  media.pause()
  media.removeAttribute('src')
  media.load()
}

function prefetch(page: number, index: number) {
  if (page > total.value)
    return
  const url = src(page, index)
  if (prefetched?.getAttribute('src') === url)
    return
  if (prefetched)
    release(prefetched)
  prefetched = new Audio()
  prefetched.preload = 'auto'
  prefetched.src = url
  prefetched.load()
}

function play() {
  stop()
  if (!enabled.value || isPresenter.value || isPrintMode.value)
    return
  const index = comments.value.findIndex(c => c.click === clicks.value)
  if (index < 0)
    return
  const url = src(currentPage.value, index)
  if (prefetched?.getAttribute('src') === url) {
    audio.removeEventListener('ended', onEnded)
    release(audio)
    audio = prefetched
    prefetched = undefined
    audio.addEventListener('ended', onEnded)
  }
  else {
    audio.src = url
  }
  const mine = attempt
  const step = currentStep.value
  plannedEnd = step?.cumulative
  audio.play().then(() => {
    if (mine !== attempt)
      return
    blocked.value = false
    if (auto.value) {
      // 再生が許可される前の待ち時間を発表時間に含めない。
      if (!running.value)
        toggle(currentPage.value, clicks.value)
      schedule.anchor(step?.start ?? 0, getElapsed())
    }
    if (index + 1 < comments.value.length)
      prefetch(currentPage.value, index + 1)
    else
      prefetch(currentPage.value + 1, 0)
  }).catch((e: unknown) => {
    if (mine !== attempt || (e instanceof DOMException && e.name === 'AbortError'))
      return
    blocked.value = true
    console.warn('読み上げを再生できません', audio.src, e)
  })
}

function onEnded() {
  if (!auto.value)
    return
  const mine = attempt
  const isLast = !hasNext.value
  // 固定の間を毎回足すと、読み込みや終了通知の遅延が累積する。
  // 予定表と同じ絶対時刻までの残り時間だけ待つ。遅れても音声は切らない。
  const wait = plannedEnd == null ? 600 : schedule.remaining(plannedEnd, getElapsed())
  timer = setTimeout(() => {
    if (mine !== attempt || !auto.value)
      return
    if (isLast) {
      auto.value = false
      if (running.value)
        toggle(currentPage.value, clicks.value)
      return
    }
    next()
  }, wait)
}
audio.addEventListener('ended', onEnded)

watch([currentPage, clicks], ([page, click], [previousPage, previousClick]) => {
  if (page < previousPage || (page === previousPage && click < previousClick))
    schedule.reset()
  play()
})

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
      schedule.reset()
      play()
    }
    else {
      stop()
    }
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  // オートのタイマー開始は、play() の再生成功と同時に行う。
  play()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  stop()
  audio.removeEventListener('ended', onEnded)
  release(audio)
  if (prefetched)
    release(prefetched)
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
