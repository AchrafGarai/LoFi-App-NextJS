import player, { usePlayerState } from '../../../lib/player'
import { Button } from '@components/UI'
import { PlayIcon, PauseIcon, PlayNext, PlayPrev } from '@components/Icons'

function PlayerSliderControls() {
  const { currentTrack, playing } = usePlayerState()

  if (!currentTrack) {
    return null
  }

  const handlePlay = () => {
    if (playing) {
      player.pause()
    } else {
      player.play()
    }
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <Button variant="naked" size="slim" onClick={() => player.prev()}>
        <PlayPrev />
      </Button>
      <Button variant="white" size="slim" onClick={handlePlay}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button variant="naked" size="slim" onClick={() => player.next()}>
        <PlayNext />
      </Button>
    </div>
  )
}

export default PlayerSliderControls
