import { getOrderById } from '../models/orders'
import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, getUserAchievements } from '../models/achievement'
import { Temporal } from 'temporal-polyfill'

export const meta = {
  id: 1314,
  name: 'Wololo',
  level: 1,
  isSecret: false,
  description: 'Lagt en order den 15 oktober. Age of Empires födelsedag (1997)',
  experiencePoints: 1000,
  imageName: 'wololo',
} satisfies AchievementMeta

export const listeners = {
  async onShipped ({ orderId, userId }) {
    const order = await getOrderById(orderId)

    // placed on the right date?
    const swedishTime = Temporal.Instant
      .fromEpochSeconds(order.orderDate)
      .toZonedDateTimeISO('Europe/Stockholm')
    if (swedishTime.year < 1997) return
    if (swedishTime.month !== 10) return
    if (swedishTime.day !== 15) return

    // Do we already have the cheevo?
    const userCheevos = await getUserAchievements(userId)
    if (userCheevos.find((cheevo) => cheevo.id === meta.id)?.achievedPercentage === 1) {
      console.log(`☑️ "${meta.name}" already achieved`)
      return
    }

    // TODO: mark as achieved
    console.log(`✅ "${meta.name}": 1`)
  },
} satisfies EcomEventListeners
