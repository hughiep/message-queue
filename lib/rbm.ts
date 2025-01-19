import amqplib from 'amqplib'

export class RabbitMQ {
  private isReady: boolean
  private connection: amqplib.Connection
  public channel: amqplib.Channel
  public consumer: amqplib.Channel

  constructor() {}

  async init(url: string) {
    try {
      if (this.isReady) return this

      this.connection = await amqplib.connect(url)
      this.channel = await this.connection.createChannel()
      this.consumer = await this.connection.createChannel()
      this.isReady = true
      console.log('RabbitMQ initialized')
      return this
    } catch (error) {
      console.error('Error init rabbit mq service', error)
      throw error
    }
  }

  async send(queue: string, message: string) {
    await this.channel.assertQueue(queue)
    this.channel.sendToQueue(queue, Buffer.from(message))
  }
}

export const rabbitMq = new RabbitMQ()
