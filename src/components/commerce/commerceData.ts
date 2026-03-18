import { GIFT_COLLECTIONS } from '@/components/gifts/constants'
import { RENTAL_SECTIONS } from '@/components/rentals/constants'
import { SHOP_SECTIONS } from '@/components/shop/constants'
import { slugify } from '@/utils/slugify'

export type CommerceCategory = 'gift' | 'rental' | 'shop'

export interface CommerceItem {
  slug: string
  name: string
  price: string
  description: string
  image: string
  accent: string
  softBg: string
  border: string
  category: CommerceCategory
  sectionLabel: string
}

const giftItems: CommerceItem[] = GIFT_COLLECTIONS.flatMap(collection =>
  collection.gifts.map(gift => ({
    slug: slugify(gift.name),
    name: gift.name,
    price: gift.price,
    description: gift.contents.slice(0, 2).join(' • '),
    image: gift.image,
    accent: gift.color.accent,
    softBg: gift.color.bg,
    border: gift.color.border,
    category: 'gift' as const,
    sectionLabel: collection.title,
  }))
)

const rentalItems: CommerceItem[] = RENTAL_SECTIONS.flatMap(section =>
  section.items.map(item => ({
    slug: slugify(item.name),
    name: item.name,
    price: item.price,
    description: item.desc,
    image: item.image,
    accent: section.theme.accentText,
    softBg: section.theme.accentBg,
    border: section.theme.accentBorder,
    category: 'rental' as const,
    sectionLabel: section.title,
  }))
)

const shopItems: CommerceItem[] = SHOP_SECTIONS.flatMap(section =>
  section.items.map(item => ({
    slug: slugify(item.name),
    name: item.name,
    price: item.price,
    description: item.desc,
    image: item.image,
    accent: item.color,
    softBg: item.bg,
    border: item.border,
    category: 'shop' as const,
    sectionLabel: section.title,
  }))
)

export const COMMERCE_ITEMS: CommerceItem[] = [...giftItems, ...rentalItems, ...shopItems]

export const COMMERCE_CATEGORY_META: Record<
  CommerceCategory,
  {
    label: string
    title: string
    description: string
    ctaLabel: string
    dateLabel: string
    addressLabel: string
    buttonLabel: string
  }
> = {
  gift: {
    label: 'Gifts',
    title: 'Gift Checkout',
    description: 'Choose a gift, set delivery details, and submit your order request.',
    ctaLabel: 'Choose Gift',
    dateLabel: 'Delivery Date',
    addressLabel: 'Delivery Address',
    buttonLabel: 'Place Gift Order',
  },
  rental: {
    label: 'Rentals',
    title: 'Rental Request',
    description: 'Select rentals, share your event details, and send a quote request.',
    ctaLabel: 'Choose Rental',
    dateLabel: 'Event Date',
    addressLabel: 'Venue Address',
    buttonLabel: 'Send Rental Request',
  },
  shop: {
    label: 'Shop',
    title: 'Shop Checkout',
    description: 'Choose an item, confirm pickup or delivery, and complete the checkout form.',
    ctaLabel: 'Choose Item',
    dateLabel: 'Pickup / Delivery Date',
    addressLabel: 'Delivery Address',
    buttonLabel: 'Submit Purchase Request',
  },
}

export function getCommerceItems(category: CommerceCategory) {
 
  return COMMERCE_ITEMS.filter(item => item.category === category)
}
