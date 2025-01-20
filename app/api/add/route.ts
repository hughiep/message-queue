import { clients } from '@/app/clients'

export async function POST(request: Request) {
  clients.forEach((client) => {
    client.response.body.write('Hello')
  })

  return new Response('OK')
}
