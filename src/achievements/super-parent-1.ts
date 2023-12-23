import { type Order, getOrderById, getOrdersByUser } from '../models/orders'
import { type WebhallenEventListeners } from '../emitter'
import { type AchievementMeta, getUserAchievements } from '../models/achievement'

export const meta = {
  id: 19,
  name: 'Super Parent',
  level: 1,
  isSecret: false,
  description: 'Köpt Lego för 2500 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

const rowContainsLego = (row: Order['rows'][number]): boolean => {
  return row.product.categoryTree.includes('/LEGO')
}
const orderContainsLego = (order: Order): boolean => {
  return !!order.rows.filter(rowContainsLego).length
}

const countLegos = async (userId: number): Promise<number> => {
  return (await getOrdersByUser(userId))
    .filter(orderContainsLego)
    .reduce<number>((userQty, order) => {
    return userQty + order.rows.reduce<number>((orderQty, row) => {
      if (rowContainsLego(row)) {
        return orderQty + (row.unitPrice * row.quantity)
      }
      return orderQty
    }, 0)
  }, 0)
}

interface TieredListenersInput {
  tierMeta: AchievementMeta
  requiredAmount: number
}
export const tieredListeners = ({ tierMeta, requiredAmount }: TieredListenersInput): WebhallenEventListeners => {
  return {
    async onShipped ({ orderId, userId }) {
      // Does the order contain something relevant for this cheevo?
      const purchasedOrder = await getOrderById(orderId)
      if (!orderContainsLego(purchasedOrder)) {
        return
      }

      // Do we already have the cheevo?
      const userCheevos = await getUserAchievements(userId)
      if (userCheevos.find((cheevo) => cheevo.id === tierMeta.id)?.achievedPercentage === 1) {
        console.log(`☑️ "${tierMeta.name}" already achieved`)
        return
      }

      // Reduce order history
      const orderedAmount = await countLegos(userId)

      if (orderedAmount >= requiredAmount) {
        // TODO: mark as achieved
        console.log(`✅ "${tierMeta.name}": 1`)
      } else {
        // TODO: store progress
        console.log(`🚧 "${tierMeta.name}": ${orderedAmount / requiredAmount}`)
      }
    },
  }
}

const requiredAmount = 2500

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredAmount,
})
