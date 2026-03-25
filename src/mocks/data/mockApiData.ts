/**
 * MSW mock API data — snake_case format.
 *
 * All data mirrors the existing mockData.ts content but uses
 * snake_case field names to match the expected backend API contract.
 * MSW handlers serve this data as JSON responses.
 */

import type { RawBookingResponse } from '@/data/adapters/bookingAdapter'
import type { RawCommerceItemResponse } from '@/data/adapters/commerceAdapter'
import type { RawProfileResponse } from '@/data/adapters/userAdapter'

import type {
  RawClassEventResponse,
  RawPartyPackageResponse,
  RawSpecialEventResponse,
  RawTimeSlotResponse,
} from '@/data/adapters/bookingAdapter'

import type {
  RawLoginResponse,
  RawRefreshTokenResponse,
  RawRegisterResponse,
} from '@/data/adapters/authAdapter'

import type { RawOrderConfirmationResponse } from '@/data/adapters/commerceAdapter'
import type { StorefrontCommerceItem } from '@/api/commerceApi'

import { slugify } from '@/utils/slugify'
import { GIFT_COLLECTIONS, ALACARTE_GROUPS } from '@/portal/user/components/gifts/constants'
import { RENTAL_SECTIONS } from '@/portal/user/components/rentals/constants'
import { FILTER_TAGS, SHOP_SECTIONS } from '@/portal/user/components/shop/constants'
import {
  HOT_DRINKS,
  COLD_DRINKS,
  FROZEN_TREATS,
  PASTRIES,
  SWEETS,
  BAKED_FOOD,
  PIZZAS,
  SANDWICHES,
  TOASTS,
  KIDS_CORNER,
  SALADS,
  SNACKS,
} from '@/portal/user/components/cafeFood/constants'
import { normalizeRows } from '@/portal/user/components/cafeFood/pageHelpers'

/* ── Auth ── */

export const MOCK_LOGIN_RESPONSE: RawLoginResponse = {
  user: {
    id: 'usr-mock-1',
    email: 'sarah.johnson@example.com',
    name: 'Mock User',
    role: 'user',
  },
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
}

export const MOCK_REGISTER_RESPONSE: RawRegisterResponse = {
  user: {
    id: 'usr-mock-2',
    email: 'new.user@example.com',
    name: 'New User',
    role: 'user',
  },
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
}

export const MOCK_REFRESH_RESPONSE: RawRefreshTokenResponse = {
  access_token: 'mock-new-access-token',
  refresh_token: 'mock-new-refresh-token',
}

/* ── Time Slots ── */

