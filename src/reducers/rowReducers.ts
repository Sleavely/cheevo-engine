import { type Order, type OrderRow } from '../models/orders'

type PredicateEvaluator <T = unknown> = (model: T) => boolean
type RowPredicateEvaluator = PredicateEvaluator<OrderRow>
type OrderPredicateEvaluator = PredicateEvaluator<Order>

export type RowCounter = 'price' | 'quantity'

export const reduceRow = (counter: RowCounter, row: OrderRow, predicate?: RowPredicateEvaluator): number => {
  if (predicate && !predicate(row)) {
    return 0
  }
  if (counter === 'price') return (row.unitPrice * row.quantity)
  if (counter === 'quantity') return row.quantity
  throw new Error(`Invalid reducer counter supplied: "${counter as string}"`)
}

export interface PredicateOptions {
  /**
   * When supplied, if a row does not match the predicate, its rows will not be counted
   */
  order?: OrderPredicateEvaluator
  row?: RowPredicateEvaluator
}
export const reduceOrder = (counter: RowCounter, order: Order, predicates: PredicateOptions = {}): number => {
  if (predicates.order && !predicates.order(order)) {
    return 0
  }
  return order.rows.reduce((sum, row) => {
    return sum + reduceRow(counter, row, predicates.row)
  }, 0)
}

export const reduceOrders = (counter: RowCounter, orders: Order[], predicates: PredicateOptions = {}): number => {
  return orders.reduce((sum, order) => {
    return sum + reduceOrder(counter, order, predicates)
  }, 0)
}
