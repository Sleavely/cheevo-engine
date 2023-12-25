import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './_tieredListener'
import { predicates } from './super-parent-1'

export const meta = {
  id: 489,
  name: 'Super Parent Lvl 2',
  level: 2,
  isSecret: false,
  description: 'Köpt Lego för 5000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

export const listeners = tieredListeners({
  tierMeta: meta,
  predicates,
  counter: 'price',
  required: 5000,
})
