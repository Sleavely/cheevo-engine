import {
  type _test_OrderStore,
  type _test_GetOrdersByUserResponse,
  type Order,
  type OrderRow,
} from './orders'

export const paymentMethod = (): Order['paymentMethod'] => ({
  id: 20,
  isPrepayment: true,
  isRefundedAutomatically: true,
  name: 'Kort / Internetbank / Faktura / Delbetalning',
})

export const shippingMethod = (): Order['shippingMethod'] => ({
  id: 1,
  name: 'Brev / Postpaket',
  price: 0,
  vat: 0,
})

export const orderProduct = (): OrderRow['product'] => ({
  id: 178825,
  name: 'Red Bull (25cl)',
  categoryTree: 'Leksaker & Hobby/Godis/Energidryck',
  release: {
    timestamp: 1204779600,
    format: 'Y-m-d',
  },
  thumbnail: '/images/product/178825?trim&h=80',
  longDeliveryNotice: null,
  customerWorkshopInfo: {
    url: null,
    text: null,
  },
  section: {
    id: 7,
    metaTitle: 'Vi har LEGO, drönare, roligt merchandise och mycket mer',
    active: true,
    icon: 'lek_gadgets',
    name: 'Leksaker & Hobby',
  },
  manufacturer: {
    id: 8592,
    name: 'Red Bull Sweden AB',
    takeoverUrl: null,
    websiteUrl: 'https://www.redbull.com/se-en/',
    visible: true,
  },
})

export const orderRow = (): OrderRow => ({
  id: 1,
  locked: true,
  unitVat: 2.142857142857146,
  quantity: 1,
  unitPrice: 20,
  product: orderProduct(),
  insuranceInfo: null,
  sentDate: 1702732241,
  hasSubscription: false,
  subscriptionData: [],
})

export const store = (): _test_OrderStore => ({
  id: 1,
  isPickupPoint: false,
  location: {
    lat: 59.4938,
    lng: 17.9245,
  },
  zipCode: '19279',
  address: 'Bergkällavägen 26',
  name: 'Bredden (InfraCity)',
  city: 'Sollentuna',
})

export const order = (): Order => ({
  id: 1,
  orderDate: 1702731287,
  sentDate: 1702732241,
  totalSum: 20,
  readyDate: null,
  reservedUntil: null,
  paymentMethod: paymentMethod(),
  shippingMethod: shippingMethod(),
  currency: 'SEK',
  statusCode: 4,
  trackingNumber: null,
  trackingUrl: null,
  discount: 0,
  discountCodes: [],
  isPrivateCustomer: true,
  deliveries: [
    {
      rows: [
        orderRow(),
      ],
      statusEntries: [
        {
          id: 2,
          title: 'Hämtad',
          message: 'Din order lämnades ut 2023-12-24.',
          date: '2023-12-24 14:00',
          deliveryDate: null,
          status: {
            id: 3,
            icon: 'check',
          },
          products: [],
          subEntries: [],
        },
        {
          id: 1,
          title: 'Webhallen',
          message: 'Order mottagen.',
          date: '2023-12-24 13:53',
          deliveryDate: null,
          status: {
            id: 1,
            icon: null,
          },
          products: [],
          subEntries: [],
        },
      ],
      sentLater: false,
      timestamp: 1702732241,
    },
  ],
  rows: [
    orderRow(),
  ],
  store: store(),
  cjEvent: null,
  productKeys: [],
  isExtendable: false,
  shippingAddress: null,
  userExperiencePointBoosts: [],
  isBinding: false,
  entries: [
    {
      id: 2,
      title: 'Hämtad',
      message: 'Din order lämnades ut 2023-12-24.',
      date: '2023-12-24 14:00',
      deliveryDate: null,
      status: {
        id: 3,
        icon: 'check',
      },
      products: [],
      subEntries: [],
    },
    {
      id: 1,
      title: 'Webhallen',
      message: 'Order mottagen.',
      date: '2023-12-24 13:53',
      deliveryDate: null,
      status: {
        id: 1,
        icon: null,
      },
      products: [],
      subEntries: [],
    },
  ],
})

export const getOrdersByUserResponse = (): _test_GetOrdersByUserResponse => ({
  currentResultPageCount: 1,
  orders: [
    order(),
  ],
  counts: {
    active: 0,
    history: 1,
    service: 0,
    cancelled: 0,
  },
})
