import { clsx } from 'clsx'
import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'accent' | 'raised' | 'plain' | 'contrast'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-surface hover:brightness-110',
  raised: 'bg-raised text-fg hover:brightness-125',
  plain: 'text-fg hover:bg-raised',
  contrast: 'bg-fg text-surface hover:scale-105',
}

export function buttonClass(variant: Variant = 'accent', className?: string) {
  return clsx(
    'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition disabled:pointer-events-none disabled:opacity-40',
    variants[variant],
    className,
  )
}

export function Button({
  variant = 'accent',
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, clsx('p-3', className))} {...props} />
}

export function ButtonLink({
  variant = 'accent',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, clsx('px-5 py-3', className))} {...props} />
}
