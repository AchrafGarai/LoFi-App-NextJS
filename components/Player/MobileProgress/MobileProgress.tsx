import cn from 'clsx'
import s from './MobileProgress.module.css'
import * as Progress from '@radix-ui/react-progress'
import { usePlayerState, useCurrentTime } from '../../../lib/player'

function MobileProgress() {
  const state = usePlayerState()
  const currentTime = useCurrentTime()
  const progress = currentTime / state.duration
  return (
    <Progress.Root value={progress} max={1} className={cn(s.root)}>
      <Progress.Indicator
        className={cn(s.indicator)}
        style={{ width: `${progress * 100}%` }}
      />
    </Progress.Root>
  )
}

export default MobileProgress
