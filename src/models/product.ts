import { apiRequestJson } from '../lib/whApi'

export const getProductById = async (id: number): Promise<Product> => {
  return await apiRequestJson(`/product/${id}`)
}

export interface Product {
  id: number
  variants: null
  name: string
  data: unknown[]
  stock: Stock
  price: RegularPriceClass
  regularPrice: RegularPriceClass
  lowestPrice: RegularPriceClass | null
  levelOnePrice: null
  description: string
  metaTitle: null
  metaDescription: null
  canonicalLink: null
  images: ProductImage[]
  release: Release
  section: ProductSection
  isDigital: boolean
  discontinued: boolean
  categoryTree: string
  mainCategoryPath: ProductCategory[]
  manufacturer: ProductManufacturer
  partNumbers: string[]
  eans: string[]
  thumbnail: string
  shippingClass: ShippingClass
  averageRating: ProductAverageRating
  energyMarking: null
  packageSizeId: number
  statusCodes: unknown[]
  longDeliveryNotice: null
  categories: ProductCategory[]
  phoneSubscription: boolean
  reviewHighlight: ReviewHighlight
  isFyndware: boolean
  fyndwareOf: null
  fyndwareClass: null
  mainTitle: string
  subTitle: string
  isShippable: boolean
  isCollectable: boolean
  meta: unknown[] | MetaClass
  insurance: null
  descriptionProvider: number | null
  minimumRankLevel: number
  possibleDeliveryMethods: number[]
  ticket: string
}

interface ProductAverageRating {
  rating: string
  ratingType: string
}

interface ProductCategory {
  id: number
  fyndwareDescription: null
  metaTitle: null | string
  seoName: null | string
  active: boolean
  order: number
  icon: string
  name: string
  hasProducts?: boolean
  index?: number
}

interface ProductImage {
  zoom: string
  large: string
  thumb: string
}

interface RegularPriceClass {
  price: string
  currency: string
  vat: number
  type: null | string
  endAt: Date
  soldAmount: null
  maxAmountForPrice: null
  amountLeft: number | null
  nearlyOver: boolean
  flashSale: boolean
  maxQtyPerCustomer: number | null
}

interface ProductManufacturer {
  id: number
  name: string
  takeoverUrl: null
  websiteUrl: string
  visible: boolean
}

interface MetaClass {
  excluded_shipping_methods: string[]
}

interface Release {
  timestamp: number
  format: string
}

interface ReviewHighlight {
  id: number
  text: string
  rating: number
  upvotes: number
  downvotes: number
  verifiedPurchase: boolean
  createdAt: number
  isAnonymous: boolean
  isEmployee: boolean
  product: ReviewHighlightProduct
  isHype: boolean
  user: User
}

interface ReviewHighlightProduct {
  id: number
  mainCategoryPath: ProductCategory[]
  minimumRankLevel: number
  statusCodes: unknown[]
  metaTitle: null
  section: ProductSection
  name: string
}

interface ProductSection {
  id: number
  metaTitle: string
  active: boolean
  icon: string
  name: string
}

interface User {
  id: number
  username: string
  isPublicProfile: boolean
  knighthood: number[]
  rankLevel: number
  avatar: Avatar
}

interface Avatar {
  class: Class
}

interface Class {
  id: number
  title: string
}

interface ShippingClass {
  id: number
  order: number
  prices: PriceElement[]
}

interface PriceElement {
  price: number
  shippingMethodId: number
  isFixedPrice: boolean
  maximumPackageSizeId: number | null
}

interface Stock {
  '1': number
  '2': number
  '5': number
  '8': number
  '9': number
  '10': number
  '11': number
  '14': number
  '15': number
  '16': number
  '19': number
  '20': number
  '21': number
  '26': number
  '27': number
  '28': number
  '30': number
  web: number
  supplier: null
  displayCap: number | string
  orders?: unknown
  isSentFromStore: number
}
