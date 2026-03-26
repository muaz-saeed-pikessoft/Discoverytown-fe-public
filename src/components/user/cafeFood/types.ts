// Cannot find name 'OrderFormState'.ts(2304)
export type CafeSection = 'drinks' | 'food' | 'takeout' | 'delivery'

export interface NavSectionItem {
  id: CafeSection
  label: string
}

export type MenuRow = {
  id: string
  name: string
  detail?: string
  badge?: string
  priceLabel: string
  price: number
  category: string
  img?: string // optional per-item photo; falls back to shared placeholder
}

export type CartItem = MenuRow & { qty: number }

export interface OrderFormState {
  name: string
  email: string
  phone: string
  orderType: 'pickup' | 'delivery' | 'catering'
  requestedTime: string
  address: string
  notes: string
}

export interface CafeSectionProps {
  id: CafeSection
  label: string
}

export interface MenuBoardProps {
  title: string
  subtitle?: string
  accent: string
  /** Scroll target for in-page jump links */
  anchorId?: string

  rows: MenuRow[]

  cartQty: Record<string, number>
  onAdd: (item: MenuRow) => void
  onRemove: (item: MenuRow) => void
}

export interface MenuCardProps {
  item: MenuCardItem
  accent?: string
  qty?: number
  onAdd?: () => void
  onRemove?: () => void
}

export interface OrderPanelProps {
  cartItems: CartItem[]
  itemCount: number
  subtotal: number
  serviceFee: number
  total: number
  orderForm: OrderFormState
  setOrderForm: React.Dispatch<React.SetStateAction<OrderFormState>>
  handleQuantity: (itemId: string, nextQty: number) => void
  submitOrder: (e: React.FormEvent<HTMLFormElement>) => void
  orderSent: boolean
}

export interface VariantItem {
  label: string
  items: string
}

export interface DrinkItem {
  name: string
  desc: string
  emoji?: string
  variants?: VariantItem[]
}

export interface MenuItem {
  name: string
  desc: string
  emoji?: string
  badge?: string
}

export interface SandwichGroup {
  category: string
  items: MenuItem[]
}

export interface PizzaItem {
  name: string
  desc: string
  badge?: string
}

export interface PillItem {
  label: string
  bg: string
  text: string
  border: string
}

export interface DeliveryOption {
  title: string
  desc: string
  color: string
  bg: string
  border: string
  image: string
}

export interface DeliveryCardsProps {
  options: DeliveryOption[]
}

export interface DrinkCardProps {
  item: DrinkItem
  accent?: string
}

export type MenuCardItem = {
  name: string
  desc: string
  priceLabel: string
  badge?: string
  image?: string
}
