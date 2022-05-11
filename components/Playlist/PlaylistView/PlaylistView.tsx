import { LeftArrowIcon } from '@components/Icons'
import { PlayListHeader } from '@components/Playlist/PlayListHeader'
import { TrackCard } from '@components/Playlist/TrackCard'
import { Button, Grid } from '@components/UI'
import player, { usePlayerState } from '@lib/player'
import { Playlist, Track } from '@lib/player/types'
import Link from 'next/link'

export interface props {
  playlist: Playlist
  className?: string
}

const PlaylistView: React.FC<props> = (props) => {
  const { playlist, className, children, ...rest } = props

  const state = usePlayerState()

  const PlayTrack = (index: number) => {
    if (state.playing && index === state.currentTrackIndex) {
      player.pause()
    } else if (index !== state.currentTrackIndex) {
      player.playTrack(index)
      player.play()
    } else {
      player.play()
    }
  }

  const setQueue = (index?: number) => {
    if (index) {
      player.setQueue(playlist, index)
    } else {
      player.setQueue(playlist, 0)
    }
    console.log(state.playlist)
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== playlist.id) {
      // set Queue
      setQueue(index)
      player.play()
      return
    } else {
      // handle play
      PlayTrack(index || 0)
    }
  }

  return (
    <div>
      <div className="flex flex-col mb-8 items-start">
        <Link href="/">
          <Button variant="ghost">
            <LeftArrowIcon />
            Back to home
          </Button>
        </Link>
      </div>
      <Grid variant="B">
        <PlayListHeader
          playlist_id={playlist.id}
          img={playlist.imageUrl}
          title={playlist.title}
          changePlaylist={() => handlePlay()}
        />
        <div className="flex flex-col gap-6">
          {playlist.tracks.map((track: Track, index: number) => (
            <TrackCard
              onClick={() => handlePlay(index)}
              playlistId={playlist.id}
              title={track.title}
              fileUrl={track.url}
              artist={track.artist.name}
              key={index}
              index={index}
            />
          ))}
        </div>
      </Grid>
    </div>
  )
}

export default PlaylistView
