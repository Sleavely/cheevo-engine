import { type AchievementMeta } from '../models/achievements'
import { makeListeners } from './_customShippedListener'

export const meta = {
  id: 36,
  name: 'The Sampler',
  level: 0,
  isSecret: false,
  description: 'Handlat en produkt från varje avdelning',
  experiencePoints: 5000,
  imageName: 'the_sampler',
} satisfies AchievementMeta

const requiredDepartments = [
  'Spel',
  'Datorer & Tillbehör',
  'Datorkomponenter',
  'Nätverk & Smarta Hem',
  'TV, Ljud & Bild',
  'Apple',
  'Mobil',
  'Hem & Hälsa',
  'Leksaker & Hobby',
]

export const listeners = makeListeners({
  meta,
  orderMatching (order) {
    return order.rows.some(row => requiredDepartments.includes(row.product.categoryTree.split('/')[0]))
  },
  async reduceOrders (orders) {
    const visitedDepartments = orders.reduce((set, order) => {
      return order.rows.reduce((nestedSet, row) => {
        const rowMainDepartment = row.product.categoryTree.split('/')[0]
        if (requiredDepartments.includes(rowMainDepartment)) {
          nestedSet.add(rowMainDepartment)
        }
        return nestedSet
      }, set)
    }, new Set())
    return visitedDepartments.size
  },
  required: requiredDepartments.length,
})
