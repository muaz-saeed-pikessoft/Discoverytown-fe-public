import { CategoryCard, Highlight, Reason, Testimonial, FAQ } from './types'

export const categoryCards: CategoryCard[] = [
  {
    title: 'Play',
    description:
      'Drop-in sessions, private playtime, themed camps, and parents night out — designed for kids 1–12 to explore, climb, and create.',
    href: '/play',
    actionHref: '/book',
    actionLabel: 'Book Play',
    image: '/home/play.jpg',
    accentHex: '#0ea5a0',
  },
  {
    title: 'Cafe & Food',
    description:
      'Fresh meals, specialty drinks, and family favorites made in-house. Order at the counter, or get deliverys',
    href: '/cafeAndfood',
    actionHref: '/cafeAndfood',
    actionLabel: 'See Menu',
    image: '/home/cafeAndfood.jpeg',
    accentHex: '#0ea5a0',
  },
  {
    title: 'Events',
    description: 'Birthday parties, private venue hire, corporate family days, and mobile event setups. ',
    href: '/events',
    actionHref: '/book?service=events',
    actionLabel: 'Plan Event',
    image: '/home/event.jpeg',
    accentHex: '#0ea5a0',
  },
  {
    title: 'Learn & Gym',
    description:
      'Weekly classes and tutoring sessions. Build skills and stay active without leaving the family destination.',
    href: '/learn',
    actionHref: '/book?service=learn',
    actionLabel: 'Programs',
    image: '/home/gym.jpeg',
    accentHex: '#0ea5a0',
  },
]

export const highlights: Highlight[] = [
  { value: '8+', label: 'Things to do' },
  { value: 'Daily', label: 'Open 7 days a week' },
  { value: 'All ages', label: 'Kids 0–10 & parents' },
]

export const reasons: Reason[] = [
  {
    title: 'Everything in one place',
    body: 'Play, eat, learn, and celebrate without driving to multiple spots. Discovery Town is built for families who want a full day out.',
  },
  {
    title: 'Easy to book, easy to change',
    body: 'Reserve your spot online in under 2 minutes. Reschedule or cancel anytime — no phone calls, no hassle.',
  },
  {
    title: 'Built for parents too',
    body: 'Comfortable seating, fast Wi-Fi, great coffee, and full cafe service while your kids are having the time of their lives.',
  },
  {
    title: 'Memorable birthday parties',
    body: 'Private rooms, custom menus, party hosts, and décor packages. We do the work so you can actually enjoy the party.',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Mother of two, Dubai',
    quote:
      "We come here every Saturday now. The kids love the play area and I actually get to relax with a proper coffee. It's the best thing in our neighbourhood.",
    avatar: 'SM',
    color: '#0ea5a0',
  },
  {
    name: 'James R.',
    role: 'Father, Abu Dhabi',
    quote:
      "Booked a birthday party for my daughter's 6th. The team handled everything — decorations, cake, entertainment. Families were raving about it for weeks.",
    avatar: 'JR',
    color: '#7c3aed',
  },
  {
    name: 'Priya K.',
    role: 'Mother of three',
    quote:
      'The gym classes are brilliant. My son goes every Thursday and his confidence has completely changed. And the cafe food is genuinely good — not just convenient.',
    avatar: 'PK',
    color: '#e05c3a',
  },
]

export const faqs: FAQ[] = [
  {
    q: 'Do I need to book in advance?',
    a: 'Drop-in play is welcome when space is available, but we recommend booking online to guarantee your slot, especially on weekends.',
  },
  {
    q: 'What age groups is Discovery Town for?',
    a: 'Our play areas are designed for children aged 1–12. All cafe, event, and learning facilities are open to the whole family.',
  },
  {
    q: 'Can I host a private birthday party?',
    a: 'Yes — we have dedicated birthday rooms that can be booked for 2–4 hours. Packages include food, decorations, and a party host.',
  },
  {
    q: 'Is parking available?',
    a: 'Free parking is available on-site for all visitors. EV charging stations are also available in the main lot.',
  },
]
