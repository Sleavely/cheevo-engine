import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 31,
  name: 'Terrabyte',
  level: 0,
  isSecret: false,
  description: 'Köpt 10 st produkter tillverkade av Gigabyte',
  experiencePoints: 4000,
  imageName: 'terrabyte',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.manufacturer.name === 'Gigabyte',
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 10,
})
