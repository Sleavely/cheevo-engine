import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 78,
  name: 'Frequent Flyer',
  level: 6,
  isSecret: false,
  description: 'Hämtat ordrar i 10 st butiker',
  experiencePoints: 10000,
  imageName: 'frequent_flyer',
} satisfies AchievementMeta

export const predicates = {} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'store',
  required: 10,
})
