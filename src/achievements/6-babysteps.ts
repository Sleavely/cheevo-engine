import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 6,
  name: 'Babysteps',
  level: 1,
  isSecret: false,
  description: '3 hämtade/skickade ordrar',
  experiencePoints: 1500,
  imageName: 'babysteps',
} satisfies AchievementMeta

export const predicates = {} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 3,
})
