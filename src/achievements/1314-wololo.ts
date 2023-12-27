import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 1314,
  name: 'Wololo',
  level: 1,
  isSecret: false,
  description: 'Lagt en order den 15 oktober. Age of Empires födelsedag (1997)',
  experiencePoints: 1000,
  imageName: 'wololo',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { year: 1997, month: 10, day: 15 },
    endConstraints: { month: 10, day: 15 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
