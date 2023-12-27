import { type AchievementMeta } from '../models/achievements'
import { makeListeners } from './_rowShippedListener'
import { predicates } from './19-super-parent-1'

export const meta = {
  id: 491,
  name: 'Super Parent Lvl 4',
  level: 4,
  isSecret: false,
  description: 'Köpt Lego för 20000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 20000,
})
