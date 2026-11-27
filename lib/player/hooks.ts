'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { player, type PlayerState } from './player'

export function usePlayer(): PlayerState {
  return useSyncExternalStore(player.subscribe, player.getSnapshot, player.getServerSnapshot)
}

/** Playback position in seconds; re-renders about once per second. */
export function useCurrentTime(): number {
  return useSyncExternalStore(player.subscribeTime, player.getTime, player.getServerTime)
}

/** True when this playlist (and optionally this track) is the one loaded. */
export function useIsCurrent(slug: string, trackIndex?: number) {
  const state = usePlayer()
  const isPlaylist = state.playlist?.slug === slug
  const isTrack = isPlaylist && (trackIndex === undefined || state.trackIndex === trackIndex)
  return { isCurrent: isTrack, isPlaying: isTrack && state.status === 'playing', state }
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

/**
 * Global shortcuts: Space play/pause, ←/→ seek 5 s, Shift+←/→ previous/next,
 * M mute. Ignored while typing, and Space is left alone on focused controls so
 * it still activates them.
 */
export function usePlayerShortcuts() {
  useEffect(() => {
    player.attach()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
      if (isTyping(event.target) || !player.getSnapshot().track) return

      const onControl =
        event.target instanceof HTMLElement &&
        event.target.closest('button, a, [role="slider"], [role="menuitem"]')

      switch (event.key) {
        case ' ':
          if (onControl) return
          event.preventDefault()
          player.toggle()
          break
        case 'ArrowLeft':
          if (event.target instanceof HTMLElement && event.target.closest('[role="slider"]')) return
          event.preventDefault()
          if (event.shiftKey) player.previous()
          else player.seekBy(-5)
          break
        case 'ArrowRight':
          if (event.target instanceof HTMLElement && event.target.closest('[role="slider"]')) return
          event.preventDefault()
          if (event.shiftKey) player.next()
          else player.seekBy(5)
          break
        case 'm':
        case 'M':
          player.toggleMute()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
