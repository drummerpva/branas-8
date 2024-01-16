import amqp from 'amqplib'
import { setTimeout as sleep } from 'node:timers/promises'

async function init() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertExchange('checkout', 'direct', { durable: true })
  await channel.assertQueue('checkout.a', { durable: true })
  await channel.assertQueue('checkout.b', { durable: true })
  await channel.assertQueue('checkout.c', { durable: true })
  await channel.bindQueue('checkout.a', 'checkout', '')
  await channel.bindQueue('checkout.b', 'checkout', '')
  await channel.bindQueue('checkout.c', 'checkout', '')
  const event = {
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
  }
  await channel.consume('checkout.a', (message: any) => {
    console.log('A', message.content.toString())
    channel.ack(message)
  })
  await channel.consume('checkout.b', (message: any) => {
    console.log('B', message.content.toString())
    channel.ack(message)
  })
  await channel.consume('checkout.c', (message: any) => {
    console.log('C', message.content.toString())
    channel.ack(message)
  })
  channel.publish('checkout', '', Buffer.from(JSON.stringify(event)))
  await sleep(500)
  await connection.close()
}

init()
