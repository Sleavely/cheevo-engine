import { Temporal } from 'temporal-polyfill'

type ToZonedDateTimeInput = number | string | Date | Temporal.Instant | Temporal.ZonedDateTime

/**
 * Helper to parse different zone-less date formats as Europe/Stockholm
 */
export const toZonedDateTime = (input: ToZonedDateTimeInput): Temporal.ZonedDateTime => {
  if (input instanceof Temporal.ZonedDateTime) {
    return input
  }
  if (input instanceof Temporal.Instant) {
    return input.toZonedDateTimeISO('Europe/Stockholm')
  }
  if (input instanceof Date) {
    return Temporal.Instant.fromEpochMilliseconds(input.valueOf()).toZonedDateTimeISO('Europe/Stockholm')
  }

  // if its a string we'll want to try to parse it as a zoneddate and then a generic instant we'll convert to zoned
  if (typeof input === 'string') {
    try {
      return Temporal.ZonedDateTime.from(input)
    } catch (err) {
      try {
        return Temporal.ZonedDateTime.from(`${input}[Europe/Stockholm]`)
      } catch (err2) {
        return Temporal.Instant.from(input).toZonedDateTimeISO('Europe/Stockholm')
      }
    }
  }
  // Probably epochseconds
  if (input < 9999999999) {
    return Temporal.Instant.fromEpochSeconds(input.valueOf()).toZonedDateTimeISO('Europe/Stockholm')
  }

  // fall back to assuming its milliseconds
  return Temporal.Instant.fromEpochMilliseconds(input.valueOf()).toZonedDateTimeISO('Europe/Stockholm')
}

interface IsWithinInput {
  evaluand: ToZonedDateTimeInput
  periodStart: ToZonedDateTimeInput
  periodEnd: ToZonedDateTimeInput
  inclusiveEnd?: boolean
}
export const isWithinDate = ({ evaluand, periodStart, periodEnd, inclusiveEnd = true }: IsWithinInput): boolean => {
  const comparisonDate = toZonedDateTime(evaluand)

  const startDate = toZonedDateTime(periodStart)
  const endDate = inclusiveEnd
    ? toZonedDateTime(periodEnd).add({ days: 1 })
    : toZonedDateTime(periodEnd)

  const wasAfterStart = Temporal.ZonedDateTime.compare(comparisonDate, startDate) === 1
  const wasBeforeEnd = Temporal.ZonedDateTime.compare(comparisonDate, endDate) === -1

  return wasAfterStart && wasBeforeEnd
}

interface RecurringConstraint {
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  dayOfWeek?: number
  weekOfYear?: number
}
interface IsWithinRecurringInput {
  evaluand: ToZonedDateTimeInput
  startConstraints: RecurringConstraint
  endConstraints: RecurringConstraint
  inclusiveEnd?: boolean
}
export const isWithinRecurring = ({ evaluand, startConstraints, endConstraints, inclusiveEnd = true }: IsWithinRecurringInput): boolean => {
  const comparisonDate = toZonedDateTime(evaluand)

  const matchesStart = Object.entries(startConstraints).reduce<boolean>((prev, [prop, val]) => {
    return prev && comparisonDate[prop as keyof RecurringConstraint] >= val
  }, true)

  const matchesEnd = Object.entries(endConstraints).reduce<boolean>((prev, [prop, val]) => {
    return prev && (
      inclusiveEnd
        ? comparisonDate[prop as keyof RecurringConstraint] <= val
        : comparisonDate[prop as keyof RecurringConstraint] < val
    )
  }, true)

  return matchesStart && matchesEnd
}
