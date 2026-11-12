/** クリック番号0が、ページを開いた直後の最初の段階。 */
export function stepCount(clicks: readonly number[]) {
  return Math.max(0, ...clicks) + 1
}

export function stepLabel(page: number, click: number, count: number) {
  return count > 1 ? `${page} - ${click + 1}` : String(page)
}

export function slideSteps(page: number, clicks: readonly number[], duration: number, ends: unknown) {
  const count = stepCount(clicks)
  const valid = Array.isArray(ends) && ends.length === count
    && ends.every((end, i) => typeof end === 'number' && Number.isFinite(end)
      && end >= 0 && end <= duration && (i === 0 || end >= ends[i - 1]))
    && Math.abs(ends[count - 1] - duration) < 0.001
  return Array.from({ length: count }, (_, click) => ({
    page,
    click,
    label: stepLabel(page, click, count),
    // 手動で編集中に音声計測前なら均等配分。生成後は音声の実測値を使う。
    end: valid ? ends[click] as number : duration * (click + 1) / count,
  }))
}
