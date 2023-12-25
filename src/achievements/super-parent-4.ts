import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './_tieredListener'
import { predicates } from './super-parent-1'

export const meta = {
  id: 491,
  name: 'Super Parent Lvl 4',
  level: 4,
  isSecret: false,
  description: 'Köpt Lego för 20000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

export const listeners = tieredListeners({
  tierMeta: meta,
  predicates,
  counter: 'price',
  required: 20000,
})
