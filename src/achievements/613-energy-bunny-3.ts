import { type AchievementMeta } from '../models/achievements'
import { makeListeners } from './_rowShippedListener'
import { predicates } from './367-energy-bunny-1'

export const meta = {
  id: 613,
  name: 'Energy Bunny Lvl 3',
  level: 3,
  isSecret: false,
  description: 'Köpt 100 st energidrycker',
  experiencePoints: 2500,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 100,
})
