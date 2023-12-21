import { type WhEvent } from './_event'

export interface OrderEvent extends WhEvent {
  userId: number
  orderId: number
}
