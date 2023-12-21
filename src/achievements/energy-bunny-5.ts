import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './energy-bunny-1'

export const meta = {
  id: 997,
  name: 'Energy Bunny Lvl 5',
  level: 5,
  isSecret: false,
  description: 'Köpt 500 st energidrycker',
  experiencePoints: 2500,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

const requiredQty = 500

export const listeners = tieredListeners({
  tierMeta: meta,
  requiredQty,
})
