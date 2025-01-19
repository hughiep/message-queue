'use client'

import { pickProduct } from '@/actions/ecommerce'

export default function PickProduct() {
  return (
    <button type="button" onClick={pickProduct}>
      Pick A Product
    </button>
  )
}
