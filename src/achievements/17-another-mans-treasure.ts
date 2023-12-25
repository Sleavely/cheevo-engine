import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 17,
  name: "Another Man's Treasure",
  level: 1,
  isSecret: false,
  description: 'Köpt 2 st fyndvaror',
  experiencePoints: 1000,
  imageName: 'another_mans_treasure',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.section.name === 'Fyndvaror',
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 2,
})
