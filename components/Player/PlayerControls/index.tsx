import player, { usePlayerState, useCurrentTime } from '../../../lib/player'
import { formatTime } from './utils'
import { Slider } from '@components/UI'
import { PlayerSliderControls } from '@components/Player/PlayerSliderControls'
import cn from 'clsx'
import s from './PlayerControls.module.css'

export interface Props {
  className?: string
  layout?: 'vertical' | 'horizontal'
}

const PlayerControls: React.FC<Props> = (props) => {
  const { className, layout = 'horizontal', ...rest } = props

  const state = usePlayerState()
  const currentTime = useCurrentTime()

  const progress = currentTime / state.duration
  function changeval(val: number[]): void {
    player.seek(state.duration * 0.5)
  }

  const rootClassName = cn(
    s.root,
    {
      [s.horizontal]: layout === 'horizontal',
      [s.vertical]: layout === 'vertical',
    },
    className,
  )

  return (
    <div className={rootClassName}>
      <PlayerSliderControls />
      <div className="w-full flex flex-row gap-4">
        <span className={cn(s.label)}>{formatTime(currentTime)}</span>
        <Slider
          min={0}
          max={1}
          value={progress}
          handleChange={(value) =>
            player.seek(state.duration * (value[0] as number))
          }
        />
        <span className={cn(s.label)}>{formatTime(state.duration)}</span>
      </div>
    </div>
  )
}

export default PlayerControls
