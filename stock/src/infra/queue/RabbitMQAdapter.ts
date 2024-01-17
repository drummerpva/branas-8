import amqp from 'amqplib'
import { Queue } from './Queue'

export class RabbitMQAdapter implements Queue {
  connection?: amqp.Connection
  constructor() {}

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost')
  }

  async close(): Promise<void> {
    await this.connection?.close()
  }

  async on(
    exchangeName: string,
    queueName: string,
    callback: (message: any) => Promise<void>,
  ): Promise<void> {
    const channel = await this.connection?.createChannel()
    await channel?.assertQueue(queueName, { durable: true })
    await channel?.bindQueue(queueName, exchangeName, '')
    await channel?.consume(queueName, async (message: any) => {
      await callback(message.content.toString())
      channel.ack(message)
    })
  }

  async publish(exchangeName: string, data: any): Promise<void> {
    const channel = await this.connection?.createChannel()
    await channel?.assertExchange(exchangeName, 'direct', { durable: true })
    channel?.publish(exchangeName, '', Buffer.from(JSON.stringify(data)))
  }
}
