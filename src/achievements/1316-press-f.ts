import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 1316,
  name: 'Press F',
  level: 1,
  isSecret: false,
  description: 'Lagt en order den 29 oktober. Call of Dutys födelsedag (2003)',
  experiencePoints: 1000,
  imageName: 'press_f',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { year: 2003, month: 10, day: 29 },
    endConstraints: { month: 10, day: 29 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
