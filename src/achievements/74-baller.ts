import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 74,
  name: 'Baller',
  level: 1,
  isSecret: false,
  description: 'Handlat för över 100000 kr',
  experiencePoints: 5000,
  imageName: 'baller',
}satisfies AchievementMeta

export const predicates = {} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'totalSum',
  required: 100000,
})
