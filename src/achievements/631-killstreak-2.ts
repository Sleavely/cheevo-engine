import { type AchievementMeta } from '../models/achievements'
import { makeListeners } from './_customShippedListener'
import { reduceOrders } from './630-killstreak'

export const meta = {
  id: 631,
  name: 'Killstreak Lvl 2',
  level: 2,
  isSecret: false,
  description: 'Handlat för 500 kr/månad 3 månader i följd',
  experiencePoints: 500,
  imageName: 'killstreak_lvl_2',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  orderMatching: () => true,
  reduceOrders,
  required: meta.level + 1,
})
