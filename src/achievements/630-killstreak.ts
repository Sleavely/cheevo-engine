import { Temporal } from 'temporal-polyfill'
import { toZonedDateTime } from '../lib/temporal'
import { type AchievementMeta } from '../models/achievements'
import { type Order } from '../models/orders'
import { makeListeners } from './_customShippedListener'

export const meta = {
  id: 630,
  name: 'Killstreak',
  level: 1,
  isSecret: false,
  description: 'Handlat för 500 kr/månad 2 månader i följd',
  experiencePoints: 500,
  imageName: 'killstreak',
} satisfies AchievementMeta

interface Streak {
  startingMonth: string
  endingMonth: string
  length: number
}

export const reduceOrders = (orders: Order[]): number => {
  const monthlySpending = orders
    .reduce<Map<string, number>>((map, order) => {
    const orderYearMonth = toZonedDateTime(order.orderDate).toPlainYearMonth().toString()
    const previousOrdersThisMonth = map.get(orderYearMonth) ?? 0
    map.set(orderYearMonth, order.totalSum + previousOrdersThisMonth)
    return map
  }, new Map())

  console.log('monthlySpending', [...monthlySpending.entries()])

  const streaks = [...monthlySpending.entries()]
    .filter((month) => month[1] >= 500)
    .sort((a, b) => {
      return Temporal.PlainYearMonth.compare(a[0], b[0])
    })
    .reduce<Streak[]>((streaks, [month]) => {
    const newStreak = { startingMonth: month, endingMonth: month, length: 1 }
    const currentStreak = streaks.at(-1) ?? newStreak

    const monthIsPartOfCurrentStreak = currentStreak.endingMonth === Temporal.PlainYearMonth
      .from(month)
      .subtract({ months: 1 })
      .toString()
    if (monthIsPartOfCurrentStreak) {
      currentStreak.endingMonth = month
      currentStreak.length = currentStreak.length + 1
    } else {
      streaks.push(newStreak)
    }
    return streaks
  }, [])

  console.log('streaks', streaks)

  const longestStreak = streaks.sort((a, b) => b.length - a.length)[0].length
  return longestStreak
}

export const listeners = makeListeners({
  meta,
  orderMatching: () => true,
  reduceOrders,
  required: meta.level + 1,
})
