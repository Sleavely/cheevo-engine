import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinDate, toZonedDateTime } from '../lib/temporal'

export const meta = {
  id: 38,
  name: 'Itchy Trigger Fingers',
  level: 0,
  isSecret: false,
  description: 'Hämtat 25 st ordrar inom 15 minuter från att de bokats',
  experiencePoints: 5000,
  imageName: 'itchy_trigger_fingers',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => {
    if (order.shippingMethod.id !== 4) return false

    const periodStart = toZonedDateTime(order.orderDate)
    const periodEnd = periodStart.add({ minutes: 15 })
    const pickupDate = toZonedDateTime(order.sentDate)

    return isWithinDate({ evaluand: pickupDate, periodStart, periodEnd, inclusiveEnd: false })
  },
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 25,
})
