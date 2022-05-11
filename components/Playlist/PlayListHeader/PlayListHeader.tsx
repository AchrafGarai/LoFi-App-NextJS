import Image from 'next/image'
import s from './PlayListHeader.module.css'
import cn from 'clsx'
import { Button } from '../../UI'
import { PauseIcon, PlayIcon } from '@components/Icons'
import { usePlayerState } from '@lib/player'
import PlayerControls from '@components/Player/PlayerControls'

export interface props {
  playlist_id: string
  img: string
  title: string
  className?: string
  changePlaylist: (id: string) => void
}

const PlayListHeader: React.FC<props> = (props) => {
  const {
    playlist_id,
    img,
    title,
    className,
    children,
    changePlaylist,
    ...rest
  } = props

  const state = usePlayerState()

  return (
    <div className={cn(s.root)}>
      <div className="hidden sm:block">
        <Image height={1024} width={1024} src={img} className={cn(s.img)} />
      </div>
      <div className="block sm:hidden">
        <Image height={200} width={200} src={img} className={cn(s.img)} />
      </div>

      <h1 className={cn(s.title)}>{title}</h1>

      {state.playlist.id === playlist_id ? (
        <PlayerControls layout="vertical" />
      ) : (
        <Button onClick={() => changePlaylist(playlist_id)}>
          <PlayIcon />
          Play
        </Button>
      )}
    </div>
  )
}

export default PlayListHeader
