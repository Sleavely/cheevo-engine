import { apiRequestJson } from '../lib/whApi'

export const getUserAchievements = async (userId: number): Promise<Achievement[]> => {
  const res = await apiRequestJson<AchievementsResponse>(`/user/${userId}/achievements`)
  return res.achievements
}
interface AchievementsResponse {
  achievements: Achievement[]
  counts: Counts
}

export interface Achievement {
  id: number
  name: string
  level: number
  modifiedAt?: number
  isSecret: boolean
  description: null | string
  experiencePoints: number
  rarity: Rarity
  rarityOrder: number
  achievedPercentage: number
  imageName: string
}

type Rarity = 'Common' | 'Legendary' | 'Epic' | 'Rare' | 'Uncommon' | 'Exclusive'

interface Counts {
  unlocked: number
  inProgress: number
  locked: number
}

/**
 * Custom type that only includes static system information
 */
export type AchievementMeta = Omit<Achievement, 'achievedPercentage' | 'modifiedAt' | 'rarity' | 'rarityOrder'>
