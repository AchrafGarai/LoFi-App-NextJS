/** 75 → "1:15"; invalid input renders as "0:00". */
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

/** Spoken form for screen readers: "1 minute 15 seconds". */
export function spokenTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds || 0))
  const m = Math.floor(whole / 60)
  const s = whole % 60
  const parts = []
  if (m) parts.push(`${m} minute${m === 1 ? '' : 's'}`)
  parts.push(`${s} second${s === 1 ? '' : 's'}`)
  return parts.join(' ')
}
