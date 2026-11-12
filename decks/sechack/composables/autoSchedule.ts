/** 音声の遅延を、次の予定時刻までの待ち時間から引く。音声自体は切らない。 */
export class AutoSchedule {
  private offsetMs: number | null = null

  reset() {
    this.offsetMs = null
  }

  /** 最初に音声の再生が成功した時点でだけ、予定と実時間を対応づける。 */
  anchor(plannedStartSeconds: number, elapsedMs: number) {
    if (this.offsetMs == null)
      this.offsetMs = elapsedMs - plannedStartSeconds * 1000
  }

  remaining(plannedEndSeconds: number, elapsedMs: number) {
    return Math.max(0, plannedEndSeconds * 1000 + (this.offsetMs ?? 0) - elapsedMs)
  }
}
