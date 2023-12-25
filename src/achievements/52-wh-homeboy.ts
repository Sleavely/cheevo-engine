import { type AchievementMeta } from '../models/achievement'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 52,
  name: 'WH Homeboy',
  level: 0,
  isSecret: false,
  description: 'Köpt en Webhallen-produkt',
  experiencePoints: 1000,
  imageName: 'wh_homeboy',
}satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.manufacturer.name === 'Webhallen',
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 1,
})
