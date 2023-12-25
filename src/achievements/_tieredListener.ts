import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, userHasAchievement } from '../models/achievement'
import { getOrderById, getOrdersByUser } from '../models/orders'
import { type RowCounter, reduceOrder, reduceOrders, type PredicateOptions } from '../reducers/rowReducers'

interface TieredListenersInput {
  tierMeta: AchievementMeta
  predicates: PredicateOptions
  counter: RowCounter
  required: number
}
export const tieredListeners = ({ tierMeta, predicates, counter, required }: TieredListenersInput): EcomEventListeners => {
  return {
    async onShipped ({ orderId, userId }) {
      // Does the order contain something relevant for this cheevo?
      const purchasedOrder = await getOrderById(orderId)
      if (!reduceOrder(counter, purchasedOrder, predicates)) {
        return
      }

      // Do we already have the cheevo?
      if (await userHasAchievement(userId, tierMeta.id)) {
        console.log(`☑️ "${tierMeta.name}" already achieved`)
        return
      }

      // Reduce order history
      const allOrders = await getOrdersByUser(userId)
      const total = reduceOrders(counter, allOrders, predicates)

      if (total >= required) {
        // TODO: mark as achieved
        console.log(`✅ "${tierMeta.name}": 1`)
      } else {
        // TODO: store progress
        console.log(`🚧 "${tierMeta.name}": ${total / required}`)
      }
    },
  }
}
