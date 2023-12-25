import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 80,
  name: 'My Precious',
  level: 0,
  isSecret: false,
  description: 'Köpt en enskild vara för mer än 20000 kr',
  experiencePoints: 5000,
  imageName: 'my_precious',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.unitPrice >= 20000,
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 1,
})
