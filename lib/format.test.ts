import { describe, expect, it } from 'vitest'
import { formatTime, spokenTime } from './format'

describe('formatTime', () => {
  it('pads seconds', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(75.9)).toBe('1:15')
    expect(formatTime(600)).toBe('10:00')
  })

  it('handles invalid values from a loading <audio>', () => {
    expect(formatTime(Number.NaN)).toBe('0:00')
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe('0:00')
  })
})

it('spells out time for screen readers', () => {
  expect(spokenTime(61)).toBe('1 minute 1 second')
  expect(spokenTime(5)).toBe('5 seconds')
})
