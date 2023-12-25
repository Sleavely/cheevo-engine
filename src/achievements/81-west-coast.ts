import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 81,
  name: 'West Coast',
  level: 0,
  isSecret: false,
  description: 'Hämtat ordrar i två av våra Göteborgs-butiker',
  experiencePoints: 1500,
  imageName: 'west_coast',
} satisfies AchievementMeta

const storesIds = [10, 27]
export const predicates = {
  order: (order) => order.store !== null && storesIds.includes(order.store.id),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'store',
  required: 2,
})
