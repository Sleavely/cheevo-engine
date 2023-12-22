import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './super-parent-1'

export const meta = {
  id: 489,
  name: 'Super Parent Lvl 2',
  level: 2,
  isSecret: false,
  description: 'Köpt Lego för 5000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

const requiredAmount = 5000

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredAmount,
})
