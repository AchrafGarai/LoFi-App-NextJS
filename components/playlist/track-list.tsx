'use client'

import { clsx } from 'clsx'
import { PauseIcon, PlayIcon } from '@/components/icons'
import { PlayingBars } from '@/components/playing-bars'
import type { CatalogPlaylist } from '@/data/catalog'
import { usePlayer } from '@/lib/player/hooks'
import { player } from '@/lib/player/player'

export function TrackList({ playlist }: { playlist: CatalogPlaylist }) {
  const state = usePlayer()
  const isThisPlaylist = state.playlist?.slug === playlist.slug

  return (
    <ol className="flex flex-col gap-1" aria-label={`Tracks in ${playlist.title}`}>
      {playlist.tracks.map((track, index) => {
        const current = isThisPlaylist && state.trackIndex === index
        const playing = current && (state.status === 'playing' || state.status === 'loading')

        return (
          <li key={track.id}>
            <button
              type="button"
              onClick={() => player.playTrack(playlist, index)}
              aria-current={current ? 'true' : undefined}
              aria-label={`${playing ? 'Pause' : 'Play'} ${track.title} by ${track.artist}`}
              className={clsx(
                'group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-raised',
                current && 'bg-raised text-accent',
              )}
            >
              <span className="w-5 text-center text-sm text-muted tabular-nums">
                {current ? <PlayingBars active={state.status === 'playing'} /> : index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate">{track.title}</span>
                <span className="block truncate text-sm text-muted">{track.artist}</span>
              </span>
              <span
                className={clsx(
                  'rounded-full p-2 transition-opacity',
                  current ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
              >
                {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
