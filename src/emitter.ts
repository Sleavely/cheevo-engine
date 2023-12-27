import { readdir } from 'fs/promises'
import { type OrderEvent } from './events/order'
import { type ShippedEvent } from './events/shipped'

export interface EcomEventListeners {
  onOrder?: (event: OrderEvent) => Promise<void>
  onShipped?: (event: ShippedEvent) => Promise<void>
}

class CustomEmitter {
  listeners: Record<string, Array<(context?: unknown) => Promise<void>>> = {}

  emit (event: 'order', context: Omit<OrderEvent, 'event'>): Promise<void>
  emit (event: 'shipped', context: Omit<ShippedEvent, 'event'>): Promise<void>
  async emit (event: string, context?: object): Promise<void> {
    console.log('\n', `Received event "${event}"`, context)
    if (this.listeners[event]) {
      await Promise.all(this.listeners[event].map(async fn => {
        await fn({ event, ...context })
      }))
    }
  }

  on (event: string, fn: (context: unknown) => Promise<void>): void {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(fn)
  }
}
const emitter = new CustomEmitter()

// Register listeners
const achievementsDir = (new URL('./achievements', import.meta.url)).pathname
const cheevos = await readdir(achievementsDir)
let registeredCheevos = 0
for (const cheevoFile of cheevos) {
  if (cheevoFile.startsWith('_')) continue
  if (cheevoFile.endsWith('.test.ts')) continue

  const cheevoListeners = (await import(`${achievementsDir}/${cheevoFile}`)).listeners as EcomEventListeners
  for (const [prop, fn] of Object.entries(cheevoListeners)) {
    if (prop === 'onOrder') emitter.on('order', fn)
    if (prop === 'onShipped') emitter.on('shipped', fn)
  }
  registeredCheevos += 1
}
console.log(`🛜 ${registeredCheevos} cheevo listeners registered.`)

export { emitter }
