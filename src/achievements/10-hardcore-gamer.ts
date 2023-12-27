import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 10,
  name: 'Hardcore Gamer',
  level: 1,
  isSecret: false,
  description: 'Köpt 25 st spel',
  experiencePoints: 5000,
  imageName: 'hardcore_gamer',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => {
    const categoryTree = row.product.categoryTree.toLocaleLowerCase('sv-SE')
    return categoryTree.startsWith('spel/') &&
    !categoryTree.includes('konsol') &&
    !categoryTree.includes('Kontroll') &&
    !categoryTree.includes('tillbehör')
  },
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 25,
})