export const MOCK_RAW_TIME_SLOTS: RawTimeSlotResponse[] = [
  {
    id: 'slot-1',
    date: '2026-03-01',
    start_time: '9:00 AM',
    end_time: '11:00 AM',
    spots_total: 20,
    spots_available: 12,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-2',
    date: '2026-03-01',
    start_time: '11:30 AM',
    end_time: '1:30 PM',
    spots_total: 20,
    spots_available: 3,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-3',
    date: '2026-03-01',
    start_time: '2:00 PM',
    end_time: '4:00 PM',
    spots_total: 20,
    spots_available: 0,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-4',
    date: '2026-03-02',
    start_time: '9:00 AM',
    end_time: '11:00 AM',
    spots_total: 20,
    spots_available: 18,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-5',
    date: '2026-03-02',
    start_time: '11:30 AM',
    end_time: '1:30 PM',
    spots_total: 20,
    spots_available: 7,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-6',
    date: '2026-03-03',
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    spots_total: 15,
    spots_available: 15,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-7',
    date: '2026-03-04',
    start_time: '9:00 AM',
    end_time: '11:00 AM',
    spots_total: 20,
    spots_available: 10,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-8',
    date: '2026-03-04',
    start_time: '1:00 PM',
    end_time: '3:00 PM',
    spots_total: 20,
    spots_available: 2,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-9',
    date: '2026-03-05',
    start_time: '9:00 AM',
    end_time: '11:00 AM',
    spots_total: 20,
    spots_available: 14,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
  {
    id: 'slot-10',
    date: '2026-03-06',
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    spots_total: 20,
    spots_available: 20,
    price_per_child: 15,
    age_min: 1,
    age_max: 8,
  },
]

/* ── Classes ── */

export const MOCK_RAW_CLASSES: RawClassEventResponse[] = [
  {
    id: 'class-1',
    title: 'Little Picassos Art Club',
    description:
      "Unleash your child's creativity in this hands-on art exploration class. Each session introduces a new medium — watercolors, collage, clay, and more — guided by our experienced art instructor.",
    instructor: 'Ms. Rivera',
    category: 'art',
    schedule: 'Every Tuesday 10:00–11:00 AM',
    duration: 60,
    spots_total: 12,
    spots_available: 4,
    price_per_session: 25,
    price_series: 180,
    age_min: 3,
    age_max: 7,
    image_slug: 'art-class',
    tags: ['art', 'creative', 'weekly'],
    start_date: '2026-03-04',
    end_date: '2026-05-27',
    sessions_total: 12,
  },
  {
    id: 'class-2',
    title: 'Tiny Tunes Music Circle',
    description:
      'Introduce your little one to the joy of music! Through singing, rhythm games, and simple instruments, children develop their musical ear and love for sound in a nurturing group setting.',
    instructor: 'Mr. Thompson',
    category: 'music',
    schedule: 'Every Wednesday 9:30–10:15 AM',
    duration: 45,
    spots_total: 10,
    spots_available: 10,
    price_per_session: 20,
    price_series: 140,
    age_min: 1,
    age_max: 4,
    image_slug: 'music-class',
    tags: ['music', 'toddler', 'weekly'],
    start_date: '2026-03-05',
    end_date: '2026-05-28',
    sessions_total: 12,
  },
  {
    id: 'class-3',
    title: 'Jumpers & Movers',
    description:
      'High-energy movement class that builds coordination, balance, and gross motor skills through fun obstacle courses, dance games, and team activities. Perfect for active kids!',
    instructor: 'Coach Patel',
    category: 'movement',
    schedule: 'Every Thursday 4:00–5:00 PM',
    duration: 60,
    spots_total: 15,
    spots_available: 0,
    price_per_session: 22,
    price_series: 160,
    age_min: 4,
    age_max: 8,
    image_slug: 'movement-class',
    tags: ['movement', 'active', 'weekly'],
    start_date: '2026-03-06',
    end_date: '2026-05-29',
    sessions_total: 12,
  },
  {
    id: 'class-4',
    title: 'Young Explorers STEM',
    description:
      'Science, technology, engineering, and math come alive in this hands-on exploration class. Children conduct simple experiments, build structures, and solve fun puzzles together.',
    instructor: 'Dr. Chen',
    category: 'stem',
    schedule: 'Every Friday 10:00–11:00 AM',
    duration: 60,
    spots_total: 10,
    spots_available: 2,
    price_per_session: 28,
    price_series: 200,
    age_min: 5,
    age_max: 9,
    image_slug: 'stem-class',
    tags: ['stem', 'science', 'weekly'],
    start_date: '2026-03-07',
    end_date: '2026-05-30',
    sessions_total: 12,
  },
  {
    id: 'class-5',
    title: 'Hola Amigos! Spanish for Kids',
    description:
      'An immersive, play-based introduction to Spanish language and culture. Children learn vocabulary, songs, and simple phrases through stories, games, and interactive activities.',
    instructor: 'Ms. Gonzalez',
    category: 'language',
    schedule: 'Every Monday 11:00 AM–12:00 PM',
    duration: 60,
    spots_total: 12,
    spots_available: 7,
    price_per_session: 26,
    price_series: 190,
    age_min: 3,
    age_max: 8,
    image_slug: 'language-class',
    tags: ['language', 'spanish', 'weekly'],
    start_date: '2026-03-03',
    end_date: '2026-05-26',
    sessions_total: 12,
  },
  {
    id: 'class-6',
    title: 'Creative Dance & Movement',
    description:
      'A joyful blend of creative movement and beginner dance fundamentals. Children express themselves through music, storytelling, and choreography in a supportive, fun environment.',
    instructor: 'Ms. Park',
    category: 'movement',
    schedule: 'Every Saturday 10:00–11:00 AM',
    duration: 60,
    spots_total: 14,
    spots_available: 5,
    price_per_session: 24,
    price_series: 175,
    age_min: 3,
    age_max: 7,
    image_slug: 'dance-class',
    tags: ['dance', 'movement', 'weekend'],
    start_date: '2026-03-07',
    end_date: '2026-05-30',
    sessions_total: 12,
  },
]

/* ── Special Events ── */

export const MOCK_RAW_EVENTS: RawSpecialEventResponse[] = [
  {
    id: 'event-1',
    title: 'Spring Carnival Weekend',
    description:
      'Two days of pure magic! Bounce houses, face painting, carnival games, live music, and food trucks make this the must-attend family event of the season. Unlimited fun for the whole family.',
    featured: true,
    dates: [
      {
        date: '2026-04-11',
        start_time: '10:00 AM',
        end_time: '6:00 PM',
        activities: [
          'Bounce houses',
          'Face painting',
          'Carnival games',
          'Food trucks',
          'Live DJ',
        ],
      },
      {
        date: '2026-04-12',
        start_time: '10:00 AM',
        end_time: '5:00 PM',
        activities: [
          'Pony rides',
          'Balloon art',
          'Live band',
          'Magic show',
          'Craft stations',
        ],
      },
    ],
    location: 'Main Play Arena + Outdoor Grounds',
    image_slug: 'spring-carnival',
    pricing_tiers: [
      {
        id: 'tier-gen-1',
        label: 'General',
        price: 12,
        perks: ['All-day access', 'One carnival game token'],
        spots_available: 300,
      },
      {
        id: 'tier-vip-1',
        label: 'VIP',
        price: 35,
        perks: [
          'All-day access',
          'Priority entry',
          '10 game tokens',
          'VIP goodie bag',
          'Reserved seating for shows',
        ],
        spots_available: 50,
      },
    ],
    tags: ['seasonal', 'family', 'all-ages', 'outdoor'],
    max_capacity: 350,
    registered_count: 127,
  },
  {
    id: 'event-2',
    title: 'Superhero Training Camp',
    description:
      'Kids become their favorite heroes for a day! Obstacle courses, hero challenges, costume parade, and a special superhero ceremony. Every child earns their official Superhero Certificate.',
    featured: true,
    dates: [
      {
        date: '2026-03-21',
        start_time: '9:00 AM',
        end_time: '3:00 PM',
        activities: [
          'Obstacle course',
          'Hero challenges',
          'Craft: make your cape',
          'Costume parade',
          'Certificate ceremony',
        ],
      },
    ],
    location: 'Main Play Arena',
    image_slug: 'superhero-camp',
    pricing_tiers: [
      {
        id: 'tier-gen-2',
        label: 'Standard',
        price: 45,
        perks: [
          'Full day access',
          'Superhero certificate',
          'Snack included',
        ],
        spots_available: 60,
      },
      {
        id: 'tier-mem-2',
        label: 'Member',
        price: 35,
        perks: [
          'Full day access',
          'Superhero certificate',
          'Snack + lunch included',
          'Early entry at 8:30 AM',
        ],
        spots_available: 20,
      },
    ],
    tags: ['camp', 'superhero', 'ages 4-10', 'one-day'],
    max_capacity: 80,
    registered_count: 45,
  },
  {
    id: 'event-3',
    title: 'Dino Discovery Day',
    description:
      'Paleontology meets play! Children excavate fossil replicas, learn about prehistoric creatures, build dinosaur models, and watch an exciting dino puppet show. Educational and wildly fun.',
    featured: false,
    dates: [
      {
        date: '2026-03-28',
        start_time: '10:00 AM',
        end_time: '2:00 PM',
        activities: [
          'Fossil dig',
          'Dino craft',
          'Puppet show',
          'Dinosaur trivia',
          'Photo with giant dino prop',
        ],
      },
    ],
    location: 'Discovery Classroom + Play Zone',
    image_slug: 'dino-day',
    pricing_tiers: [
      {
        id: 'tier-gen-3',
        label: 'General',
        price: 18,
        perks: ['All activities included', 'Take-home fossil replica'],
        spots_available: 80,
      },
    ],
    tags: ['educational', 'dinosaurs', 'ages 3-8'],
    max_capacity: 80,
    registered_count: 31,
  },
  {
    id: 'event-4',
    title: 'Glow & Go Night Play',
    description:
      'The play space transforms into a neon wonderland! Glow sticks, UV face painting, blacklight art, and glowing obstacle courses make this evening event something truly special.',
    featured: false,
    dates: [
      {
        date: '2026-04-04',
        start_time: '6:00 PM',
        end_time: '9:00 PM',
        activities: [
          'UV face painting',
          'Blacklight art station',
          'Glow obstacle course',
          'Neon dance party',
        ],
      },
    ],
    location: 'Main Play Arena',
    image_slug: 'glow-night',
    pricing_tiers: [
      {
        id: 'tier-gen-4',
        label: 'General',
        price: 20,
        perks: ['Entry + glow kit', 'One art activity'],
        spots_available: 120,
      },
      {
        id: 'tier-vip-4',
        label: 'Glow VIP',
        price: 38,
        perks: [
          'Entry + premium glow kit',
          'All activities',
          'UV photo package',
        ],
        spots_available: 30,
      },
    ],
    tags: ['evening', 'family', 'ages 4+', 'unique'],
    max_capacity: 150,
    registered_count: 62,
  },
  {
    id: 'event-5',
    title: 'Summer Reading Kickoff Party',
    description:
      'Celebrate the start of summer reading season with stories, crafts, a book swap, and special visits from beloved storybook characters. Every child goes home with a new book.',
    featured: false,
    dates: [
      {
        date: '2026-06-06',
        start_time: '10:00 AM',
        end_time: '1:00 PM',
        activities: [
          'Storytime sessions',
          'Book-themed crafts',
          'Book swap table',
          'Character meet & greet',
        ],
      },
    ],
    location: 'Discovery Town Library Corner',
    image_slug: 'reading-party',
    pricing_tiers: [
      {
        id: 'tier-gen-5',
        label: 'General',
        price: 10,
        perks: ['All activities', 'Take-home book'],
        spots_available: 100,
      },
    ],
    tags: ['educational', 'literacy', 'all-ages', 'summer'],
    max_capacity: 100,
    registered_count: 18,
  },
]

/* ── Party Packages ── */

export const MOCK_RAW_PARTY_PACKAGES: RawPartyPackageResponse[] = [
  {
    id: 'pkg-basic',
    name: 'Basic',
    tagline: 'Perfect for an intimate celebration',
    price: 299,
    deposit_amount: 100,
    duration: 120,
    guests_included: 10,
    price_per_extra_guest: 12,
    features: [
      '2 hours exclusive play area access',
      'Basic balloon decorations',
      'Dedicated staff host',
      'Party invitations (10)',
      'Paper goods & tableware',
    ],
    add_ons: [
      {
        id: 'ao-cake-b',
        label: 'Birthday Cake',
        price: 65,
        description: 'Custom decorated cake serves 15',
        pricing_model: 'flat',
      },
      {
        id: 'ao-photo-b',
        label: 'Digital Photo Package',
        price: 80,
        description: '50+ edited digital photos from your event',
        pricing_model: 'flat',
      },
      {
        id: 'ao-goody-b',
        label: 'Goody Bags',
        price: 5,
        description: 'Pre-filled goody bags per child',
        pricing_model: 'per-person',
      },
    ],
    color: 'accent',
    popular: false,
  },
  {
    id: 'pkg-deluxe',
    name: 'Deluxe',
    tagline: 'The most popular party experience',
    price: 499,
    deposit_amount: 150,
    duration: 150,
    guests_included: 20,
    price_per_extra_guest: 10,
    features: [
      '2.5 hours exclusive play area access',
      'Premium themed decorations',
      'Dedicated party host + assistant',
      'Catered snack spread for all guests',
      'Party invitations (20)',
      'Premium favor bags',
      'Custom birthday banner',
    ],
    add_ons: [
      {
        id: 'ao-cake-d',
        label: 'Birthday Cake',
        price: 85,
        description: 'Custom decorated cake serves 25',
        pricing_model: 'flat',
      },
      {
        id: 'ao-photo-d',
        label: 'Professional Photos',
        price: 120,
        description: 'Full edited gallery + print package',
        pricing_model: 'flat',
      },
      {
        id: 'ao-entertainer-d',
        label: 'Character Appearance',
        price: 150,
        description: '30-min costumed character visit',
        pricing_model: 'flat',
      },
      {
        id: 'ao-photobooth-d',
        label: 'Photo Booth',
        price: 95,
        description: 'Unlimited prints, props included',
        pricing_model: 'flat',
      },
    ],
    color: 'primary',
    popular: true,
  },
  {
    id: 'pkg-premium',
    name: 'Premium',
    tagline: 'The ultimate Discovery Town experience',
    price: 799,
    deposit_amount: 250,
    duration: 180,
    guests_included: 30,
    price_per_extra_guest: 8,
    features: [
      '3 hours full venue buyout',
      'Custom themed décor package',
      'Two dedicated event hosts',
      'Full catered meal for all guests',
      'Party invitations (30)',
      'Premium favor bags',
      'Personalized banner + signage',
      'Professional photo package included',
      'Dedicated event coordinator',
    ],
    add_ons: [
      {
        id: 'ao-entertainer-p',
        label: 'Extra Character Appearance',
        price: 150,
        description: 'Second costumed character for your theme',
        pricing_model: 'flat',
      },
      {
        id: 'ao-video-p',
        label: 'Video Highlight Reel',
        price: 200,
        description: 'Edited 3-min highlight video of the event',
        pricing_model: 'flat',
      },
      {
        id: 'ao-cake-p',
        label: 'Multi-Tier Cake',
        price: 150,
        description: 'Custom 3-tier decorated cake serves 40',
        pricing_model: 'flat',
      },
    ],
    color: 'secondary',
    popular: false,
  },
]

/* ── User Profile ── */

export const MOCK_RAW_PROFILE: RawProfileResponse = {
  id: 'cust-1',
  first_name: 'Sarah',
  last_name: 'Johnson',
  email: 'sarah.johnson@example.com',
  phone: '(555) 867-5309',
  member_since: '2024-09-15',
  membership_type: 'member',
  children: [
    {
      id: 'child-1',
      name: 'Emma',
      date_of_birth: '2019-04-12',
      allergies: 'Peanuts',
      notes: 'Loves art and music',
    },
    {
      id: 'child-2',
      name: 'Liam',
      date_of_birth: '2021-08-03',
      allergies: 'None',
      notes: 'Very active, loves climbing',
    },
  ],
}

/* ── Bookings ── */

export const MOCK_RAW_BOOKINGS: RawBookingResponse[] = [
  {
    id: 'bk-001',
    booking_type: 'drop-in',
    title: 'Drop-In Play Session',
    scheduled_date: '2026-03-15',
    time_range: '10:00 AM – 12:00 PM',
    status: 'confirmed',
    total_amount: 30,
    confirmation_code: 'DT-2026-001',
    guests: [
      {
        id: 'g1',
        full_name: 'Emma Johnson',
        age: 6,
        relationship: 'Child',
      },
      {
        id: 'g2',
        full_name: 'Liam Johnson',
        age: 4,
        relationship: 'Child',
      },
    ],
  },
  {
    id: 'bk-002',
    booking_type: 'class',
    title: 'Little Picassos Art Club',
    scheduled_date: '2026-03-18',
    time_range: '10:00 AM – 11:00 AM',
    status: 'confirmed',
    total_amount: 180,
    confirmation_code: 'DT-2026-002',
    guests: [
      {
        id: 'g3',
        full_name: 'Emma Johnson',
        age: 6,
        relationship: 'Child',
      },
    ],
  },
  {
    id: 'bk-003',
    booking_type: 'event',
    title: 'Superhero Training Camp',
    scheduled_date: '2026-03-21',
    time_range: '9:00 AM – 3:00 PM',
    status: 'confirmed',
    total_amount: 90,
    confirmation_code: 'DT-2026-003',
    guests: [
      {
        id: 'g4',
        full_name: 'Emma Johnson',
        age: 6,
        relationship: 'Child',
      },
      {
        id: 'g5',
        full_name: 'Liam Johnson',
        age: 4,
        relationship: 'Child',
      },
    ],
  },
  {
    id: 'bk-004',
    booking_type: 'party',
    title: "Emma's Birthday Party — Deluxe",
    scheduled_date: '2026-04-12',
    time_range: '1:00 PM – 3:30 PM',
    status: 'confirmed',
    total_amount: 499,
    confirmation_code: 'DT-2026-004',
    guests: [
      {
        id: 'g6',
        full_name: 'Emma Johnson',
        age: 6,
        relationship: 'Birthday Child',
      },
    ],
  },
  {
    id: 'bk-005',
    booking_type: 'drop-in',
    title: 'Drop-In Play Session',
    scheduled_date: '2026-02-08',
    time_range: '9:00 AM – 11:00 AM',
    status: 'completed',
    total_amount: 15,
    confirmation_code: 'DT-2026-005',
    guests: [
      {
        id: 'g7',
        full_name: 'Liam Johnson',
        age: 4,
        relationship: 'Child',
      },
    ],
  },
  {
    id: 'bk-006',
    booking_type: 'class',
    title: 'Jumpers & Movers',
    scheduled_date: '2026-02-20',
    time_range: '4:00 PM – 5:00 PM',
    status: 'cancelled',
    total_amount: 0,
    confirmation_code: 'DT-2026-006',
    guests: [
      {
        id: 'g8',
        full_name: 'Liam Johnson',
        age: 4,
        relationship: 'Child',
      },
    ],
  },
]

/* ── Commerce ── */

export const MOCK_RAW_COMMERCE_ITEMS: RawCommerceItemResponse[] = []

export const MOCK_RAW_ORDER_CONFIRMATION: RawOrderConfirmationResponse = {
  order_id: 'ORD-MOCK-001',
  status: 'received',
}

function parseFirstAmount(price: string): number {
  const match = price.match(/(\d+(?:\.\d+)?)/)
  if (!match) return 0
  return Number.parseFloat(match[1])
}

function toStorefrontItem(input: {
  category: StorefrontCommerceItem['category']
  name: string
  description: string
  price: number
  image: string
  tags: string[]
  popular?: boolean
}): StorefrontCommerceItem {
  return {
    id: `${input.category}-${slugify(input.name)}`,
    category: input.category,
    name: input.name,
    description: input.description,
    price: input.price,
    image: input.image,
    tags: input.tags,
    popular: input.popular,
  }
}

const CAFE_STOREFRONT_ITEMS: StorefrontCommerceItem[] = [
  ...normalizeRows(HOT_DRINKS, 3.5, 'hot-drinks').map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'drinks', 'hot-drinks'],
      popular: row.badge?.toLowerCase().includes('fave') ?? false,
    }),
  ),
  ...normalizeRows(COLD_DRINKS, 3.75, 'cold-drinks').map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'drinks', 'cold-drinks'],
      popular: row.badge?.toLowerCase().includes('fave') ?? false,
    }),
  ),
  ...normalizeRows(FROZEN_TREATS, 4.25, 'frozen').map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'drinks', 'frozen'],
      popular: row.badge?.toLowerCase().includes('fave') ?? false,
    }),
  ),
  ...normalizeRows(
    PIZZAS.map(p => ({ name: p.name, desc: p.desc, badge: p.badge })),
    8.5,
    'pizza',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'pizza'],
      popular: row.badge?.toLowerCase().includes('special') ?? false,
    }),
  ),
  ...normalizeRows(
    SANDWICHES.flatMap(g => g.items.map(i => ({ name: i.name, desc: i.desc, badge: i.badge }))),
    7.5,
    'sandwich',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'sandwich'],
    }),
  ),
  ...normalizeRows(
    TOASTS.map(t => ({ name: t.name, desc: t.desc, badge: t.badge })),
    5.75,
    'toasts',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'toasts'],
      popular: row.badge?.toLowerCase().includes('fave') ?? false,
    }),
  ),
  ...normalizeRows(
    KIDS_CORNER.map(k => ({ name: k.name, desc: k.desc, badge: k.badge })),
    4.95,
    'kids',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'kids'],
      popular: row.badge?.toLowerCase().includes('fave') ?? false,
    }),
  ),
  ...normalizeRows(
    SALADS.map(s => ({ name: s.name, desc: s.desc, badge: s.badge })),
    6.95,
    'salads',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'salads'],
    }),
  ),
  ...normalizeRows(
    SNACKS.map(s => ({ name: s.name, desc: s.desc, badge: s.badge })),
    2.95,
    'snacks',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'snacks'],
    }),
  ),
  ...normalizeRows(
    PASTRIES.map(p => ({ name: p.name, desc: p.desc, badge: p.badge })),
    3.25,
    'bakery',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'bakery'],
    }),
  ),
  ...normalizeRows(
    SWEETS.map(s => ({ name: s.name, desc: s.desc, badge: s.badge })),
    2.95,
    'sweets',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'sweets'],
    }),
  ),
  ...normalizeRows(
    BAKED_FOOD.map(b => ({ name: b.name, desc: b.desc, badge: b.badge })),
    4.25,
    'baked',
  ).map(row =>
    toStorefrontItem({
      category: 'cafe',
      name: row.name,
      description: row.detail ?? '',
      price: row.price,
      image: row.img ?? '',
      tags: ['cafe', 'food', 'baked'],
    }),
  ),
]

