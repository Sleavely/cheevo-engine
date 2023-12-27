import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 22,
  name: 'The Collector',
  level: 1,
  isSecret: false,
  description: 'Köpt 2 st Collectors Edition-varianter av spel',
  experiencePoints: 1000,
  imageName: 'the_collector',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => (
    row.product.categoryTree.startsWith('Spel/') || row.product.categoryTree.includes('spel/')
  ) &&
  !!row.product.name.match(/Collector[`´']?s? Edition/i),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 2,
})
