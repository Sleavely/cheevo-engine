import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, userHasAchievement, saveAchievementProgress } from '../models/achievements'
import { type Order, getOrderById, getOrdersByUser } from '../models/orders'

interface MakeCustomShippedListenersInput {
  meta: AchievementMeta
  orderMatching: (order: Order) => boolean
  reduceOrders: (orders: Order[]) => Promise<number>
  required: number
}

interface CustomShippedListenersOutput {
  onShipped: Required<EcomEventListeners>['onShipped']
}
export const makeListeners = ({ meta, orderMatching, reduceOrders, required = 1 }: MakeCustomShippedListenersInput): CustomShippedListenersOutput => {
  return {
    async onShipped ({ orderId, userId }) {
      // Does the order contain something relevant for this cheevo?
      const purchasedOrder = await getOrderById(orderId)
      if (!orderMatching(purchasedOrder)) {
        return
      }

      // Do we already have the cheevo?
      if (await userHasAchievement(userId, meta.id)) {
        console.log(`☑️ "${meta.name}" already achieved`)
        return
      }

      // Dont iterate history if we only need 1 match
      if (required === 1) {
        await saveAchievementProgress({
          userId,
          meta,
          progress: 1,
        })
        return
      }

      // Reduce order history
      const total = await getOrdersByUser(userId)
        .then(async (allOrders) => await reduceOrders(allOrders))

      await saveAchievementProgress({
        userId,
        meta,
        progress: total > required ? 1 : total / required,
      })
    },
  } satisfies EcomEventListeners
}
