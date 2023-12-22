import { emitter } from './src/emitter'

await (async () => {
  // Here we are emitting hardcoded events but in practise they would be coming from a message queue

  await emitter.emit('shipped', { userId: 3252536, orderId: 19427492 }) // red bull & LEGO
  await emitter.emit('order', { userId: 3252536, orderId: 19366786 }) // ssd drive
  await emitter.emit('shipped', { userId: 3252536, orderId: 18471523 }) // 04:56
  await emitter.emit('shipped', { userId: 3252536, orderId: 17826160 }) // 05:00
})()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
