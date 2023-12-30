import { type AchievementMeta } from '../models/achievements'
import { makeListeners } from './_customShippedListener'

export const meta = {
  id: 26,
  name: 'Sky is the Limit',
  level: 0,
  isSecret: false,
  description: 'Köpt 10 km nätverkskabel, avståndet till nedre stratosfären',
  experiencePoints: 10000,
  imageName: 'in_progress_4',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  orderMatching (order) {
    return !!order.rows.find(row => row.product.categoryTree.includes('Nätverkskabel'))
  },
  async reduceOrders (orders) {
    return await orders.reduce<Promise<number>>(async (totalSum, order) => {
      if (this.orderMatching(order)) {
        return (await totalSum) + (
          await order.rows.reduce<Promise<number>>(async (orderSum, row) => {
            const meterMatches = row.product.name.match(/([0-9]+)m/)
            if (row.product.categoryTree.includes('Nätverkskabel') && meterMatches) {
              const rowProductLength = (parseInt(meterMatches[1], 10) * row.quantity)
              return (await orderSum) + rowProductLength
            }
            return await orderSum
          }, Promise.resolve(0))
        )
      }
      return await totalSum
    }, Promise.resolve(0))
  },
  required: 10000,
})
