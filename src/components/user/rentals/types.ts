export type RentalSectionId =
  | 'inflatables'
  | 'trains'
  | 'interactive'
  | 'party-setup'
  | 'party-supply'
  | 'food-drinks'
  | 'entertainers'
  | 'party-staff'
  | 'venue'
  | 'av-lighting'
  | 'invitations'
  | 'photo-video'
  | 'concessions'

export interface NavSectionItem {
  id: RentalSectionId
  label: string
}

export interface RentalItem {
  name: string
  desc: string
  price: string
  image: string
  badge?: string | null
}

export interface AccentTheme {
  accentBg: string
  accentText: string
  accentBorder: string
}

export interface RentalSectionMeta {
  id: RentalSectionId
  eyebrow: string
  title: string
  desc: string
  items: RentalItem[]
  theme: AccentTheme
}

export interface HeroPill {
  label: string
  bg: string
  text: string
  border: string
}

export interface RentalGridProps {
  items: RentalItem[]
  theme: AccentTheme
}
