import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { slideSteps } from '../decks/sechack/composables/splitSteps.ts'
import { elapsed, recordSplit, reset, running, splitKey, splits, toggle } from '../decks/sechack/composables/biimTimer.ts'
import { AutoSchedule } from '../decks/sechack/composables/autoSchedule.ts'

globalThis.requestAnimationFrame = () => 1
globalThis.cancelAnimationFrame = () => {}

afterEach(() => {
  if (running.value)
    toggle(1, 0)
  reset()
})

test('audio-measured click deadlines retain the page deadline and use one-based labels', () => {
  const steps = slideSteps(3, [0, 1, 2], 20, [4.25, 12.5, 20])
  assert.deepEqual(steps.map(s => [s.click, s.label, s.end]), [
    [0, '3 - 1', 4.25], [1, '3 - 2', 12.5], [2, '3 - 3', 20],
  ])
  assert.equal(slideSteps(4, [0], 8, [8])[0].label, '4')
})

test('missing click numbers remain navigable and invalid draft timings fall back to a bounded plan', () => {
  const steps = slideSteps(8, [0, 2], 12, [20, 12])
  assert.deepEqual(steps.map(s => s.click), [0, 1, 2])
  assert.deepEqual(steps.map(s => s.end), [4, 8, 12])
  assert.equal(slideSteps(9, [], 0, undefined)[0].end, 0)
})

test('completed click splits are independent and survive revisiting a step', () => {
  elapsed.value = 1000
  recordSplit(3, 0)
  elapsed.value = 2500
  recordSplit(3, 1)
  elapsed.value = 5000
  recordSplit(3, 0)
  assert.equal(splits[splitKey(3, 0)], 1000)
  assert.equal(splits[splitKey(3, 1)], 2500)
  assert.equal(splits[splitKey(3, 2)], undefined)
})

test('resuming clears only the active click split created by pausing', () => {
  elapsed.value = 1000
  recordSplit(3, 0)
  elapsed.value = 2500
  toggle(3, 1)
  toggle(3, 1)
  assert.ok(splits[splitKey(3, 1)] >= 2500)
  toggle(3, 1)
  assert.equal(splits[splitKey(3, 1)], undefined)
  assert.equal(splits[splitKey(3, 0)], 1000)
})

test('pausing on a revisited completed click preserves its original split', () => {
  elapsed.value = 1000
  recordSplit(3, 0)
  elapsed.value = 4000
  toggle(3, 0)
  toggle(3, 0)
  toggle(3, 0)
  assert.equal(splits[splitKey(3, 0)], 1000)
})

test('reset clears every click split and allows a fresh recording', () => {
  elapsed.value = 1000
  recordSplit(3, 0)
  recordSplit(3, 1)
  reset()
  assert.equal(elapsed.value, 0)
  assert.deepEqual(Object.keys(splits), [])
  elapsed.value = 500
  recordSplit(3, 0)
  assert.equal(splits[splitKey(3, 0)], 500)
})

test('95 audio steps absorb loading and ended-event latency instead of accumulating it', () => {
  const schedule = new AutoSchedule()
  let elapsedMs = 0
  schedule.anchor(0, 0)
  for (let i = 0; i < 95; i++) {
    elapsedMs += 90 // 次の音声の読み込み・開始までの遅延
    schedule.anchor(i * 5.6, elapsedMs) // 毎回呼ばれても、基準時刻をずらさない
    elapsedMs += 5000 + 80 // 音声と終了通知の遅延
    elapsedMs += schedule.remaining((i + 1) * 5.6, elapsedMs)
    assert.ok(Math.abs(elapsedMs - (i + 1) * 5600) < 0.001)
  }
})

test('a long stall never cuts narration and recovers using subsequent gaps', () => {
  const schedule = new AutoSchedule()
  schedule.anchor(0, 0)
  let elapsedMs = 0
  let largestDelay = 0
  for (let i = 0; i < 20; i++) {
    elapsedMs += (i === 5 ? 2400 : 80) + 5000 + 70
    const end = (i + 1) * 5600
    const wait = schedule.remaining(end / 1000, elapsedMs)
    assert.ok(wait >= 0)
    elapsedMs += wait
    largestDelay = Math.max(largestDelay, elapsedMs - end)
  }
  assert.ok(largestDelay > 1000)
  assert.equal(elapsedMs, 20 * 5600)
})

test('starting midway, restarting, and a demo hold use the same absolute plan', () => {
  const schedule = new AutoSchedule()
  schedule.anchor(60, 10000)
  assert.equal(schedule.remaining(75, 16000), 9000)
  schedule.reset()
  schedule.anchor(20, 40000)
  assert.equal(schedule.remaining(24, 41500), 2500)
  assert.equal(schedule.remaining(24, 45000), 0)
})
