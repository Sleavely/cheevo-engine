import { type AchievementMeta } from '../models/achievement'
import { type PredicateOptions } from '../reducers/rowReducers'
import { makeListeners } from './_rowShippedListener'

export const meta = {
  id: 19,
  name: 'Super Parent',
  level: 1,
  isSecret: false,
  description: 'Köpt Lego för 2500 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.categoryTree.includes('/LEGO'),
} satisfies PredicateOptions

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 2500,
})
