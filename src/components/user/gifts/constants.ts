import type { AlacarteGroup, GiftCollectionSection, HeroPill, InfoCard, NavSectionItem, PolicyCard } from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'gift-boxes', label: 'Gift Boxes' },
  { id: 'a-la-carte', label: 'À La Carte' },
  { id: 'delivery', label: 'Delivery Info' },
]

export const GOURMET_GIFTS = [
  {
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80',
    name: 'The Farm-to-Table Feast',
    price: '$85 – $120',
    occasion: 'Housewarming · Thank You · Hostess Gift',
    color: { bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7', accent: '#0CA678' },
    contents: [
      "Selection of the season's freshest fruits",
      'Specialty cheese and crackers array',
      'Small bottle of artisanal olive oil',
      'Two curated unique spices for kitchen experimentation',
      'Fresh, crusty baguette',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80',
    name: 'The Sweet Decadence Box',
    price: '$70 – $100',
    occasion: 'Anniversaries · Romantic Gestures · Sweet Cravings',
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    badge: 'Best Seller',
    contents: [
      'A dozen chocolate-covered strawberries',
      'Selection of high-end gourmet chocolate bars',
      'One custom specialty baked good (e.g., mini bundt cake)',
      'Large bag of gourmet savory or sweet popcorn',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80',
    name: 'The Café Comfort Kit',
    price: '$45 – $65',
    occasion: 'Teacher Gifts · Office Appreciation · Pick-Me-Up',
    color: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', accent: '#D97706' },
    contents: [
      'Branded café mug',
      'Bag of gourmet coffee beans or premium specialty tea',
      'One large café-baked good',
      'Voucher for one specialty non-alcoholic drink on next visit',
    ],
  },
]

export const FAMILY_GIFTS = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    name: 'The Ultimate Party Drop',
    price: '$90 – $130',
    occasion: 'Birthdays · Milestones · School Achievements',
    color: { bg: '#F3F0FF', text: '#7950F2', border: '#D0BFFF', accent: '#7950F2' },
    badge: 'Fan Favorite',
    contents: [
      'Celebratory large balloon bouquet',
      'Fun variety of curated candy',
      'High-quality, age-appropriate book',
      'Voucher for a family pass (5 entries) to play at the café',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    name: 'Family Movie Night Cozy',
    price: '$150 – $220',
    occasion: "Christmas · New Year's Eve · Family Bonding Weekends",
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    contents: [
      'Matching soft pajamas for the whole family (sizes at checkout)',
      'Coordinating fun socks for the whole family',
      'Large bag of gourmet popcorn',
      'Large assortment of curated candy favorites',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
    name: "The Little Chef's Set",
    price: '$75 – $110',
    occasion: 'Educational Gifts · Sibling Presents · Rainy Day Fun',
    color: { bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF', accent: '#4C6EF5' },
    contents: [
      'Child-safe kitchen gadget (small mixer or chopper)',
      'Child-sized apron',
      'Two fun aromatic spices (cinnamon and nutmeg)',
      'Beginner recipe book',
      'Two signature café baked goods',
    ],
  },
]

export const WELLNESS_GIFTS = [
  {
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=80',
    name: 'The Serenity Spa Basket',
    price: '$110 – $160',
    occasion: "Mother's Day · Get Well Soon · New Parents",
    color: { bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7', accent: '#0CA678' },
    contents: [
      'High-end shampoos and soaps',
      'Luxurious moisturizing lotions',
      'Calming scented candle',
      'Stress-relief health product (bath salts or weighted eye mask)',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    name: 'The Beauty Bloom Basket',
    price: '$95 – $140',
    occasion: "Valentine's Day · Anniversaries · Personal Pampering",
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    badge: 'Most Gifted',
    contents: [
      'Beautiful arrangement of seasonal fresh flowers',
      'Small sample vial of fine perfume',
      'High-quality pampering beauty item (face mask set or serum)',
      'Unique piece of affordable local jewelry',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    name: 'The Weekend Retreat Box',
    price: '$70 – $95',
    occasion: 'Relaxation · Sympathy · Birthday for Book Lovers',
    color: { bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF', accent: '#4C6EF5' },
    contents: [
      'Highly-rated paperback book',
      'Cozy pair of adult novelty socks',
      'Premium loose-leaf tea or artisanal non-alcoholic sparkling beverage',
      'Soothing scented candle',
    ],
  },
]

export const LUXURY_GIFTS = [
  {
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    name: 'The Grand Deluxe Basket',
    price: '$180 – $250+',
    occasion: 'Major Anniversaries · Corporate Gifts · Milestones',
    color: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', accent: '#D97706' },
    badge: 'Premium',
    contents: [
      'Magnificent flower arrangement',
      'Gourmet chocolate assortment box',
      'Bottle of premium non-alcoholic sparkling specialty drink',
      'Unique piece of artisan jewelry',
      'High-value voucher: $50 off a café birthday party booking',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1533421821268-87e4242d5fec?w=600&q=80',
    name: 'The Golden Family Legacy Basket',
    price: '$220 – $350',
    occasion: "1st Anniversary · Baby's First Birthday · Corporate Family Gift",
    color: { bg: '#F3F0FF', text: '#7950F2', border: '#D0BFFF', accent: '#7950F2' },
    badge: 'Heirloom',
    highlight: 'Emphasizes lasting keepsakes and the exclusive experience of having the café to themselves.',
    contents: [
      'Personalized hand-painted wooden memory box (initials engraved)',
      'High-end coffee table book (family life or interior design)',
      'Pajamas for the parents (premium silk or organic cotton)',
      'Exclusive regional olive oil and curated spices',
      'Voucher: 1 Hour of Private Café Rental Time after hours',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?w=600&q=80',
    name: 'The Ultimate Pamper & Play Package',
    price: '$200 – $300',
    occasion: "New Parents · Getaway Surprise · Mother's/Father's Day Upgrade",
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    badge: 'Most Unique',
    highlight: 'This basket delivers the ultimate luxury: free time for the parents.',
    contents: [
      'Elaborate selection of natural bath products (shampoos, soaps, lotions)',
      'High-end designer scented candle + ultrasonic aromatherapy diffuser',
      'Bottle of premium non-alcoholic sparkling beverage',
      'Set of premium socks for the whole family',
      "CENTERPIECE: Voucher for a 3-Hour Parents' Night Out Drop-Off Service (fully paid)",
    ],
  },
]

// ─── À La Carte ───────────────────────────────────────────────────────────────
export const ALACARTE_TREATS = [
  {
    name: 'Deluxe Decorated Sugar Cookie',
    desc: 'Large signature cookie hand-decorated for the occasion (Birthday, Thank You, Baby).',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80',
  },
  {
    name: 'Gourmet Dipped Pretzel Rods (3-Pack)',
    desc: 'Three jumbo pretzel rods drenched in high-quality chocolate with colorful sprinkles.',
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
  },
  {
    name: 'Hot Chocolate Bomb',
    desc: 'One chocolate sphere filled with cocoa mix and marshmallows — melts in hot milk.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
  },
  {
    name: 'Signature Coffee Sample',
    desc: '4oz bag of our popular house-blend coffee beans. A taste of the café at home!',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
  },
]

export const ALACARTE_DECOR = [
  {
    name: 'Giant Mylar Balloon (Themed)',
    desc: 'Huge helium foil balloon — Happy Birthday, Heart, or Congratulations. Major visual impact.',
    price: '$7.00',
    image: 'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=600&q=80',
  },
  {
    name: 'Trio of Color Balloons',
    desc: 'Three helium latex balloons color-coordinated to match your selected basket.',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
  },
  {
    name: 'Sprinkles & Confetti Shaker',
    desc: 'A small jar of gourmet colorful sprinkles or novelty paper confetti.',
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
  },
]

export const ALACARTE_VOUCHERS = [
  {
    name: 'Bonus Open Play Pass',
    desc: "One extra voucher for a child's admission to our play café. Pure, immediate fun.",
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
  },
  {
    name: 'Free Smoothie/Snack Voucher',
    desc: "Redeemable for one kid's gourmet smoothie or specialty snack on their next visit.",
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
]

// ─── Delivery Zones ───────────────────────────────────────────────────────────
export const DELIVERY_ZONES = [
  {
    zone: 'Zone 1',
    label: 'Local Standard',
    radius: '0 – 5 miles',
    area: 'Central Carmel',
    fee: '$10.00',
    color: '#0CA678',
    bg: 'var(--dt-mint-soft)',
    border: '#96F2D7',
  },
  {
    zone: 'Zone 2',
    label: 'Extended Local',
    radius: '6 – 10 miles',
    area: 'Westfield, Fishers, North Indianapolis',
    fee: '$15.00',
    color: '#4C6EF5',
    bg: '#F0F4FF',
    border: '#C5D0FF',
  },
  {
    zone: 'Zone 3',
    label: 'Outer Service Area',
    radius: '11 – 15 miles',
    area: 'Farther Indianapolis, Noblesville',
    fee: '$20.00',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
]

export const HERO_PILLS: HeroPill[] = [
  { label: 'Best Sellers', bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0' },
  { label: 'For Kids', bg: '#F3F0FF', text: '#7950F2', border: '#D0BFFF' },
  { label: 'For Parents', bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  { label: 'Full Experiences', bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF' },
]

export const GIFT_COLLECTIONS: GiftCollectionSection[] = [
  {
    id: 'gourmet',
    eyebrow: 'Gourmet Collection',
    title: 'Treats & Taste',
    desc: 'Perfect for hosts, food lovers, and anyone who appreciates an elevated snacking experience.',
    gifts: GOURMET_GIFTS,
  },
  {
    id: 'family',
    eyebrow: 'Family Fun Collection',
    title: 'Play & Bonding',
    desc: 'Curated to celebrate children and family time, integrating play with delightful treats.',
    gifts: FAMILY_GIFTS,
  },
  {
    id: 'wellness',
    eyebrow: 'Wellness & Comfort Collection',
    title: 'Self-Care & Relaxation',
    desc: 'Luxurious self-care and relaxation gifts focused on the adult market.',
    gifts: WELLNESS_GIFTS,
  },
  {
    id: 'luxury',
    eyebrow: 'Luxury Celebration',
    title: 'Grand Gestures',
    desc: 'Your premium tier - designed for major events, corporate gifting, and the biggest moments in life.',
    gifts: LUXURY_GIFTS,
  },
]

export const ALACARTE_GROUPS: AlacarteGroup[] = [
  {
    title: 'Treats & Cafe Sweetness',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80',
    items: ALACARTE_TREATS,
    border: '#FDE68A',
    bg: '#FFFBEB50',
    text: '#D97706',
  },
  {
    title: 'Decorations & Visual Impact',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
    items: ALACARTE_DECOR,
    border: '#FFD0D0',
    bg: 'var(--dt-coral-soft)50',
    text: 'var(--dt-coral)',
  },
  {
    title: 'The Gift That Keeps Giving - Vouchers',
    image: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?w=600&q=80',
    items: ALACARTE_VOUCHERS,
    border: '#96F2D7',
    bg: 'var(--dt-mint-soft)50',
    text: '#0CA678',
  },
]

export const DELIVERY_INFO_CARDS: InfoCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    title: 'Delivery Schedule',
    rows: [
      'Monday - Friday only. No guaranteed weekend deliveries at this time.',
      'Cut-off time: 10:00 AM EST for potential same-day delivery.',
      'Orders after 10 AM are delivered the next business day.',
      'Delivery window: 1:00 PM - 5:00 PM EST on the scheduled day.',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&q=80',
    title: 'Special Handling Options',
    rows: [
      'Timed Priority Delivery: +$10 to guarantee a 2-hour window (e.g., 1-3 PM).',
      'Specific Date Reservation: Select a future date at checkout. Must be finalized at least 48 hrs in advance.',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    title: 'Recipient Contact Policy',
    rows: [
      'We call the recipient ~15 minutes before arrival to confirm availability.',
      'Perishable items (Gourmet Collection) will NOT be left unattended without written permission.',
      'If delivery fails (wrong address, unavailable recipient), the item returns to the cafe.',
      'Re-delivery fee equals the original delivery fee. Failed deliveries are non-refundable.',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80',
    title: 'Delivery Area Note',
    rows: [
      'We currently serve up to 15 miles from our Carmel, Indiana location.',
      'Deliveries outside Zone 3 are not available at this time to maintain quality control.',
      "Zone boundaries are applied automatically at checkout based on the recipient's ZIP code.",
    ],
  },
]

export const POLICY_CARDS: PolicyCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    title: 'Cancellation & Modification',
    color: 'var(--dt-coral)',
    rows: [
      'Standard Baskets (Family Fun, Wellness & Comfort): Cancel or modify at least 24 hours before delivery. Full refund minus $5.00 admin fee.',
      'Gourmet & Luxury Baskets (Perishable Focus): Cancel or modify at least 48 hours before delivery. Full refund minus $10.00 admin fee.',
      "Late Cancellations: Requests received after the cut-off cannot guarantee a refund, as ingredients may already be prepared. Partial refunds are at management's discretion.",
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    title: 'Refund Eligibility',
    color: '#0CA678',
    rows: [
      "Product Damage or Defects: Photographic evidence must be provided within 4 hours of delivery. We'll offer a full replacement or full refund.",
      "Delivery Error (Our Fault): If delivered to the wrong address due to our error, we'll resend immediately or issue a full refund.",
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    title: 'Non-Refundable Circumstances',
    color: '#D97706',
    rows: [
      'Recipient Refusal: If the recipient refuses delivery for any reason.',
      'Taste or Preference: We cannot refund based on personal preference (e.g., "didn\'t like the coffee blend").',
      'Failed Delivery Due to Sender Error: Incorrect address or recipient unavailable - re-delivery fee applies. Original cost is non-refundable.',
      'Minor Substitutions: Seasonal availability may require equal-or-greater-value substitutions. No refunds for necessary substitutions.',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    title: 'How to Request a Refund or Cancellation',
    color: '#4C6EF5',
    rows: [
      'Submit all requests via email to our cafe email address or by calling during business hours.',
      "Please include: your original order number, the recipient's name, and reason for the request.",
      'Our team will respond within 1 business day to confirm your request.',
    ],
  },
]