const GIFT_STOREFRONT_ITEMS: StorefrontCommerceItem[] = [
  ...GIFT_COLLECTIONS.flatMap(section =>
    section.gifts.map(gift =>
      toStorefrontItem({
        category: 'gifts',
        name: gift.name,
        description: gift.contents?.slice?.(0, 2)?.join(' • ') ?? gift.occasion ?? '',
        price: parseFirstAmount(gift.price),
        image: gift.image,
        tags: ['gifts', 'box', section.id, ...(gift.badge ? [gift.badge] : [])],
        popular:
          (gift.badge ?? '').toLowerCase().includes('best') ||
          (gift.badge ?? '').toLowerCase().includes('seller'),
      }),
    ),
  ),
  ...ALACARTE_GROUPS.flatMap(group =>
    group.items.map(item =>
      toStorefrontItem({
        category: 'gifts',
        name: item.name,
        description: item.desc ?? '',
        price: parseFirstAmount(item.price),
        image: group.image,
        tags: ['gifts', 'alacarte', slugify(group.title)],
      }),
    ),
  ),
]

const RENTAL_STOREFRONT_ITEMS: StorefrontCommerceItem[] = RENTAL_SECTIONS.flatMap(section =>
  section.items.map(item =>
    toStorefrontItem({
      category: 'rentals',
      name: item.name,
      description: item.desc ?? '',
      price: parseFirstAmount(item.price),
      image: item.image,
      tags: ['rentals', section.id, ...(item.badge ? [item.badge] : [])],
      popular:
        (item.badge ?? '').toLowerCase().includes('popular') ||
        (item.badge ?? '').toLowerCase().includes('favorite'),
    }),
  ),
)

const SHOP_STOREFRONT_ITEMS: StorefrontCommerceItem[] = SHOP_SECTIONS.flatMap(section =>
  section.items.map(item => {
    const badgeTag =
      item.badge && FILTER_TAGS.includes(item.badge as any)
        ? [item.badge]
        : []

    return toStorefrontItem({
      category: 'shop',
      name: item.name,
      description: item.desc ?? '',
      price: parseFirstAmount(item.price),
      image: item.image,
      tags: ['shop', section.id, ...badgeTag],
      popular: (item.badge ?? '').toLowerCase().includes('best'),
    })
  }),
)

export const MOCK_STOREFRONT_COMMERCE_ITEMS: StorefrontCommerceItem[] = [
  ...CAFE_STOREFRONT_ITEMS,
  ...GIFT_STOREFRONT_ITEMS,
  ...RENTAL_STOREFRONT_ITEMS,
  ...SHOP_STOREFRONT_ITEMS,
]
