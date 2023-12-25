import { type AchievementMeta } from '../models/achievement'
import { type PredicateOptions } from '../reducers/rowReducers'
import { makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 12,
  name: 'Zombie',
  level: 0,
  isSecret: false,
  description: 'Hämtat ut 25 st ordrar som lagts mellan 02:00 och 05:00',
  experiencePoints: 5000,
  imageName: 'zombie',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { hour: 2 },
    endConstraints: { hour: 5 },
    inclusiveEnd: false,
  }),
} satisfies PredicateOptions

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 25,
})
