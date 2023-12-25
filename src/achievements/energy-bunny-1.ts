import { type AchievementMeta } from '../models/achievement'
import { type PredicateOptions } from '../reducers/rowReducers'
import { tieredListeners } from './_tieredListener'

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
} satisfies PredicateOptions

export const listeners = tieredListeners({
  tierMeta: meta,
  predicates,
  counter: 'quantity',
  required: 25,
})
