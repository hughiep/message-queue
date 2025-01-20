'use client'

import { useEffect } from 'react'

import { pickProduct } from '@/actions/ecommerce'

export default function PickProduct() {
  useEffect(() => {
    const events = new EventSource('/api/stream')
    events.onmessage = (event) => {
      console.log(event.data)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <button type="button" className="rounded-md bg-blue-500 p-2 text-white">
        Stream
      </button>
      <button
        type="button"
        onClick={pickProduct}
        className="rounded-md bg-blue-500 p-2 text-white"
      >
        Pick A Product
      </button>
    </div>
  )
}
