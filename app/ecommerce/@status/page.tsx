'use client'

import { useEffect, useState } from 'react'

import { Wss } from '@/lib/socket'

const socket = Wss.getInstance()
export default function Status() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    socket.connect()
  }, [])

  useEffect(() => {
    socket.on('order', (message: any) => {
      setOrders((prevOrders) => [...prevOrders, message])
    })
  }, [])

  return <div>Status: {orders.length}</div>
}
