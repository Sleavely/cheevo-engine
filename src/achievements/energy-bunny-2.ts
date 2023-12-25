import { type AchievementMeta } from '../models/achievement'
import { tieredListeners } from './_tieredListener'
import { predicates } from './energy-bunny-1'

export const meta = {
  id: 612,
  name: 'Energy Bunny Lvl 2',
  level: 2,
  isSecret: false,
  description: 'Köpt 50 st energidrycker',
  experiencePoints: 1000,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

export const listeners = tieredListeners({
  tierMeta: meta,
  predicates,
  counter: 'quantity',
  required: 50,
})
