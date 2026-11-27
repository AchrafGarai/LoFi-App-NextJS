/**
 * Pure queue logic: which track plays next, previous, after shuffling, and
 * what repeat does. No audio and no React, so it is trivially unit-tested.
 *
 * `order` is a permutation of track indices and `position` points into it,
 * so shuffling never reorders the playlist itself.
 */

export type RepeatMode = 'off' | 'all' | 'one'

export interface Queue {
  length: number
  order: number[]
  position: number
  shuffle: boolean
  repeat: RepeatMode
}

type Random = () => number

function sequence(length: number) {
  return Array.from({ length }, (_, i) => i)
}

/** Fisher–Yates shuffle that keeps `first` at the front. */
function shuffledOrder(length: number, first: number, random: Random) {
  const rest = sequence(length).filter((i) => i !== first)
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[rest[i], rest[j]] = [rest[j], rest[i]]
  }
  return [first, ...rest]
}

export function createQueue(
  length: number,
  startIndex: number,
  options: { shuffle: boolean; repeat: RepeatMode },
  random: Random = Math.random,
): Queue {
  if (length < 1) throw new RangeError('A queue needs at least one track')
  const start = Math.min(Math.max(startIndex, 0), length - 1)
  return options.shuffle
    ? { length, order: shuffledOrder(length, start, random), position: 0, ...options }
    : { length, order: sequence(length), position: start, ...options }
}

export function currentIndex(queue: Queue) {
  return queue.order[queue.position]
}

/**
 * The next position, or `null` when playback should stop.
 * `auto` is true when the current track ended by itself, which is the only
 * case where "repeat one" replays the same track.
 */
export function nextPosition(queue: Queue, { auto = false } = {}): number | null {
  if (auto && queue.repeat === 'one') return queue.position
  if (queue.position + 1 < queue.length) return queue.position + 1
  return queue.repeat === 'off' ? null : 0
}

/** The previous position; at the start it wraps (repeat all) or stays put. */
export function previousPosition(queue: Queue): number {
  if (queue.position > 0) return queue.position - 1
  return queue.repeat === 'all' ? queue.length - 1 : 0
}

export function withPosition(queue: Queue, position: number): Queue {
  return { ...queue, position }
}

/** Jump to a specific track (by playlist index), keeping the current order. */
export function withTrack(queue: Queue, trackIndex: number): Queue {
  const position = queue.order.indexOf(trackIndex)
  return position === -1 ? queue : { ...queue, position }
}

/** Toggle shuffle without interrupting the track that is playing. */
export function withShuffle(queue: Queue, shuffle: boolean, random: Random = Math.random): Queue {
  if (shuffle === queue.shuffle) return queue
  const current = currentIndex(queue)
  return shuffle
    ? { ...queue, shuffle, order: shuffledOrder(queue.length, current, random), position: 0 }
    : { ...queue, shuffle, order: sequence(queue.length), position: current }
}

export function nextRepeatMode(mode: RepeatMode): RepeatMode {
  return mode === 'off' ? 'all' : mode === 'all' ? 'one' : 'off'
}
