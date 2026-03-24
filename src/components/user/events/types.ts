export type EventSection = 'packages' | 'add-ons' | 'takeout-party' | 'we-bring-party'

export interface NavSectionItem {
  id: EventSection
  label: string
}

export interface InclusionItem {
  text: string
}

export interface PrivatePackageItem {
  id: string
  name: string
  img: string
  price: string
  priceNote: string | null
  accent: string
  bg: string
  border: string
  badge: string | null
  children: number
  adults: number
  duration: string
  extraChild: string
  inclusions: InclusionItem[]
}

export interface VenuePackageItem {
  id: string
  name: string
  price: string
  deposit: string
  accent: string
  guests: number
  duration: string
  staff: string
  inclusions: InclusionItem[]
  badge?: string
}

export interface AddonItem {
  name: string
  desc: string
  price: string
}

export interface AddonGroup {
  title: string
  anchor: string
  items: AddonItem[]
  border: string
  bg: string
  priceBg: string
  priceColor: string
}

export interface AddonCategoryItem {
  name: string
  desc: string
  accent: 'primary' | 'teal' | 'dark' | 'amber'
  anchor: string
}

export interface WeBringServiceItem {
  name: string
  desc: string
}

export interface AddonCardProps {
  item: AddonItem
  border: string
  bg: string
  priceBg: string
  priceColor: string
}

export interface AddonCategoryCardsProps {
  items: AddonCategoryItem[]
}

export interface AddonGroupsSectionProps {
  groups: AddonGroup[]
}

export interface CtaStripProps {
  title: string
  subtitle: string
  href: string
  buttonText: string
  gradientClassName?: string
  buttonTextColor?: string
}

export interface PrivatePackageCardProps {
  pkg: PrivatePackageItem
}

export interface VenuePackageCardProps {
  pkg: VenuePackageItem
}

export interface WeBringServicesGridProps {
  services: WeBringServiceItem[]
  images: Record<string, string>
}
