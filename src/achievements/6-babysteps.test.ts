import { describe, beforeEach, test, expect, vi } from 'vitest'
import * as fixtures from '../models/orders.fixtures'
import { saveAchievementProgress } from '../models/achievement'
import { getOrderById, getOrdersByUser } from '../models/orders'

vi.mock('../models/achievement')
vi.mock('../models/orders')

// Load the file we actually want to test _after_ defining our mocks
const { meta, listeners: { onShipped } } = await import('./6-babysteps')

describe(meta.name, () => {
  beforeEach(() => {
    // clear history but not implementation
    vi.clearAllMocks()
  })

  test('progressable', async () => {
    vi.mocked(getOrderById).mockResolvedValueOnce(fixtures.order())
    vi.mocked(getOrdersByUser).mockResolvedValueOnce([fixtures.order()])

    await onShipped({ event: 'shipped', userId: 123, orderId: 456 })

    expect(saveAchievementProgress)
      .toHaveBeenCalledWith(
        expect.objectContaining({ progress: 1 / 3 }),
      )
  })

  test('achievable', async () => {
    vi.mocked(getOrderById).mockResolvedValueOnce(fixtures.order())
    vi.mocked(getOrdersByUser).mockResolvedValueOnce([
      fixtures.order(),
      fixtures.order(),
      fixtures.order(),
    ])

    await onShipped({ event: 'shipped', userId: 123, orderId: 456 })

    expect(saveAchievementProgress)
      .toHaveBeenCalledWith(
        expect.objectContaining({ progress: 1 }),
      )
  })
})
