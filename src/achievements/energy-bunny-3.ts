import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './energy-bunny-1'

export const meta = {
  id: 613,
  name: 'Energy Bunny Lvl 3',
  level: 3,
  isSecret: false,
  description: 'Köpt 100 st energidrycker',
  experiencePoints: 2500,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

const requiredQty = 100

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredQty,
})
