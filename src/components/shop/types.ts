export type ShopSectionId = 'toys' | 'clothes' | 'furniture' | 'branded'

export type FilterTag = 'All' | 'New' | 'Best Seller' | 'Sale'

export interface NavSectionItem {
  id: ShopSectionId
  label: string
}

export interface HeroPill {
  label: string
  bg: string
  text: string
  border: string
}

export interface ShopItem {
  name: string
  desc: string
  price: string
  image: string
  badge?: string | null
  color: string
  bg: string
  border: string
  age?: string
  sizes?: string
  material?: string
  originalPrice?: string
}

export interface ShopSectionMeta {
  id: ShopSectionId
  eyebrow: string
  title: string
  desc: string
  emptyText: string
  items: ShopItem[]
  showAge?: boolean
  showSizes?: boolean
  showMaterial?: boolean
}

export interface FilterBarProps {
  activeFilter: FilterTag;
  setActiveFilter: (tag: FilterTag) => void;
}

export interface ShopCardProps {
  item: ShopItem
  href: string
  showMaterial?: boolean
  showSizes?: boolean
  showAge?: boolean
}

