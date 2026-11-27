import { clsx } from 'clsx'

/** Animated equaliser shown next to the track that is playing. */
export function PlayingBars({ active, className }: { active: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={clsx('flex h-4 w-4 items-end justify-center gap-[3px]', className)}>
      {[0, 200, 100].map((delay) => (
        <span
          key={delay}
          // Animation is a class (not an inline style) so motion-reduce can turn it off.
          className={clsx(
            'h-full w-[3px] origin-bottom rounded-full bg-accent',
            active
              ? 'animate-[eq_700ms_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:scale-y-75'
              : 'scale-y-25',
          )}
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}
