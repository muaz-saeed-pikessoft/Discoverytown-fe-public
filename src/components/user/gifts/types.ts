export type GiftSectionId = 'gourmet' | 'family' | 'wellness' | 'luxury' | 'alacarte' | 'delivery' | 'policy'

export interface NavSectionItem {
  id: GiftSectionId
  label: string
}

export interface ColorSet {
  bg: string
  text: string
  border: string
  accent: string
}

export interface GiftItem {
  image: string
  name: string
  price: string
  occasion: string
  color: ColorSet
  contents: string[]
  badge?: string
  highlight?: string
}

export interface AlacarteItem {
  name: string
  desc: string
  price: string
  image: string
}

export interface DeliveryZone {
  zone: string
  label: string
  radius: string
  area: string
  fee: string
  color: string
  bg: string
  border: string
}

export interface HeroPill {
  label: string
  bg: string
  text: string
  border: string
}

export interface GiftCollectionSection {
  id: GiftSectionId
  eyebrow: string
  title: string
  desc: string
  gifts: GiftItem[]
}

export interface AlacarteGroup {
  title: string
  image: string
  items: AlacarteItem[]
  border: string
  bg: string
  text: string
}

export interface InfoCard {
  image: string
  title: string
  rows: string[]
}

export interface PolicyCard {
  image: string
  title: string
  color: string
  rows: string[]
}

export interface GiftCardProps {
  gift: GiftItem
}
