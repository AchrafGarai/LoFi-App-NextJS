'use client'

import { clsx } from 'clsx'
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import { usePlayer } from '@/lib/player/hooks'
import { player } from '@/lib/player/player'

const repeatLabel = { off: 'Repeat off', all: 'Repeat all', one: 'Repeat one' } as const

export function Transport({ compact = false }: { compact?: boolean }) {
  const { status, shuffle, repeat, track } = usePlayer()
  const playing = status === 'playing' || status === 'loading'

  return (
    <div className="flex items-center gap-1">
      {!compact && (
        <Button
          variant="plain"
          onClick={() => player.toggleShuffle()}
          aria-pressed={shuffle}
          aria-label="Shuffle"
          className={clsx('p-2', shuffle ? 'text-accent' : 'text-muted')}
        >
          <ShuffleIcon size={18} />
        </Button>
      )}
      <Button
        variant="plain"
        onClick={() => player.previous()}
        aria-label="Previous track"
        disabled={!track}
        className="p-2"
      >
        <PreviousIcon />
      </Button>
      <Button
        variant="contrast"
        onClick={() => player.toggle()}
        aria-label={playing ? 'Pause' : 'Play'}
        disabled={!track}
        className="p-2.5"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button
        variant="plain"
        onClick={() => player.next()}
        aria-label="Next track"
        disabled={!track}
        className="p-2"
      >
        <NextIcon />
      </Button>
      {!compact && (
        <Button
          variant="plain"
          onClick={() => player.cycleRepeat()}
          aria-label={repeatLabel[repeat]}
          title={repeatLabel[repeat]}
          className={clsx('p-2', repeat === 'off' ? 'text-muted' : 'text-accent')}
        >
          {repeat === 'one' ? <RepeatOneIcon size={18} /> : <RepeatIcon size={18} />}
        </Button>
      )}
    </div>
  )
}
