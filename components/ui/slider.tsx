'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

export function Slider({
  value,
  max,
  step,
  label,
  valueText,
  onChange,
  onCommit,
  className,
  disabled,
}: {
  value: number
  max: number
  step: number
  label: string
  valueText?: string
  onChange: (value: number) => void
  onCommit?: (value: number) => void
  className?: string
  disabled?: boolean
}) {
  return (
    <SliderPrimitive.Root
      className={clsx(
        'group relative flex h-4 touch-none items-center select-none',
        className ?? 'w-full',
      )}
      min={0}
      max={max || 1}
      step={step}
      value={[Math.min(value, max || 1)]}
      onValueChange={([next]) => onChange(next)}
      onValueCommit={([next]) => onCommit?.(next)}
      disabled={disabled}
    >
      <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-full bg-muted/25">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-fg group-hover:bg-accent group-focus-within:bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={label}
        aria-valuetext={valueText}
        className="block size-3.5 rounded-full bg-fg opacity-0 shadow transition-opacity group-hover:bg-accent group-hover:opacity-100 focus-visible:bg-accent focus-visible:opacity-100"
      />
    </SliderPrimitive.Root>
  )
}
