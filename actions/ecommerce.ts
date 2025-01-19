'use server'

import { Server } from 'socket.io'

import { rabbitMq } from '@/lib/rbm'

export const pickProduct = async () => {
  setTimeout(() => {
    rabbitMq.channel.assertQueue('orders')
    rabbitMq.send('orders', 'Product 1').then(() => {
      console.log('Product 1 sent')
    })
  }, 1000)
  return {
    product: 'Product 1',
  }
}

const io = new Server(3001)

io.on('connection', () => {
  console.log('a user connected')
})

rabbitMq.init('amqp://localhost:5672').then((rabbitMq) => {
  try {
    console.log('rabbitMq initialized')
    rabbitMq.channel.assertQueue('orders')
    rabbitMq.consumer.consume('orders', (msg) => {
      if (msg) {
        // Parse the message content from Buffer
        const content = msg.content.toString()
        console.log('message received:', content)
        io.emit('order', content)

        // Acknowledge the message
        rabbitMq.consumer.ack(msg)
      }
    })
  } catch (error) {
    console.error('Error init rabbit mq service', error)
    throw error
  }
})

// const queue = 'tasks'

// amqplib.connect('amqp://localhost', (err, conn) => {
//   if (err) throw err

//   // Listener
//   conn.createChannel((err, ch2) => {
//     if (err) throw err

//     ch2.assertQueue(queue)

//     ch2.consume(queue, (msg) => {
//       if (msg !== null) {
//         console.log(msg.content.toString())
//         ch2.ack(msg)
//       } else {
//         console.log('Consumer cancelled by server')
//       }
//     })
//   })

//   // Sender
//   conn.createChannel((err, ch1) => {
//     if (err) throw err

//     ch1.assertQueue(queue)

//     setInterval(() => {
//       ch1.sendToQueue(queue, Buffer.from('something to do'))
//     }, 1000)
//   })
// })
