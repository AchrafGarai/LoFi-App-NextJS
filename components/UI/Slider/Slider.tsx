import * as SliderPrimitive from '@radix-ui/react-slider'
import cn from 'clsx'
import s from './Slider.module.css'

export interface SliderProps {
  min: number
  max: number
  value: number
  handleChange: (val: number[]) => void
}

const Slider: React.FC<SliderProps> = (props) => {
  const { min = 0, max = 0, value = 0, handleChange, ...rest } = props
  return (
    <div className={cn(s.root)}>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={0.01}
        value={[value]}
        className={cn(s.container)}
        onValueChange={(value) => handleChange(value)}
      >
        <SliderPrimitive.Track className={cn(s.track)}>
          <SliderPrimitive.Range className={cn(s.range)} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn(s.thumb)} />
      </SliderPrimitive.Root>
    </div>
  )
}

export default Slider
