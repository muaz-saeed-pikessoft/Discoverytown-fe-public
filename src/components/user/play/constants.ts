import type { CampItem, FestivalItem, NavItem, PassItem, PnoItem, PrivatePlayOption } from './types'

// Accent keys — map to CSS variables in FestivalCard
export const CORAL = 'primary'

export const NAVY = 'dark'

export const MINT = 'teal'

export const AMBER = 'primary'

export const PURPLE = 'purple'

export const SOFT_BG = '#f8f7f4'

export const NAV: NavItem[] = [
  { id: 'open-play', label: 'Open Play' },
  { id: 'private-play', label: 'Private Play' },

  { id: 'camps', label: 'Camps' },
  { id: 'special-events', label: 'Special Events' },
  { id: 'holiday-events', label: 'Holiday Events' },
  { id: 'parents-night-out', label: 'Night Out' },
  { id: 'field-trips', label: 'Field Trips' },
  { id: 'we-bring-play', label: 'Party at your place' },
]

export const PASSES: PassItem[] = [
  {
    slug: '2-hour-pass',
    name: '2-Hour Pass',
    price: '$12',
    sub: 'per child',
    accent: MINT,
    tag: null,
    desc: 'Drop-in anytime, 2 hrs of play',
  },
  {
    slug: 'sibling-pass',
    name: 'Sibling Pass',
    price: '$10',
    sub: 'per sibling',
    accent: MINT,
    tag: null,
    desc: 'Add any sibling to your visit',
  },
  {
    slug: 'multi-pass',
    name: 'Multi-Pass',
    price: '$50',
    sub: '5 admissions',
    accent: MINT,
    tag: null,
    desc: 'Save $10 vs single passes',
  },
  {
    slug: 'monthly-membership',
    name: 'Monthly Membership',
    price: '$45',
    sub: 'per child/month',
    accent: MINT,
    tag: null,
    desc: 'Unlimited play + perks included',
  },
]

export const PERKS: string[] = [
  'Unlimited play visits',
  'Discounted birthday parties',
  '2 pairs complimentary grip socks',
  '10% off merchandise',
  'One free coffee per month',
]

export const PRIVATE: PrivatePlayOption[] = [
  {
    slug: 'private-party-room-open-play',
    name: 'Private Party Room + Open Play',
    desc: 'Book a private room while enjoying open play for your whole group.',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
  },
  {
    slug: 'whole-venue-buyout',
    name: 'Whole Venue Buyout',
    desc: 'Reserve the entire venue for a fully private, exclusive experience.',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  },
  {
    slug: 'meeting-room-rental',
    name: 'Meeting Room Rental',
    desc: 'Reserve rooms for conferences, workshops, or corporate events.',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
  },
]

export const CHAR_EVENTS: string[] = ['Bluey', 'Princesses', 'Paw Patrol', 'Mickey & Minnie']

export const HOLIDAY_EVENTS: string[] = ['Christmas', 'Easter', 'Hanukkah', 'Eid', 'Diwali']

export const SEASONAL: FestivalItem[] = [
  {
    name: 'Fall Harvest Festival',
    season: 'Autumn',
    accent: AMBER,
    desc: 'Mini pumpkin decorating, costume parade, sensory bins and harvest games.',
  },
  {
    name: 'Winter Wonderland Ball',
    season: 'Winter',
    accent: 'primary',
    desc: 'Snowflake making, indoor snowball fight, LED dance floor & character visits.',
  },
  {
    name: 'Spring Blooming Bash',
    season: 'Spring',
    accent: MINT,
    desc: 'Seed planting, face painting, Bunny Hop races and bubble performers.',
  },
]

export const IMAGINATIVE: FestivalItem[] = [
  {
    name: 'Super Slime & Science',
    accent: 'primary',
    desc: 'Fluffy, glitter & glow-in-the-dark slime stations plus cardboard robot builds.',
  },
  {
    name: 'Junior Carnival & Circus',
    accent: CORAL,
    desc: 'Game booths with prizes, balloon twisting, mini obstacle course and popcorn.',
  },
  {
    name: 'Deep Sea Discovery Day',
    accent: NAVY,
    desc: 'Ocean projections, magnetic fishing, blue sensory bins & sea creature crafts.',
  },
  { name: 'Dance Party', accent: CORAL, desc: 'Music, movement, DJ-style lighting and pure joy on the dance floor.' },
  { name: 'Bubble Party', accent: MINT, desc: 'Giant bubbles, floating bubbles, interactive bubble walls and more.' },
  {
    name: 'Balloon Drop Party',
    accent: AMBER,
    desc: 'A colorful rain of balloons and celebration for every occasion.',
  },
]

