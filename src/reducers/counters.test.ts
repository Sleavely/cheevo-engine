import { describe, test, expect } from 'vitest'
import { type Order, type OrderRow } from '../models/orders'
import { reduceOrder, reduceOrders, reduceRow } from './counters'

const orderTemplate = {
  id: 1337,
  orderDate: 19900107,
  readyDate: 19900107,
  sentDate: 19900107,
  totalSum: 30,
  reservedUntil: null,
  paymentMethod: { id: 1, name: 'Vitest Bank', isPrepayment: false, isRefundedAutomatically: false },
  shippingAddress: { name: 'AInders', address: 'Buren', zipCode: '111 11', city: 'Stockholm' },
  shippingMethod: { id: 1, name: 'Nanobot delivery', price: 5, vat: 1 },
  currency: 'SEK',
  trackingNumber: null,
  trackingUrl: null,
  statusCode: 200,
  discount: 0,
  discountCodes: [],
  isPrivateCustomer: true,
  deliveries: [],
  rows: [],
  store: null,
  productKeys: [],
  isExtendable: false,
  userExperiencePointBoosts: [],
  cjEvent: null,
} satisfies Order

const rowTemplate = {
  id: 1,
  unitPrice: 1,
  unitVat: 0.20,
  quantity: 1,
  product: {
    id: 1,
    name: 'GeForce 9090',
    release: { timestamp: 19900107, format: '' },
    thumbnail: '',
    longDeliveryNotice: null,
    customerWorkshopInfo: { text: null, url: null },
    categoryTree: '',
    section: { id: 1, metaTitle: '', name: '', icon: '', active: true },
    manufacturer: { id: 1, name: '', visible: true, websiteUrl: '', takeoverUrl: null },
  },
  locked: true,
  subscriptionData: [],
  insuranceInfo: null,
  hasSubscription: false,
  sentDate: 19900107,
} satisfies OrderRow

describe('reduceRow', () => {
  test('returns quantity if no predicate', () => {
    const row = { ...rowTemplate, quantity: 25 }

    const result = reduceRow('quantity', row)

    expect(result).toBe(25)
  })
  test('returns quantity if predicate evaluates to true', () => {
    const row = { ...rowTemplate, quantity: 25 }

    const result = reduceRow('quantity', row, (r) => r.quantity === 25)

    expect(result).toBe(25)
  })
  test('returns 0 if predicate evaluates to false', () => {
    const row = { ...rowTemplate, quantity: 25 }

    const result = reduceRow('quantity', row, (r) => r.id === 749)

    expect(result).toBe(0)
  })
  test('price counter returns sum', () => {
    const row = { ...rowTemplate, quantity: 12, unitPrice: 2 }

    const result = reduceRow('price', row)

    expect(result).toBe(24)
  })
})

describe('reduceOrder', () => {
  test('returns total quantity if no predicates', () => {
    const order = { ...orderTemplate, rows: [{ ...rowTemplate, quantity: 2 }, { ...rowTemplate, quantity: 3 }] }

    const result = reduceOrder('quantity', order)

    expect(result).toBe(5)
  })
  test('returns 0 if order predicate evaluates to false', () => {
    const order = { ...orderTemplate, rows: [{ ...rowTemplate, quantity: 87 }] }

    const result = reduceOrder('quantity', order, { order: () => false })

    expect(result).toBe(0)
  })
  test('only counts rows matching row predicate', () => {
    const order = { ...orderTemplate, rows: [{ ...rowTemplate, id: 15, quantity: 87 }, { ...rowTemplate, id: 9, quantity: 4 }] }

    const result = reduceOrder('quantity', order, { row: (r) => r.id === 9 })

    expect(result).toBe(4)
  })
})

describe('reduceOrders', () => {
  test('returns total quantity if no predicates', () => {
    const orders = [
      { ...orderTemplate, rows: [{ ...rowTemplate, quantity: 4 }, { ...rowTemplate }] },
      { ...orderTemplate, rows: [{ ...rowTemplate, quantity: 12 }] },
    ]

    const result = reduceOrders('quantity', orders)

    expect(result).toBe(17)
  })
  test('only counts orders and rows matching predicate', () => {
    const orders = [
      { ...orderTemplate, id: 1, rows: [{ ...rowTemplate, quantity: 1 }] },
      { ...orderTemplate, id: 2, rows: [{ ...rowTemplate, id: 15, quantity: 87 }, { ...rowTemplate, id: 9, quantity: 4 }] },
      { ...orderTemplate, id: 3, rows: [{ ...rowTemplate, quantity: 1 }] },
    ]

    const result = reduceOrders('quantity', orders, {
      order: (o) => o.id > 1,
      row: (r) => r.quantity < 10,
    })

    expect(result).toBe(5)
  })
})
