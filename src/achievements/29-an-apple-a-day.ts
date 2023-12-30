import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 29,
  name: 'An Apple a Day',
  level: 0,
  isSecret: false,
  description: 'Köpt 10 st Apple-produkter',
  experiencePoints: 2500,
  imageName: 'an_apple_a_day',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.manufacturer.name === 'Apple',
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 10,
})
