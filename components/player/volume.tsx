'use client'

import { MutedIcon, VolumeIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { usePlayer } from '@/lib/player/hooks'
import { player } from '@/lib/player/player'

export function Volume() {
  const { volume, muted } = usePlayer()
  const silent = muted || volume === 0

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="plain"
        className="p-2 text-muted hover:text-fg"
        onClick={() => player.toggleMute()}
        aria-label={silent ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
      >
        {silent ? <MutedIcon size={20} /> : <VolumeIcon size={20} />}
      </Button>
      <Slider
        className="w-24 shrink-0"
        label="Volume"
        value={muted ? 0 : volume}
        max={1}
        step={0.01}
        valueText={`${Math.round((muted ? 0 : volume) * 100)}%`}
        onChange={(value) => player.setVolume(value)}
      />
    </div>
  )
}
