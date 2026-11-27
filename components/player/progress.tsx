'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { formatTime, spokenTime } from '@/lib/format'
import { useCurrentTime, usePlayer } from '@/lib/player/hooks'
import { player } from '@/lib/player/player'

export function Progress() {
  const { duration, track } = usePlayer()
  const currentTime = useCurrentTime()
  // While dragging, show the drag position and seek once on release.
  const [scrubbing, setScrubbing] = useState<number | null>(null)
  const shown = scrubbing ?? currentTime

  return (
    <div className="flex w-full items-center gap-3 text-xs text-muted tabular-nums">
      <span className="w-10 text-right">{formatTime(shown)}</span>
      <Slider
        label="Seek"
        value={shown}
        max={duration}
        step={1}
        valueText={`${spokenTime(shown)} of ${spokenTime(duration)}`}
        disabled={!track || !duration}
        onChange={setScrubbing}
        onCommit={(value) => {
          player.seek(value)
          setScrubbing(null)
        }}
      />
      <span className="w-10">{formatTime(duration)}</span>
    </div>
  )
}

/** Thin progress line for the compact mobile bar. */
export function ProgressLine() {
  const { duration } = usePlayer()
  const currentTime = useCurrentTime()
  const ratio = duration ? Math.min(currentTime / duration, 1) : 0

  return (
    <div className="h-0.5 w-full bg-muted/20" aria-hidden="true">
      <div
        className="h-full origin-left bg-accent transition-transform duration-1000 ease-linear"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  )
}
