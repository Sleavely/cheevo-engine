import { type Order } from '../models/orders'
import { type AchievementMeta } from '../models/achievement'
import { isWithinRecurring } from '../lib/temporal'
import { makeListeners } from './_rowShippedListener'

export const meta = {
  id: 12,
  name: 'Zombie',
  level: 0,
  isSecret: false,
  description: 'Hämtat ut 25 st ordrar som lagts mellan 02:00 och 05:00',
  experiencePoints: 5000,
  imageName: 'zombie',
} satisfies AchievementMeta

const isZombie = (order: Order): boolean => {
  return isWithinRecurring({
    evaluand: order.orderDate,
    startConstraints: { hour: 2 },
    endConstraints: { hour: 5 },
    inclusiveEnd: false,
  })
}

export const listeners = makeListeners({
  meta,
  predicates: {
    order: (order) => isZombie(order),
  },
  counter: 'order',
  required: 25,
})
