import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 9,
  name: "Thu'um Master",
  level: 5,
  isSecret: false,
  description: '100 hämtade/skickade ordrar',
  experiencePoints: 5000,
  imageName: 'thuum_master',
} satisfies AchievementMeta

export const predicates = {} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 100,
})