export const SKILL_EVENTS: FestivalItem[] = [
  {
    name: 'Mini Maker Faire',
    accent: AMBER,
    desc: 'Group LEGO challenges, woodworking stations, and design-a-town on craft paper.',
  },
  {
    name: 'Tiny Chefs Food Festival',
    accent: MINT,
    desc: 'Decorate cookies, build mini pizzas — supervised, allergy-conscious fun.',
  },
]

export const CAMPS: CampItem[] = [
  {
    slug: 'summer-camp',
    name: 'Summer Camp',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
    description: 'Outdoor adventures, team games, arts, and splash-day fun all summer long.',
    duration: '8-Week Program',
    ages: 'Ages 4-11',
  },
  {
    slug: 'winter-break-camp',
    name: 'Winter Break Camp',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&q=80',
    description: 'Cozy indoor play, creative crafts, and themed activity days during the winter break.',
    duration: '2-Week Program',
    ages: 'Ages 4-10',
  },
  {
    slug: 'spring-break-camp',
    name: 'Spring Break Camp',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=900&q=80',
    description: 'Science play, movement games, and spring-themed projects for nonstop excitement.',
    duration: '1-Week Program',
    ages: 'Ages 3-10',
  },
  {
    slug: 'mlk-day-camp',
    name: 'MLK Day Camp',
    accent: 'primary',
    img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=900&q=80',
    description: 'A single-day camp packed with active play, stories, and collaborative activities.',
    duration: '1-Day Camp',
    ages: 'Ages 3-10',
  },
]

export const PNO: PnoItem[] = [
  { label: 'Time', val: '4:00 PM – 7:00 PM' },
  { label: 'Day', val: 'Saturday Evenings' },
  { label: 'Ages', val: '6 months – 7 years' },
  { label: 'Price', val: '$50 / child · $40 siblings' },
]

export const PNO_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&q=80',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
  'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=500&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
]

export const WE_BRING: string[] = [
  'Inflatables',
  'Train Rides',
  'Interactive Games',
  'Dance Floor',
  'Inflatable Screen',
  'Entertainers',
  'Balloon Artists',
  'Party Catering',
]

export const WE_BRING_IMGS: string[] = [
  'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&q=80',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
  'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=500&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
]

export const FESTIVAL_ACCENT_MAP: Record<
  string,
  {
    bar: string
    badge: string
    badgeBg: string
    btn: string
    borderHover: string
    bgHover: string
    shadowHover: string
  }
> = {
  primary: {
    bar: 'bg-[var(--dt-primary)]',
    badge: 'text-[var(--dt-primary)]',
    badgeBg: 'bg-[var(--dt-primary-light)]',
    btn: 'bg-[var(--dt-primary)] border-[var(--dt-primary)]',
    borderHover: 'border-[var(--dt-primary)]',
    bgHover: 'bg-[var(--dt-primary-light)]',
    shadowHover: 'shadow-[0_12px_32px_rgba(29,127,229,0.15)]',
  },
  teal: {
    bar: 'bg-[var(--dt-teal)]',
    badge: 'text-[var(--dt-teal)]',
    badgeBg: 'bg-[var(--dt-teal-light)]',
    btn: 'bg-[var(--dt-teal)] border-[var(--dt-teal)]',
    borderHover: 'border-[var(--dt-teal)]',
    bgHover: 'bg-[var(--dt-teal-light)]',
    shadowHover: 'shadow-[0_12px_32px_rgba(0,196,154,0.15)]',
  },
  dark: {
    bar: 'bg-[var(--dt-dark)]',
    badge: 'text-[var(--dt-dark)]',
    badgeBg: 'bg-[var(--dt-primary-light)]',
    btn: 'bg-[var(--dt-dark)] border-[var(--dt-dark)]',
    borderHover: 'border-[var(--dt-dark)]',
    bgHover: 'bg-[var(--dt-primary-light)]',
    shadowHover: 'shadow-[0_12px_32px_rgba(15,31,61,0.15)]',
  },
  purple: {
    bar: 'bg-[#7c5cfc]',
    badge: 'text-[#7c5cfc]',
    badgeBg: 'bg-[#7c5cfc]/[0.12]',
    btn: 'bg-[#7c5cfc] border-[#7c5cfc]',
    borderHover: 'border-[#7c5cfc]',
    bgHover: 'bg-[#7c5cfc]/[0.05]',
    shadowHover: 'shadow-[0_12px_32px_rgba(124,92,252,0.15)]',
  },
}
