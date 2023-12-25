import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'
import { isWithinRecurring } from '../lib/temporal'

export const meta = {
  id: 84,
  name: 'First Blood',
  level: 0,
  isSecret: false,
  description: 'Lagt en order den 1:a januari',
  experiencePoints: 1500,
  imageName: 'first_blood',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => order.shippingMethod.id !== 4 && isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { month: 12, day: 22 },
    endConstraints: { month: 12, day: 23 },
  }),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
