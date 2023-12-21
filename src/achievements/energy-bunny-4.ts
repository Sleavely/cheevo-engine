import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './energy-bunny-1'

export const meta = {
  id: 614,
  name: 'Energy Bunny Lvl 4',
  level: 4,
  isSecret: false,
  description: 'Köpt 250 st energidrycker',
  experiencePoints: 2500,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

const requiredQty = 250

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredQty,
})
