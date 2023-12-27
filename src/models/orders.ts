import { apiRequestJson } from '../lib/whApi'

interface GetOrderByIdResponse {
  order: Order
}
export const getOrderById = async (orderId: number): Promise<Order> => {
  const response = await apiRequestJson<GetOrderByIdResponse>(`/order/${orderId}`)
  return response.order
}

interface GetOrdersByUserResponse {
  currentResultPageCount: number
  orders: Order[]
  counts: OrderCounts
}
interface OrderCounts {
  active: number
  history: number
  service: number
  cancelled: number
}
export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const query = new URLSearchParams()
  query.set('filters[active]', 'true')
  query.set('filters[history]', 'true')
  query.set('filters[service]', 'true')
  query.set('filters[cancelled]', 'true')
  query.set('page', '1')

  const basePath = `/order/user/${userId}`
  const firstPage = await apiRequestJson<GetOrdersByUserResponse>(`${basePath}/?${query.toString()}`)

  const remainingOrders = await Array.from(Array(firstPage.currentResultPageCount - 1))
    .reduce<Promise<Order[]>>(async (previousPromise, _, i) => {
    const previousOrders = await previousPromise

    const pageNum = i + 2
    query.set('page', `${pageNum}`)
    const pageRes = await apiRequestJson<GetOrdersByUserResponse>(`${basePath}/?${query.toString()}`)

    return [...previousOrders, ...pageRes.orders]
  }, Promise.resolve([]))

  return [...firstPage.orders, ...remainingOrders]
}

export interface Order {
  id: number
  orderDate: number
  sentDate: number
  totalSum: number
  readyDate: number | null
  reservedUntil: null
  paymentMethod: OrderPaymentMethod
  shippingMethod: OrderShippingMethod
  currency: string
  statusCode: number
  trackingNumber: null
  trackingUrl: null
  discount: number
  discountCodes: unknown[]
  isPrivateCustomer: boolean
  deliveries: Delivery[]
  rows: OrderRow[]
  store: OrderStore | null
  cjEvent: null
  productKeys: unknown[]
  isExtendable: boolean
  shippingAddress: OrderShippingAddress | null
  userExperiencePointBoosts: unknown[]
  isBinding?: boolean
  entries?: OrderStatusEntry[]
}

interface Delivery {
  rows: OrderRow[]
  statusEntries: OrderStatusEntry[]
  sentLater: boolean
  timestamp: number
}

export interface OrderRow {
  id: number
  locked: boolean
  unitVat: number
  quantity: number
  unitPrice: number
  product: OrderProduct
  insuranceInfo: null
  sentDate: number
  hasSubscription: boolean
  subscriptionData: unknown[]
}

interface OrderProduct {
  id: number
  name: string
  release: OrderProductRelease
  thumbnail: string
  longDeliveryNotice: null
  customerWorkshopInfo: OrderCustomerWorkshopInfo
  section: OrderSection
  categoryTree: string
  manufacturer: OrderManufacturer
}

interface OrderCustomerWorkshopInfo {
  url: null
  text: null
}

interface OrderManufacturer {
  id: number
  name: string
  takeoverUrl: null
  websiteUrl: string
  visible: boolean
}

interface OrderProductRelease {
  timestamp: number
  format: string
}

interface OrderSection {
  id: number
  metaTitle: string
  active: boolean
  icon: string
  name: string
}

interface OrderStatusEntry {
  id: number
  title: string
  message: string
  date: string
  deliveryDate: null
  status: OrderStatusEntryStatus
  products: unknown[]
  subEntries: OrderStatusSubEntry[]
}

interface OrderStatusEntryStatus {
  id: number
  icon: null | string
}

interface OrderStatusSubEntry {
  id: number
  title: string
  message: string
  date: string
  deliveryDate: Date
  status: OrderStatusElement
  products: OrderStatusElement[]
}

interface OrderStatusElement {
  id: number
}

interface OrderStore {
  id: number
  isPickupPoint: boolean
  location: OrderCoordinates
  zipCode: string
  address: string
  name: string
  city: string
}

interface OrderCoordinates {
  lat: number
  lng: number
}

interface OrderPaymentMethod {
  id: number
  isPrepayment: boolean
  isRefundedAutomatically: boolean
  name: string
}

interface OrderShippingAddress {
  name: string
  city: string
  address: string
  zipCode: string
}

interface OrderShippingMethod {
  id: number
  name: string
  price: number
  vat: number
}

export type _test_OrderStore = OrderStore
export type _test_GetOrdersByUserResponse = GetOrdersByUserResponse
