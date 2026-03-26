import type {
  AddonCategoryItem,
  AddonGroup,
  NavSectionItem,
  PrivatePackageItem,
  VenuePackageItem,
  WeBringServiceItem,
} from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'packages', label: 'Packages' },
  { id: 'add-ons', label: 'Add-Ons' },
  { id: 'takeout-party', label: 'Take Out Party' },
  { id: 'we-bring-party', label: 'Party at your place' },
]

export const PRIVATE_PACKAGES: PrivatePackageItem[] = [
  {
    id: 'mini',
    name: 'The Mini-Play',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80',
    price: '$300',
    priceNote: null,
    accent: 'var(--dt-teal)',
    bg: 'var(--dt-teal-light)',
    border: 'var(--dt-border)',
    badge: null,
    children: 8,
    adults: 16,
    duration: '2 Hours',
    extraChild: '$15 / extra child',
    inclusions: [
      { text: 'Full general play admission for all guests' },
      { text: 'Party room setup & cleanup' },
      { text: 'Solid-color plates, napkins, cups, utensils & tablecloths' },
      { text: 'Ice water pitchers for all guests' },
      { text: 'Basic table covers' },
    ],
  },
  {
    id: 'classic',
    name: 'The Classic Fun',
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&q=80',
    price: '$425 – $495',
    priceNote: null,
    accent: 'var(--dt-primary)',
    bg: 'var(--dt-primary-light)',
    border: 'var(--dt-border)',
    badge: 'Most Popular',
    children: 12,
    adults: 24,
    duration: '2 Hours',
    extraChild: '$25 / extra child',
    inclusions: [
      { text: 'Full general play admission for all guests' },
      { text: 'Dedicated Party Host (light assistance & cleanup)' },
      { text: 'Basic solid-color paper products & utensils' },
      { text: 'Ice water pitchers + 1 juice box per child' },
      { text: 'Unlimited drip coffee & tea for adults' },
      { text: 'Basic table covers + "Happy Birthday" banner' },
    ],
  },
  {
    id: 'vip',
    name: 'The VIP Play',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80',
    price: '$675 – $795',
    priceNote: null,
    accent: 'var(--dt-teal-dark)',
    bg: 'var(--dt-teal-light)',
    border: 'var(--dt-border)',
    badge: 'Best Value',
    children: 18,
    adults: 36,
    duration: '2 Hours',
    extraChild: '$30 / extra child',
    inclusions: [
      { text: 'Full general play admission for all guests' },
      { text: 'Dedicated Party Host + Runner (full service & guest flow)' },
      { text: 'Basic solid-color paper products & utensils' },
      { text: 'Ice water pitchers + 1 juice box per child' },
      { text: 'Unlimited drip coffee & tea for adults' },
      { text: '2 Large 1-topping pizzas' },
      { text: 'Table covers + "Happy Birthday" banner + Digital invitations' },
    ],
  },
]

export const VENUE_PACKAGES: VenuePackageItem[] = [
  {
    id: 'midnight',
    name: 'The Midnight Play',
    price: '$2,095 – $2,395',
    deposit: '$500 non-refundable deposit required',
    accent: 'var(--dt-primary)',
    guests: 50,
    duration: '2.5 hrs + 30 min setup/cleanup',
    staff: '3 Dedicated Staff (Hosts/Baristas)',
    inclusions: [
      { text: 'Exclusive access to entire facility + 2 party rooms' },
      { text: 'Unlimited ice water & drip coffee/tea' },
      { text: 'Basic paper products & table covers (up to 50 guests)' },
      { text: 'Background music' },
    ],
  },
  {
    id: 'allstar',
    name: 'The All-Star Takeover',
    price: '$3,100 – $3,500',
    deposit: '$750 non-refundable deposit required',
    accent: 'var(--dt-teal-dark)',
    guests: 75,
    duration: '2.5 hrs + 30 min setup/cleanup',
    staff: '4 Dedicated Staff (Hosts/Baristas/Runner)',
    badge: 'Most Popular',
    inclusions: [
      { text: 'Exclusive access to entire facility + 2 party rooms' },
      { text: '4 Large 1-topping pizzas' },
      { text: 'Unlimited premium drink package (lemonade & iced tea)' },
      { text: 'Basic paper products & table covers (up to 75 guests)' },
      { text: 'Standard balloon garland (6 ft)' },
      { text: '2 Dozen custom cupcakes' },
      { text: 'Background music + basic staff-led group game' },
    ],
  },
  {
    id: 'ultimate',
    name: 'The Ultimate Exclusive',
    price: '$4,500 – $4,995',
    deposit: '$1,000 non-refundable deposit required',
    accent: 'var(--dt-dark)',
    guests: 100,
    duration: '3 hrs + 45 min setup/cleanup',
    staff: '5+ Dedicated Staff (Full team)',
    inclusions: [
      { text: 'Exclusive access to entire facility + 2 party rooms' },
      { text: 'Full premium catering package' },
      { text: 'Custom balloon installation (up to 15 ft)' },
      { text: 'Full AV setup with music & lighting' },
      { text: 'Dedicated event coordinator on-site' },
      { text: 'Digital invitations + custom signage' },
    ],
  },
]

