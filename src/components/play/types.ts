export type SectionId =
  | 'open-play'
  | 'private-play'
  | 'special-events'
  | 'camps'
  | 'parents-night-out'
  | 'field-trips'
  | 'we-bring-play'

export interface NavItem {
  id: SectionId
  label: string
}

export interface PassItem {
  slug: string
  name: string
  price: string
  sub: string
  accent: string
  tag: string | null
  desc: string
}

export interface PrivatePlayOption {
  slug: string
  name: string
  desc: string
  accent: string
  img: string
}

export interface FestivalItem {
  name: string
  season?: string
  accent: string
  desc: string
}

export interface CampItem {
  slug: string
  name: string
  accent: string
  img: string
  description?: string
  duration?: string
  ages?: string
}

export interface PnoItem {
  label: string
  val: string
}

export interface CampCardProps {
  camp: CampItem
}

export interface FestivalCardProps {
  item: FestivalItem
}

export interface PnoItem {
  label: string
  val: string
}

export interface PNOSectionProps {
  details: PnoItem[]
  images: string[]
}

export interface PassCardProps {
  pass: PassItem
}

export interface PrivatePlayCardsProps {
  options: PrivatePlayOption[]
}

export interface WeBringServicesGridProps {
  services: string[]
  images: string[]
}

