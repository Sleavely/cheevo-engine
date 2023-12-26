import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 7,
  name: 'Globetrotter',
  level: 7,
  isSecret: false,
  description: 'Hämtat ordrar i 15 st butiker',
  experiencePoints: 15000,
  imageName: 'globetrotter',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => order.store !== null,
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'store',
  required: 15,
})