// ─── Add-On Category Jump Cards ───────────────────────────────────────────────

export const ADDON_CATEGORY_CARDS: AddonCategoryItem[] = [
  {
    name: 'Food & Beverages',
    desc: 'Pizzas, drinks, appetizer trays and food upgrades for the whole party.',
    accent: 'amber',
    anchor: 'addon-food',
  },
  {
    name: 'Desserts & Sweets',
    desc: 'Cupcakes, donut walls, ice cream cups and make-your-own stations.',
    accent: 'primary',
    anchor: 'addon-desserts',
  },
  {
    name: 'Décor & Theme',
    desc: 'Balloon bouquets, themed paperware, backdrops and garlands.',
    accent: 'teal',
    anchor: 'addon-decor',
  },
  {
    name: 'Entertainment & Favors',
    desc: 'Goodie bags, characters, face painters and themed craft activities.',
    accent: 'dark',
    anchor: 'addon-entertainment',
  },
  {
    name: 'Time & Logistics',
    desc: 'Extra room time, additional hosts, extra child guests and grip socks.',
    accent: 'primary',
    anchor: 'addon-logistics',
  },
]

// ─── Add-On Groups (each with unique anchor for jump-to) ─────────────────────

export const ADDON_GROUPS: AddonGroup[] = [
  {
    title: 'Food & Beverages',
    anchor: 'addon-food',
    items: [
      { name: 'Pizza (1-Topping)', desc: 'Large 1-topping pizza, serves 8 slices.', price: '$22 – $28' },
      {
        name: 'Premium Pizza Toppings',
        desc: 'Gourmet upgrades: BBQ Chicken, specialty veggie.',
        price: '$5 – $7 / pizza',
      },
      { name: 'Adult Appetizer Tray', desc: 'Fresh fruit, veggie & dip, or cheese/cracker tray.', price: '$35 – $45' },
      { name: 'Snack Basket', desc: 'Chips, pretzels, or goldfish — serves 10 kids.', price: '$18 – $25' },
      { name: 'Premium Drink Package', desc: 'Lemonade & flavored iced tea for the group.', price: '$45 – $60' },
      { name: 'Specialty Coffee', desc: 'Drip coffee box with syrups and creamer.', price: '$35 – $50' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: '#FFF8EB',
    priceColor: '#B45309',
  },
  {
    title: 'Desserts & Sweets',
    anchor: 'addon-desserts',
    items: [
      {
        name: 'Custom Cupcakes',
        desc: 'Dozen custom-colored or themed cupcakes from a local bakery.',
        price: '$40 – $55',
      },
      { name: 'Gourmet Donut Wall', desc: 'Decorative donut wall rental with 2–3 dozen donuts.', price: '$55 – $75' },
      { name: 'Ice Cream Cups', desc: 'Individual premium ice cream cups or popsicles (per 12).', price: '$30 – $40' },
      {
        name: 'Make-Your-Own Station',
        desc: 'Cookie or cupcake decorating station with all supplies.',
        price: '$6 – $8 / child',
      },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-primary-light)',
    priceColor: 'var(--dt-primary)',
  },
  {
    title: 'Décor & Theme',
    anchor: 'addon-decor',
    items: [
      { name: 'Balloon Bouquet', desc: '6 helium balloons in 3 colors, tied to the table.', price: '$15 – $20' },
      {
        name: 'Themed Paperware',
        desc: 'Plates, napkins, cups to match a theme (Unicorns, Dinosaurs, etc).',
        price: '$30 – $40',
      },
      {
        name: 'Premium Backdrop',
        desc: 'Themed fabric or plastic backdrop for photos/cake table.',
        price: '$50 – $75',
      },
      { name: 'Standard Balloon Garland', desc: 'A 6-foot, 3-color air-filled balloon garland.', price: '$120 – $175' },
      {
        name: 'High Chair Banner',
        desc: '"ONE" or themed banner for the birthday child\'s high chair.',
        price: '$15 – $20',
      },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-teal-light)',
    priceColor: 'var(--dt-teal-dark)',
  },
  {
    title: 'Entertainment & Favors',
    anchor: 'addon-entertainment',
    items: [
      { name: 'Goodie Bags', desc: 'Pre-assembled bags with 3–4 simple toys/treats.', price: '$5 – $7 / child' },
      {
        name: 'Themed Craft Activity',
        desc: '30-minute staff-led craft (coloring, painting, bracelet making).',
        price: '$50 – $75 + $3/child',
      },
      { name: 'Face Painter / Balloon Artist', desc: '1 hour professional service.', price: '$150 – $200' },
      {
        name: 'Character Appearance',
        desc: 'Costumed character (Princess, Superhero, Mascot) for 30 minutes.',
        price: '$125 – $175',
      },
      { name: 'Digital Invitations', desc: 'Professionally designed, customizable digital file.', price: '$25 – $35' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-teal-light)',
    priceColor: 'var(--dt-teal-dark)',
  },
  {
    title: 'Time & Logistics',
    anchor: 'addon-logistics',
    items: [
      { name: 'Additional 30 Minutes', desc: 'Extends the private room time slot.', price: '$75 – $100' },
      { name: 'Additional Party Host', desc: 'Extra host for larger or more involved parties.', price: '$50 – $65' },
      { name: 'Extra Child Guest', desc: 'Per child over the package limit.', price: '$15 – $20 / child' },
      { name: 'Branded Grip Socks', desc: 'Non-slip socks for children and/or adults.', price: '$3 – $4 / pair' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-bg-page)',
    priceColor: 'var(--dt-text-muted)',
  },
]

// ─── Takeout Category Jump Cards ─────────────────────────────────────────────

export const TAKEOUT_CATEGORY_CARDS: AddonCategoryItem[] = [
  {
    name: 'Food & Beverages',
    desc: 'Pizzas, drinks, appetizer trays and snacks — ready to go.',
    accent: 'amber',
    anchor: 'takeout-food',
  },
  {
    name: 'Desserts & Sweets',
    desc: 'Cupcakes, donut boxes, ice cream packs and cookie kits.',
    accent: 'primary',
    anchor: 'takeout-desserts',
  },
  {
    name: 'Décor & Supplies',
    desc: 'Balloon bouquets, themed paperware, and garland kits to go.',
    accent: 'teal',
    anchor: 'takeout-decor',
  },
  {
    name: 'Extras & Favors',
    desc: 'Pre-filled goodie bags, digital invitations, and grip socks.',
    accent: 'dark',
    anchor: 'takeout-extras',
  },
]

export const TAKEOUT_GROUPS: AddonGroup[] = [
  {
    title: 'Food & Beverages',
    anchor: 'takeout-food',
    items: [
      { name: 'Pizza Box (1-Topping)', desc: 'Large pizza, ready to go.', price: '$22 – $28' },
      {
        name: 'Premium Pizza Toppings',
        desc: 'Gourmet upgrades: BBQ Chicken, specialty veggie.',
        price: '$5 – $7 / pizza',
      },
      { name: 'Adult Appetizer Tray', desc: 'Fresh fruit, veggie & dip, or cheese/cracker tray.', price: '$35 – $45' },
      { name: 'Snack Basket', desc: 'Chips, pretzels, or goldfish — serves 10 kids.', price: '$18 – $25' },
      { name: 'Premium Drink Package', desc: 'Lemonade & flavored iced tea, bottled to go.', price: '$45 – $60' },
      { name: 'Specialty Coffee Box', desc: 'Drip coffee box with syrups and creamer.', price: '$35 – $50' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: '#FFF8EB',
    priceColor: '#B45309',
  },
  {
    title: 'Desserts & Sweets',
    anchor: 'takeout-desserts',
    items: [
      { name: 'Cupcake Box (Dozen)', desc: 'Custom-colored or themed cupcakes, boxed.', price: '$40 – $55' },
      { name: 'Donut Box', desc: '1–2 dozen donuts, glazed or specialty flavors.', price: '$30 – $45' },
      { name: 'Ice Cream Cup Pack', desc: 'Individual premium ice cream cups (per 12).', price: '$30 – $40' },
      {
        name: 'Cookie Decorating Kit',
        desc: 'Pre-baked cookies + icing + sprinkles to decorate at home.',
        price: '$6 – $8 / child',
      },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-primary-light)',
    priceColor: 'var(--dt-primary)',
  },
  {
    title: 'Décor & Supplies',
    anchor: 'takeout-decor',
    items: [
      { name: 'Balloon Bouquet (To Go)', desc: '6 helium balloons, tied and ready to take.', price: '$15 – $20' },
      { name: 'Themed Paperware Pack', desc: 'Plates, napkins, and cups for your theme.', price: '$30 – $40' },
      { name: 'Balloon Garland Kit', desc: 'DIY 6 ft balloon garland kit with instructions.', price: '$55 – $85' },
      { name: 'High Chair Banner', desc: '"ONE" or themed banner, pre-assembled.', price: '$15 – $20' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-teal-light)',
    priceColor: 'var(--dt-teal-dark)',
  },
  {
    title: 'Extras & Favors',
    anchor: 'takeout-extras',
    items: [
      {
        name: 'Goodie Bags (Pre-filled)',
        desc: '3–4 toys/treats per bag, ready to hand out.',
        price: '$5 – $7 / child',
      },
      { name: 'Digital Invitations', desc: 'Customizable digital file sent same day.', price: '$25 – $35' },
      { name: 'Branded Grip Socks', desc: 'Non-slip socks for children and/or adults.', price: '$3 – $4 / pair' },
    ],
    border: 'var(--dt-border)',
    bg: 'var(--dt-bg-card)',
    priceBg: 'var(--dt-teal-light)',
    priceColor: 'var(--dt-teal-dark)',
  },
]

export const WE_BRING_SERVICES: WeBringServiceItem[] = [
  { name: 'Inflatables', desc: 'Bounce houses, slides, and obstacle courses delivered and set up at your venue.' },
  { name: 'Train Rides', desc: 'A fan-favorite mini train for kids — great for outdoor parties and events.' },
  { name: 'Interactive Games', desc: 'Giant Jenga, bean bag toss, lawn games, and more for all ages.' },
  { name: 'Interactive Dance Floor', desc: 'LED dance floor with music for a fun, high-energy experience.' },
  {
    name: 'Inflatable Screen & AV',
    desc: 'Outdoor movie nights or presentations with a giant inflatable screen and sound system.',
  },
  { name: 'Entertainers & Characters', desc: 'Costumed characters, magicians, face painters, and balloon artists.' },
  { name: 'Balloon Artists', desc: 'Professional balloon twisting and decorations on-site.' },
  {
    name: 'Party Setup & Catering',
    desc: 'Full event setup, decor installation, and cafe catering brought to your location.',
  },
]

export const WE_BRING_IMAGES: Record<string, string> = {
  Inflatables: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&q=80',
  'Train Rides': 'https://images.unsplash.com/photo-1599605960360-54b1d5f9f4ea?w=900&q=80',
  'Interactive Games': 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=900&q=80',
  'Interactive Dance Floor': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=80',
  'Inflatable Screen & AV': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=80',
  'Entertainers & Characters': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&q=80',
  'Balloon Artists': 'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=900&q=80',
  'Party Setup & Catering': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80',
}

export const TAKEOUT_IMAGE = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80'
