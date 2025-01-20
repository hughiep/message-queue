// File: app/api/stream/route.ts

import { clients } from '@/app/clients'

// Prevents this route's response from being cached on Vercel
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const encoder = new TextEncoder()
  // Create a streaming response
  const customReadable = new ReadableStream({
    start(controller) {
      const message = 'A sample message.'
      controller.enqueue(encoder.encode(`data: ${message}\n\n`))
    },
  })

  // Return the stream response and keep the connection alive
  const response = new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  })
  Response.json({
    id: Date.now(),
    response: response,
  })
  clients.push({
    id: Date.now(),
    response: Response,
  })

  return response
}
