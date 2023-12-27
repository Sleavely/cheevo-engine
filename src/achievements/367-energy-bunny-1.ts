import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 367,
  name: 'Energy Bunny',
  level: 1,
  isSecret: false,
  description: 'Köpt 25 st energidrycker',
  experiencePoints: 1000,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.categoryTree.includes('Godis/Energidryck'),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 25,
})
