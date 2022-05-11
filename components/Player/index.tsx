import React from 'react'
import { usePlayerState } from '../../lib/player'
import { PlayerVolumeControls } from './PlayerVolumeControls'
import { Cover } from './Cover'
import PlayerControls from './PlayerControls'
import cn from 'clsx'
import s from './Player.module.css'
import { MobileProgress } from './MobileProgress'

const Player = () => {
  const { currentTrack } = usePlayerState()
  const state = usePlayerState()
  if (!currentTrack) {
    return null
  }
  return (
    <div className={cn(s.root)}>
      <div className={cn(s.container)}>
        <Cover coverUrl={state.playlist.imageUrl} />
        <div className="hidden col-span-2 md:block">
          <PlayerControls />
        </div>
        <PlayerVolumeControls />
      </div>
      <MobileProgress />
    </div>
  )
}

export default Player
