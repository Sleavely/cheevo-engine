import { describe, test, expect } from 'vitest'
import * as fixtures from '../models/orders.fixtures'
import { reduceOrder, reduceOrders, reduceRow } from './counters'

describe('reduceRow', () => {
  test('returns quantity if no predicate', () => {
    const row = { ...fixtures.orderRow(), quantity: 25 }

    const result = reduceRow('quantity', row)

    expect(result).toBe(25)
  })
  test('returns quantity if predicate evaluates to true', () => {
    const row = { ...fixtures.orderRow(), quantity: 25 }

    const result = reduceRow('quantity', row, (r) => r.quantity === 25)

    expect(result).toBe(25)
  })
  test('returns 0 if predicate evaluates to false', () => {
    const row = { ...fixtures.orderRow(), quantity: 25 }

    const result = reduceRow('quantity', row, (r) => r.id === 749)

    expect(result).toBe(0)
  })
  test('price counter returns sum', () => {
    const row = { ...fixtures.orderRow(), quantity: 12, unitPrice: 2 }

    const result = reduceRow('price', row)

    expect(result).toBe(24)
  })
})

describe('reduceOrder', () => {
  test('returns total quantity if no predicates', () => {
    const order = { ...fixtures.order(), rows: [{ ...fixtures.orderRow(), quantity: 2 }, { ...fixtures.orderRow(), quantity: 3 }] }

    const result = reduceOrder('quantity', order)

    expect(result).toBe(5)
  })
  test('returns 0 if order predicate evaluates to false', () => {
    const order = { ...fixtures.order(), rows: [{ ...fixtures.orderRow(), quantity: 87 }] }

    const result = reduceOrder('quantity', order, { order: () => false })

    expect(result).toBe(0)
  })
  test('only counts rows matching row predicate', () => {
    const order = { ...fixtures.order(), rows: [{ ...fixtures.orderRow(), id: 15, quantity: 87 }, { ...fixtures.orderRow(), id: 9, quantity: 4 }] }

    const result = reduceOrder('quantity', order, { row: (r) => r.id === 9 })

    expect(result).toBe(4)
  })
})

describe('reduceOrders', () => {
  test('returns total quantity if no predicates', () => {
    const orders = [
      { ...fixtures.order(), rows: [{ ...fixtures.orderRow(), quantity: 4 }, { ...fixtures.orderRow() }] },
      { ...fixtures.order(), rows: [{ ...fixtures.orderRow(), quantity: 12 }] },
    ]

    const result = reduceOrders('quantity', orders)

    expect(result).toBe(17)
  })
  test('only counts orders and rows matching predicate', () => {
    const orders = [
      { ...fixtures.order(), id: 1, rows: [{ ...fixtures.orderRow(), quantity: 1 }] },
      { ...fixtures.order(), id: 2, rows: [{ ...fixtures.orderRow(), id: 15, quantity: 87 }, { ...fixtures.orderRow(), id: 9, quantity: 4 }] },
      { ...fixtures.order(), id: 3, rows: [{ ...fixtures.orderRow(), quantity: 1 }] },
    ]

    const result = reduceOrders('quantity', orders, {
      order: (o) => o.id > 1,
      row: (r) => r.quantity < 10,
    })

    expect(result).toBe(5)
  })
  test('can sum the total ordersums (including shipping and whatnot)', () => {
    const orders = [
      { ...fixtures.order(), totalSum: 50000 },
      { ...fixtures.order(), totalSum: 25000 },
    ]

    const ballerProgress = reduceOrders('totalSum', orders)

    expect(ballerProgress).toBe(75000)
  })
  test('can count unique stores matching a predicate', () => {
    const orders = [
      // will be ignored by order predicate
      { ...fixtures.order(), id: 1, rows: [{ ...fixtures.orderRow(), quantity: 1 }] },
      // will be ignored by row predicate
      { ...fixtures.order(), id: 2, rows: [{ ...fixtures.orderRow(), id: 15, quantity: 87 }, { ...fixtures.orderRow(), id: 9, quantity: 4 }] },
      // +1
      { ...fixtures.order(), id: 3, rows: [{ ...fixtures.orderRow(), quantity: 1 }], store: { ...fixtures.store(), id: 1 } },
      // +1
      { ...fixtures.order(), id: 4, rows: [{ ...fixtures.orderRow(), quantity: 1 }], store: { ...fixtures.store(), id: 2 } },
      // duplicate store
      { ...fixtures.order(), id: 5, rows: [{ ...fixtures.orderRow(), quantity: 1 }], store: { ...fixtures.store(), id: 2 } },
    ]
    const uniqueStores = reduceOrders('store', orders, {
      order: (o) => o.id > 1,
      row: (r) => r.quantity < 10,
    })

    expect(uniqueStores).toBe(2)
  })
})
