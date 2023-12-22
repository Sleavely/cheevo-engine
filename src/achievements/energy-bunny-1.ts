import { type Order, getOrderById, getOrdersByUser } from '../models/orders'
import { type WebhallenEventListeners } from '../emitter'
import { type AchievementMeta, getUserAchievements } from '../models/achievement'

export const meta = {
  id: 367,
  name: 'Energy Bunny',
  level: 1,
  isSecret: false,
  description: 'Köpt 25 st energidrycker',
  experiencePoints: 1000,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

const rowContainsEnergyDrink = (row: Order['rows'][number]): boolean => {
  return row.product.categoryTree.includes('Godis/Energidryck')
}
const orderContainsEnergyDrink = (order: Order): boolean => {
  return !!order.rows.filter(rowContainsEnergyDrink).length
}

const countEnergyDrinks = async (userId: number): Promise<number> => {
  return (await getOrdersByUser(userId))
    .filter(orderContainsEnergyDrink)
    .reduce<number>((userQty, order) => {
    return userQty + order.rows.reduce<number>((orderQty, row) => {
      if (rowContainsEnergyDrink(row)) {
        return orderQty + row.quantity
      }
      return orderQty
    }, 0)
  }, 0)
}

interface TieredListenersInput {
  tierMeta: AchievementMeta
  requiredQty: number
}
export const tieredListeners = ({ tierMeta, requiredQty }: TieredListenersInput): WebhallenEventListeners => {
  return {
    async onShipped ({ orderId, userId }) {
      // Does the order contain something relevant for this cheevo?
      const purchasedOrder = await getOrderById(orderId)
      if (!orderContainsEnergyDrink(purchasedOrder)) {
        return
      }

      // Do we already have the cheevo?
      const userCheevos = await getUserAchievements(userId)
      if (userCheevos.find((cheevo) => cheevo.id === tierMeta.id)?.achievedPercentage === 1) {
        console.log(`☑️ "${tierMeta.name}" already achieved`)
        return
      }

      // Reduce order history
      const totalQty = await countEnergyDrinks(userId)

      if (totalQty >= requiredQty) {
        // TODO: mark as achieved
        console.log(`✅ "${tierMeta.name}": 1`)
      } else {
        // TODO: store progress
        console.log(`🚧 "${tierMeta.name}": ${totalQty / requiredQty}`)
      }
    },
  }
}

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredQty: 25,
})
