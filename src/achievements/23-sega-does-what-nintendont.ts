import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 23,
  name: "SEGA Does What Nintendon't",
  level: 0,
  isSecret: false,
  description: 'Köpt 20 st SEGA-utgivna spel',
  experiencePoints: 5000,
  imageName: 'sega_does_what_nintendont',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => (
    row.product.categoryTree.startsWith('Spel/') && row.product.manufacturer.name === 'SEGA'
  ),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 20,
})
