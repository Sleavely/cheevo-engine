import { Temporal } from 'temporal-polyfill'
import { describe, expect, test } from 'vitest'
import { isWithinDate, isWithinRecurring, toZonedDateTime } from './temporal'

describe('toZonedDateTime()', () => {
  const christmasEve = Temporal.ZonedDateTime.from('2023-12-24T00:00:00[Europe/Stockholm]')
  test.each([
    [Temporal.Instant.from('2023-12-24T00:00:00+01:00'), christmasEve],
    [Temporal.ZonedDateTime.from('2023-12-24T00:00:00[Europe/Stockholm]'), christmasEve],
    ['2023-12-24', christmasEve],
    ['2023-12-24[Europe/Stockholm]', christmasEve],
    [1703372400, christmasEve],
    [1703372400000, christmasEve],
    ['2023-12-24T13:37:30', Temporal.ZonedDateTime.from('2023-12-24T13:37:30[Europe/Stockholm]')],
  ])('%s -> %j', (input, expected) => {
    const output = toZonedDateTime(input)

    expect(output).toBeInstanceOf(Temporal.ZonedDateTime)
    expect(output.equals(expected)).toBe(true)
  })
})

describe('isWithinDate()', () => {
  test('before returns false', () => {
    const params = {
      evaluand: '2023-12-24T13:37:30',
      periodStart: '2024-01-07',
      periodEnd: '2024-01-07',
    }

    const result = isWithinDate(params)

    expect(result).toBe(false)
  })

  test('during returns true', () => {
    const params = {
      evaluand: '2023-12-24T13:37:30',
      periodStart: '2023-12-22',
      periodEnd: '2023-12-25',
    }

    const result = isWithinDate(params)

    expect(result).toBe(true)
  })

  test('after returns false', () => {
    const params = {
      evaluand: '2023-12-24T13:37:30',
      periodStart: '2023-12-22',
      periodEnd: '2023-12-23',
    }

    const result = isWithinDate(params)

    expect(result).toBe(false)
  })

  test('inclusiveEnd', () => {
    const params = {
      evaluand: '2023-12-24T13:37:30',
      periodStart: '2023-12-24',
      periodEnd: '2023-12-24',
      inclusiveEnd: false,
    }

    params.inclusiveEnd = false
    expect(isWithinDate(params)).toBe(false)

    params.inclusiveEnd = true
    expect(isWithinDate(params)).toBe(true)
  })
})

describe('isWithinRecurring()', () => {
  test.each([
    ['year', 1990, false],
    ['month', 10, false],
    ['day', 20, false],
    ['hour', 8, false],
    ['minute', 36, false],
    ['dayOfWeek', 4, false],
    ['weekOfYear', 3, false],
    ['year', 2023, true],
    ['month', 12, true],
    ['day', 24, true],
    ['hour', 13, true],
    ['minute', 37, true],
    ['dayOfWeek', 7, true],
    ['weekOfYear', 51, true],
  ])('2023-12-24 with %s %d constraint should be %j', (constraintProp, val, expected) => {
    const params = {
      evaluand: '2023-12-24T13:37:30',
      startConstraints: {
        [constraintProp]: val,
      },
      endConstraints: {
        [constraintProp]: val,
      },
    }
    expect(isWithinRecurring(params)).toBe(expected)
  })
  test('startConstraints dont need to match endConstraints (start-year can be set)', () => {
    const params = {
      evaluand: '2020-12-24',
      startConstraints: {
        year: 2021,
        day: 24,
      },
      endConstraints: {
        day: 24,
      },
    }

    expect(isWithinRecurring(params)).toBe(false)
    params.evaluand = '2021-12-24'
    expect(isWithinRecurring(params)).toBe(true)
    params.evaluand = '2022-12-24'
    expect(isWithinRecurring(params)).toBe(true)
  })
  test('inclusiveEnd', () => {
    const params = {
      evaluand: '2023-12-24T13:37:00',
      startConstraints: {
        day: 24,
      },
      endConstraints: {
        day: 24,
      },
      inclusiveEnd: false,
    }

    expect(isWithinRecurring(params)).toBe(false)

    params.inclusiveEnd = true
    expect(isWithinRecurring(params)).toBe(true)
  })
})
