import player, { usePlayerState } from '../../../lib/player'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'clsx'
import s from './Cover.module.css'
import { PlayingIcon, PlayIcon, PauseIcon } from '@components/Icons'
import { Button } from '@components/UI'

export interface props {
  coverUrl?: string
  title?: string
  artist?: string
  className?: string
}

const Cover: React.FC<props> = (props) => {
  const {
    coverUrl = '/Popular_hits.jpg',
    title,
    artist,
    className,
    ...rest
  } = props

  const { currentTrack, playing, playlist } = usePlayerState()

  const handlePlay = () => {
    if (playing) {
      player.pause()
    } else {
      player.play()
    }
  }

  if (!currentTrack) {
    return null
  }

  return (
    <Link href={`/playlist/${encodeURIComponent(playlist.id)}`}>
      <a>
        <div className={cn(s.container)}>
          <div className={cn(s.root)}>
            <PlayingIcon />
            <Image
              className={cn(s.img)}
              width={48}
              height={48}
              src={coverUrl}
            />
            <div className={cn(s.info)}>
              <p className={cn(s.title)}>{currentTrack.title}</p>
              <p className={cn(s.artist)}>{currentTrack.artist?.name}</p>
            </div>
          </div>
          <div className="block md:hidden mr-4">
            {playing ? (
              <Button variant="ghost" size="slim" onClick={() => handlePlay()}>
                <PauseIcon />
              </Button>
            ) : (
              <Button variant="ghost" size="slim" onClick={() => handlePlay()}>
                <PlayIcon />
              </Button>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Cover
