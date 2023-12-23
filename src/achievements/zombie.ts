import { Temporal } from 'temporal-polyfill'
import { type Order, getOrderById, getOrdersByUser } from '../models/orders'
import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, getUserAchievements } from '../models/achievement'

export const meta = {
  id: 12,
  name: 'Zombie',
  level: 0,
  isSecret: false,
  description: 'Hämtat ut 25 st ordrar som lagts mellan 02:00 och 05:00',
  experiencePoints: 5000,
  imageName: 'zombie',
} satisfies AchievementMeta

const isZombie = (order: Order): boolean => {
  const hourInSweden = Temporal.Instant
    .fromEpochSeconds(order.orderDate)
    .toZonedDateTimeISO('Europe/Stockholm')
    .hour
  return (hourInSweden >= 2 && hourInSweden < 5)
}

const countZombieOrders = async (userId: number): Promise<number> => {
  return (await getOrdersByUser(userId))
    .filter(isZombie)
    .length
}

const requiredQty = 25

export const listeners = {
  async onShipped ({ orderId, userId }) {
    const purchasedOrder = await getOrderById(orderId)

    if (!isZombie(purchasedOrder)) {
      return
    }

    // Do we already have the cheevo?
    const userCheevos = await getUserAchievements(userId)
    if (userCheevos.find((cheevo) => cheevo.id === meta.id)?.achievedPercentage === 1) {
      console.log(`☑️ "${meta.name}" already achieved`)
      return
    }

    // Reduce order history
    const totalQty = await countZombieOrders(userId)

    if (totalQty >= requiredQty) {
      // TODO: mark as achieved
      console.log(`✅ "${meta.name}": 1`)
    } else {
      // TODO: store progress
      console.log(`🚧 "${meta.name}": ${totalQty / requiredQty}`)
    }
  },
} satisfies EcomEventListeners
