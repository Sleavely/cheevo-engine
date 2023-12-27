import { describe, expect, test, vi } from 'vitest'
import { getCachedPromise } from './promiseCache'

describe('getCachedPromise()', () => {
  test('resolves with the promise from fn()', async () => {
    const result = await getCachedPromise({ key: 'wut', fn: async () => 749 })
    expect(result).toBe(749)
  })
  test('only calls fn() once for a given cache key', async () => {
    const key = 'my cache key'
    const fn = vi.fn().mockImplementation(() => 1337)

    const firstResult = await getCachedPromise({ key, fn })
    const secondResult = await getCachedPromise({ key, fn })

    expect(firstResult).toBe(1337)
    expect(secondResult).toBe(1337)
    expect(fn).toHaveBeenCalledTimes(1)

    await getCachedPromise({ key: 'some other cache key', fn })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
