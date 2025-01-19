'use client'

import { useEffect } from 'react'

import { Wss } from '@/lib/socket'

const socket = Wss.getInstance()
export default function Status() {
  useEffect(() => {
    socket.connect()
  }, [])

  useEffect(() => {
    socket.on('order', (message: any) => {
      console.log(message)
    })
  }, [])

  return <div>Status</div>
}
