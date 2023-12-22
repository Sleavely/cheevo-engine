import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './super-parent-1'

export const meta = {
  id: 490,
  name: 'Super Parent Lvl 3',
  level: 3,
  isSecret: false,
  description: 'Köpt Lego för 10000 kr',
  experiencePoints: 2500,
  imageName: 'super_parent',
} satisfies AchievementMeta

const requiredAmount = 10000

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredAmount,
})
