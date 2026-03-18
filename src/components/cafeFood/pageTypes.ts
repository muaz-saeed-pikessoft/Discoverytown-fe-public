export type MenuRow = {
  id: string
  name: string
  detail?: string
  badge?: string
  priceLabel: string
  price: number
  category: string
  img?: string          // optional per-item photo; falls back to shared placeholder
}

export type CartItem = MenuRow & { qty: number }

export type OrderFormState = {
  name: string
  email: string
  phone: string
  orderType: 'pickup' | 'delivery' | 'catering'
  requestedTime: string
  address: string
  notes: string
}

export type SpecialItem = {
  title: string
  price: string
  note: string
  color: string
  bg: string
}
