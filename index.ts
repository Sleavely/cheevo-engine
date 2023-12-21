import { emitter } from './src/emitter'

await (async () => {
  // Emit events
  await emitter.emit('shipped', { userId: 3252536, orderId: 19427492 }) // red bull & LEGO
  // await emitter.emit('order', { userId: 3252536, orderId: 19366786 }) // ssd drive
})()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
