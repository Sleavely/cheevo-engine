import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 20,
  name: 'Pretty as a Picture',
  level: 1,
  isSecret: false,
  description: 'Köpt personvård för 2500 kr',
  experiencePoints: 2500,
  imageName: 'pretty_as_a_picture',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.categoryTree.includes('Personvård'),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 2500,
})
