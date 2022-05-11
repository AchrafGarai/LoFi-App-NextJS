import cn from 'clsx'
import s from './Grid.module.css'
export interface props {
  className?: string
  variant?: 'A' | 'B'
}

const Grid: React.FC<props> = (props) => {
  const { className, children, variant = 'A', ...rest } = props

  const rootClassName = cn(
    s.root,
    {
      [s.A]: variant === 'A',
      [s.B]: variant === 'B',
    },
    className,
  )

  return (
    <>
      <div className={rootClassName}>{children}</div>
    </>
  )
}

export default Grid
