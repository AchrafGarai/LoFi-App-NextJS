import player, { usePlayerState } from '../../../lib/player'
import { VolumeIcon } from '@components/Icons'
import { Slider } from '@components/UI'
import cn from 'clsx'
import s from './PlayerVolumeControls.module.css'

const PlayerVolumeControls = () => {
  const state = usePlayerState()

  return (
    <div className={cn(s.root)}>
      <VolumeIcon />

      <div className={cn(s.container)}>
        <Slider
          min={0}
          max={1}
          value={state.volume}
          handleChange={(value) => player.volume(value[0])}
        />
      </div>
    </div>
  )
}

export default PlayerVolumeControls
