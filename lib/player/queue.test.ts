import { describe, expect, it } from 'vitest'
import {
  createQueue,
  currentIndex,
  nextPosition,
  nextRepeatMode,
  previousPosition,
  withPosition,
  withShuffle,
  withTrack,
  type RepeatMode,
} from './queue'

const linear = (length: number, start = 0, repeat: RepeatMode = 'off') =>
  createQueue(length, start, { shuffle: false, repeat })

/** Deterministic "random" numbers for shuffle tests. */
const seeded = (...values: number[]) => {
  let i = 0
  return () => values[i++ % values.length]
}

describe('createQueue', () => {
  it('starts at the requested track in playlist order', () => {
    const queue = linear(4, 2)
    expect(queue.order).toEqual([0, 1, 2, 3])
    expect(currentIndex(queue)).toBe(2)
  })

  it('clamps an out-of-range start index', () => {
    expect(currentIndex(linear(3, 9))).toBe(2)
    expect(currentIndex(linear(3, -1))).toBe(0)
  })

  it('puts the chosen track first when shuffling', () => {
    const queue = createQueue(5, 3, { shuffle: true, repeat: 'off' }, seeded(0.1, 0.7, 0.4))
    expect(queue.position).toBe(0)
    expect(currentIndex(queue)).toBe(3)
    expect([...queue.order].sort()).toEqual([0, 1, 2, 3, 4])
  })

  it('rejects an empty playlist', () => {
    expect(() => linear(0)).toThrow(RangeError)
  })
})

describe('nextPosition', () => {
  it('advances, then stops at the end with repeat off', () => {
    expect(nextPosition(linear(3, 0))).toBe(1)
    expect(nextPosition(linear(3, 2))).toBeNull()
  })

  it('wraps to the start with repeat all', () => {
    expect(nextPosition(linear(3, 2, 'all'))).toBe(0)
  })

  it('replays the same track only when it ended by itself with repeat one', () => {
    const queue = linear(3, 1, 'one')
    expect(nextPosition(queue, { auto: true })).toBe(1)
    expect(nextPosition(queue)).toBe(2)
  })
})

describe('previousPosition', () => {
  it('goes back, and stays on the first track with repeat off', () => {
    expect(previousPosition(linear(3, 2))).toBe(1)
    expect(previousPosition(linear(3, 0))).toBe(0)
  })

  it('wraps to the last track with repeat all', () => {
    expect(previousPosition(linear(3, 0, 'all'))).toBe(2)
  })
})

describe('withShuffle', () => {
  it('keeps the current track when turning shuffle on and off', () => {
    const playing = withPosition(linear(5), 3)
    const shuffled = withShuffle(playing, true, seeded(0.9, 0.2, 0.5))
    expect(currentIndex(shuffled)).toBe(3)
    expect(shuffled.position).toBe(0)

    const unshuffled = withShuffle(shuffled, false)
    expect(unshuffled.order).toEqual([0, 1, 2, 3, 4])
    expect(currentIndex(unshuffled)).toBe(3)
  })
})

describe('withTrack', () => {
  it('jumps to a track by its playlist index, even when shuffled', () => {
    const queue = createQueue(4, 0, { shuffle: true, repeat: 'off' }, seeded(0.3, 0.8))
    expect(currentIndex(withTrack(queue, 2))).toBe(2)
  })
})

it('cycles repeat modes off → all → one → off', () => {
  expect(nextRepeatMode('off')).toBe('all')
  expect(nextRepeatMode('all')).toBe('one')
  expect(nextRepeatMode('one')).toBe('off')
})
