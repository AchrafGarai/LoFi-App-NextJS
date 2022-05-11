import React, {
  ButtonHTMLAttributes,
  forwardRef,
  JSXElementConstructor,
  useRef,
} from 'react'
import s from './Button.module.css'
import cn from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'flat' | 'white' | 'ghost' | 'naked'
  size?: 'large' | 'slim'
  active?: boolean
  Component?: string | JSXElementConstructor<any>
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    size = 'large',
    children,
    active,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      [s.flat]: variant === 'flat',
      [s.ghost]: variant === 'ghost',
      [s.white]: variant === 'white',
      [s.naked]: variant === 'naked',
      [s.slim]: size === 'slim',
      [s.large]: size === 'large',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className,
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      disabled={disabled}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
})

export default Button
