import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 646,
  name: "It's Destiny",
  level: 0,
  isSecret: false,
  description: 'Lagt en order 9:e september. Destinys födelsedag (2014)',
  experiencePoints: 1000,
  imageName: 'its_destiny',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { year: 2014, month: 9, day: 9 },
    endConstraints: { month: 9, day: 9 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
