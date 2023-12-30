import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 34,
  name: 'Karma',
  level: 1,
  isSecret: false,
  description: 'Donerat pengar till välgörenhet',
  experiencePoints: 2500,
  imageName: 'karma',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => [
    366920, // Donera 100 kr till Musikhjälpen
    363796, // Donera 250 kr till Para Esports
  ].includes(row.product.id),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 100,
})
