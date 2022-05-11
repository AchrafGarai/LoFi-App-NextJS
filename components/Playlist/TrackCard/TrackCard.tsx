import React, { ButtonHTMLAttributes, JSXElementConstructor } from 'react'
import { usePlayerState } from '@lib/player'
import { PlayIcon, PlayingIcon } from '@components/Icons'
import { Track } from '@lib/player/types'
import cn from 'clsx'
import s from './TrackCard.module.css'

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  fileUrl: string
  artist: string
  index: number
  playlistId: string
  Component?: string | JSXElementConstructor<any>
}

const TrackCard: React.FC<props> = (props) => {
  const {
    playlistId,
    title,
    fileUrl,
    artist,
    index,
    Component = 'button',
    ...rest
  } = props

  const state = usePlayerState()

  const rootClassName = cn(s.root, {
    [s.active]:
      state.currentTrackIndex === index && playlistId === state.playlist.id,
  })

  return (
    <Component className={rootClassName} {...rest}>
      <div className={cn(s.details)}>
        <p className={cn(s.title)}>{title}</p>
        <p className={cn(s.artist)}>{artist}</p>
      </div>
      <div className={cn(s.icon)}>
        {playlistId === state.playlist.id &&
        state.currentTrackIndex === index &&
        state.playing ? (
          <PlayingIcon />
        ) : (
          <PlayIcon />
        )}
      </div>
    </Component>
  )
}

export default TrackCard
