import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 1317,
  name: 'Fudge You',
  level: 1,
  isSecret: false,
  description: 'Lagt en order den 28 december. Linus Torvalds födelsedag (1969)',
  experiencePoints: 1000,
  imageName: 'fudge_you',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { year: 1969, month: 12, day: 28 },
    endConstraints: { month: 12, day: 28 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
