import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 1313,
  name: 'Test Your Might',
  level: 1,
  isSecret: false,
  description: 'Lagt en order den 8 oktober. Mortal Kombats födelsedag (1992)',
  experiencePoints: 1000,
  imageName: 'test_your_might',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { year: 1992, month: 10, day: 8 },
    endConstraints: { month: 10, day: 8 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
