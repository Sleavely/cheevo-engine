import { getOrderById } from '../models/orders'
import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, getUserAchievements, saveAchievementProgress } from '../models/achievements'

export const meta = {
  id: 1492,
  name: 'Sadist Sealubber',
  level: 1,
  isSecret: false,
  description: 'Köpt Lying Pirates Deluxe Edition',
  experiencePoints: 1000,
  imageName: 'sadist_sealubber',
} satisfies AchievementMeta

export const listeners = {
  async onShipped ({ orderId, userId }) {
    const purchasedOrder = await getOrderById(orderId)

    // contains Lying Pirates?
    const containsProduct = purchasedOrder.rows.find((row) => row.product.id === 353286)
    if (!containsProduct) return

    // Do we already have the cheevo?
    const userCheevos = await getUserAchievements(userId)
    if (userCheevos.find((cheevo) => cheevo.id === meta.id)?.achievedPercentage === 1) {
      console.log(`☑️ "${meta.name}" already achieved`)
      return
    }

    await saveAchievementProgress({
      userId,
      meta,
      progress: 1,
    })
  },
} satisfies EcomEventListeners
