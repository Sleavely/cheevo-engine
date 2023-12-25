import { type AchievementMeta } from '../models/achievement'
import { makeListeners } from './_rowShippedListener'
import { predicates } from './super-parent-1'

export const meta = {
  id: 490,
  name: 'Super Parent Lvl 3',
  level: 3,
  isSecret: false,
  description: 'Köpt Lego för 10000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'price',
  required: 10000,
})
