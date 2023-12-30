import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 30,
  name: 'M$ 4 L1F3',
  level: 0,
  isSecret: false,
  description: 'Köpt Microsoft-produkter för 25000 kr',
  experiencePoints: 5000,
  imageName: 'ms_4_l1f3',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.manufacturer.name === 'Microsoft',
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 25000,
})
