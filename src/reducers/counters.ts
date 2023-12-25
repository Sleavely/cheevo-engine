import { type Order, type OrderRow } from '../models/orders'

type PredicateEvaluator <T = unknown> = (model: T) => boolean
type RowPredicateEvaluator = PredicateEvaluator<OrderRow>
type OrderPredicateEvaluator = PredicateEvaluator<Order>

export interface Predicates {
  /**
   * When supplied, if a row does not match the predicate, its rows will not be counted
   */
  order?: OrderPredicateEvaluator
  row?: RowPredicateEvaluator
}

export type RowCounter = 'price' | 'quantity'
export type OrderCounter = 'order' | 'store'

export const reduceRow = (counter: RowCounter, row: OrderRow, predicate?: RowPredicateEvaluator): number => {
  if (predicate && !predicate(row)) {
    return 0
  }
  if (counter === 'price') return (row.unitPrice * row.quantity)
  if (counter === 'quantity') return row.quantity
  throw new Error(`Invalid reducer counter supplied: "${counter as string}"`)
}

export const reduceOrder = (counter: RowCounter | OrderCounter, order: Order, predicates: Predicates = {}): number => {
  if (predicates.order && !predicates.order(order)) {
    return 0
  }
  if (counter === 'order' || counter === 'store') {
    if (!predicates.row) return 1
    return order.rows.some(predicates.row) ? 1 : 0
  }
  return order.rows.reduce((sum, row) => {
    return sum + reduceRow(counter, row, predicates.row)
  }, 0)
}

export const reduceOrders = (counter: RowCounter | OrderCounter, orders: Order[], predicates: Predicates = {}): number => {
  if (counter === 'store') {
    return new Set(orders.reduce<number[]>((out, order) => {
      if (order.store && reduceOrder('order', order, predicates)) out.push(order.store.id)
      return out
    }, [])).size
  }
  return orders.reduce((sum, order) => {
    return sum + reduceOrder(counter, order, predicates)
  }, 0)
}
