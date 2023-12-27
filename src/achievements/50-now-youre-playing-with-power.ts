import { type AchievementMeta } from '../models/achievements'
import { type Predicates, makeListeners } from './_rowShippedListener'

export const meta = {
  id: 50,
  name: "Now You're Playing with Power",
  level: 0,
  isSecret: false,
  description: 'Köpt en Webhallen Config-dator',
  experiencePoints: 5000,
  imageName: 'now_youre_playing_with_power',
} satisfies AchievementMeta

export const predicates = {
  row: (row) => row.product.name.includes('Webhallen Config'),
} satisfies Predicates

export const listeners = makeListeners({
  meta,
  predicates,
  counter: 'quantity',
  required: 1,
})
