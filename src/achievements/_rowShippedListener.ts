import { type EcomEventListeners } from '../emitter'
import { type AchievementMeta, userHasAchievement, saveAchievementProgress } from '../models/achievement'
import { getOrderById, getOrdersByUser } from '../models/orders'
import {
  type OrderCounter,
  type RowCounter,
  type Predicates,
  reduceOrder,
  reduceOrders,
} from '../reducers/counters'

export { type Predicates }

interface MakeRowShippedListenersInput {
  meta: AchievementMeta
  predicates: Predicates
  counter: RowCounter | OrderCounter
  required: number
}
interface RowShippedListenersOutput {
  onShipped: Required<EcomEventListeners>['onShipped']
}
export const makeListeners = ({ meta, predicates, counter, required = 1 }: MakeRowShippedListenersInput): RowShippedListenersOutput => {
  return {
    async onShipped ({ orderId, userId }) {
      // Does the order contain something relevant for this cheevo?
      const purchasedOrder = await getOrderById(orderId)
      if (!reduceOrder(counter, purchasedOrder, predicates)) {
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
      const allOrders = await getOrdersByUser(userId)
      const total = reduceOrders(counter, allOrders, predicates)

      await saveAchievementProgress({
        userId,
        meta,
        progress: total > required ? 1 : total / required,
      })
    },
  } satisfies EcomEventListeners
}
