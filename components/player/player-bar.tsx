'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PlayingBars } from '@/components/playing-bars'
import { usePlayer, usePlayerShortcuts } from '@/lib/player/hooks'
import { Progress, ProgressLine } from './progress'
import { Transport } from './transport'
import { Volume } from './volume'

export function PlayerBar() {
  usePlayerShortcuts()
  const { track, playlist, status } = usePlayer()

  if (!track || !playlist) return null

  return (
    <section
      aria-label="Player"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-muted/10 bg-raised/95 backdrop-blur"
    >
      <div className="md:hidden">
        <ProgressLine />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-4 p-3 md:grid-cols-[1fr_2fr_1fr] md:px-6">
        <Link
          href={`/playlist/${playlist.slug}`}
          className="flex min-w-0 items-center gap-3 rounded-lg"
          aria-label={`Now playing: ${track.title} by ${track.artist}. Open ${playlist.title}`}
        >
          <Image
            src={playlist.imageUrl}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs text-muted">{track.artist}</p>
          </div>
          <PlayingBars active={status === 'playing'} className="hidden shrink-0 sm:flex" />
        </Link>

        <div className="flex flex-col items-center gap-1">
          <div className="md:hidden">
            <Transport compact />
          </div>
          <div className="hidden w-full max-w-xl flex-col items-center gap-1 md:flex">
            <Transport />
            <Progress />
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <Volume />
        </div>
      </div>
      {status === 'error' && (
        <p role="alert" className="pb-2 text-center text-xs text-muted">
          This track couldn’t be loaded. Try the next one.
        </p>
      )}
    </section>
  )
}
