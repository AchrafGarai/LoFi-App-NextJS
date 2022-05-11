import * as RadioGroup from '@radix-ui/react-radio-group'
import RadioItem from '../RadioItem'
import s from './ThemeSelect.module.css'
import cn from 'clsx'
import { useTheme } from 'next-themes'

function ThemeSelect() {
  const rootClassName = cn(s.root)

  const { theme, setTheme } = useTheme()

  return (
    <form>
      <RadioGroup.Root
        value={theme}
        className={cn(s.root)}
        onValueChange={(e) => setTheme(e)}
      >
        <RadioItem value="dark" variant="dark"></RadioItem>
        <RadioItem value="blue" variant="blue"></RadioItem>
        <RadioItem value="violet" variant="violet"></RadioItem>
        <RadioItem value="pink" variant="pink"></RadioItem>
        <RadioItem value="white" variant="white"></RadioItem>
        <RadioItem value="spotify" variant="spotify"></RadioItem>
      </RadioGroup.Root>
    </form>
  )
}

export default ThemeSelect
