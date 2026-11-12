import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { slideSteps } from '../decks/sechack/composables/splitSteps.ts'
import { elapsed, recordSplit, reset, running, splitKey, splits, toggle } from '../decks/sechack/composables/biimTimer.ts'

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
