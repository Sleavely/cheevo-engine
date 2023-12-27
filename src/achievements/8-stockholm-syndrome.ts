import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 8,
  name: 'Stockholm Syndrome',
  level: 0,
  isSecret: false,
  description: 'Hämtat ordrar i samtliga Stockholms-butiker',
  experiencePoints: 10000,
  imageName: 'stockholm_syndrome',
} satisfies AchievementMeta

const storesIds = [1, 2, 9, 11, 14, 15, 16, 19, 20, 28, 21]
export const predicates = {
  order: (order) => order.store !== null && storesIds.includes(order.store.id),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'store',
  required: storesIds.length,
})
