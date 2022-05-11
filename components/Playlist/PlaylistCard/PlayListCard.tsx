import Image from 'next/image'
import Link from 'next/link'
import s from './PlaylistCard.module.css'
import cn from 'clsx'
import { Button } from '../../UI'
import { PlayIcon, PlayingIcon } from '@components/Icons'
import { usePlayerState } from '../../../lib/player'

export interface props {
  id: string
  img: string
  title: string
  className?: string
}

const PlaylistCard: React.FC<props> = (props) => {
  const { id, img, title, className, children, ...rest } = props

  const state = usePlayerState()

  return (
    <div className={cn(s.root)}>
      <Link href={`/playlist/${encodeURIComponent(id)}`}>
        <a>
          <Image className={cn(s.img)} height={1024} width={1024} src={img} />
        </a>
      </Link>
      <div className={cn(s.cardInfo)}>
        <h1 className={cn(s.title)}>{title}</h1>
        {state.playing && state.playlist.id === id ? (
          <Link href={`/playlist/${encodeURIComponent(id)}`}>
            <Button variant="ghost">
              <PlayingIcon />
              Playing now
            </Button>
          </Link>
        ) : (
          <Link href={`/playlist/${encodeURIComponent(id)}`}>
            <Button>
              <PlayIcon />
              Listen Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default PlaylistCard
