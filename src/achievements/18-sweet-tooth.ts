import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 18,
  name: 'Sweet Tooth',
  level: 0,
  isSecret: false,
  description: 'Köpt godis för 1000 kr i en order',
  experiencePoints: 2500,
  imageName: 'sweet_tooth',
} satisfies AchievementMeta

export const predicates = {
  order: (order) => {
    return order.rows.reduce((sum, row) => {
      if (!row.product.categoryTree.includes('/Godis/')) return sum
      return sum + (row.unitPrice * row.quantity)
    }, 0) >= 1000
  },
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'order',
  required: 1,
})
