'use client'

import { PauseIcon, PlayIcon } from '@/components/icons'
import { PlayingBars } from '@/components/playing-bars'
import { Button } from '@/components/ui/button'
import type { CatalogPlaylist } from '@/data/catalog'
import { usePlayer } from '@/lib/player/hooks'
import { player } from '@/lib/player/player'

/** Plays the playlist from the top, or toggles it if it is already loaded. */
export function PlayPlaylistButton({ playlist }: { playlist: CatalogPlaylist }) {
  const state = usePlayer()
  const loaded = state.playlist?.slug === playlist.slug
  const playing = loaded && (state.status === 'playing' || state.status === 'loading')

  return (
    <Button
      onClick={() => (loaded ? player.toggle() : player.playTrack(playlist, 0))}
      className="px-6"
      aria-label={`${playing ? 'Pause' : 'Play'} ${playlist.title}`}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
      {playing ? 'Pause' : loaded ? 'Resume' : 'Play'}
      {playing && <PlayingBars active className="[&>span]:bg-surface" />}
    </Button>
  )
}
