import { type AchievementMeta } from '../models/achievement'
import { makeListeners } from './_rowShippedListener'
import { predicates } from './energy-bunny-1'

export const meta = {
  id: 997,
  name: 'Energy Bunny Lvl 5',
  level: 5,
  isSecret: false,
  description: 'Köpt 500 st energidrycker',
  experiencePoints: 2500,
  imageName: 'energy_bunny',
} satisfies AchievementMeta

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 500,
})
