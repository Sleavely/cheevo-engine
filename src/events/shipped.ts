import { type WhEvent } from './_event'

export interface ShippedEvent extends WhEvent {
  userId: number
  orderId: number
}
