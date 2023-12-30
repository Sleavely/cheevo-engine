import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 28,
  name: 'Burner',
  level: 1,
  isSecret: false,
  description: 'Köpt 2 st mobiltelefoner',
  experiencePoints: 1000,
  imageName: 'burner',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.categoryTree.startsWith('Mobil/Mobiltelefon'),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 2,
})
