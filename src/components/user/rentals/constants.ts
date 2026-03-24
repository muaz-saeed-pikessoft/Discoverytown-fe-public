import type { HeroPill, NavSectionItem, RentalSectionMeta } from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'inflatables', label: 'Inflatables' },
  { id: 'trains', label: 'Trains & Rides' },
  { id: 'interactive', label: 'Interactive Play' },
  { id: 'party-setup', label: 'Party Setup' },
  { id: 'party-supply', label: 'Party Supply' },
  { id: 'food-drinks', label: 'Food & Drinks' },
  { id: 'entertainers', label: 'Entertainers' },
  { id: 'party-staff', label: 'Party Staff' },
  { id: 'venue', label: 'Venue' },
  { id: 'av-lighting', label: 'AV & Lighting' },
  { id: 'invitations', label: 'Invitations' },
  { id: 'photo-video', label: 'Photo & Video' },
  { id: 'concessions', label: 'Concessions' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────

export const INFLATABLES = [
  {
    name: 'Standard Bounce House',
    desc: 'Classic open bounce house. Perfect for ages 2–10. Fits up to 6 kids at a time.',
    price: '$150 – $200 / day',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80',
    badge: null,
  },
  {
    name: 'Combo Bounce & Slide',
    desc: 'Bouncer with an attached slide for added excitement. Great for backyard parties.',
    price: '$225 – $275 / day',
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&q=80',
    badge: 'Popular',
  },
  {
    name: 'Water Slide Inflatable',
    desc: 'Giant wet slide for summer events. Requires water hookup. Ages 5+.',
    price: '$275 – $350 / day',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
    badge: 'Seasonal',
  },
  {
    name: 'Obstacle Course',
    desc: 'Full inflatable obstacle course with tunnels, climbs, and a slide exit. Great for competitive group fun.',
    price: '$350 – $450 / day',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&q=80',
    badge: null,
  },
  {
    name: 'Toddler Bounce Zone',
    desc: 'Smaller, softer inflatable designed specifically for toddlers ages 1–4. Lower walls and gentle features.',
    price: '$125 – $150 / day',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
    badge: null,
  },
  {
    name: 'Inflatable Movie Screen',
    desc: '16-ft inflatable screen for outdoor movie nights. Projector and speakers available as add-on.',
    price: '$100 – $150 / day',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    badge: null,
  },
]

export const TRAINS = [
  {
    name: 'Mini Trackless Train',
    desc: 'A fan-favorite ride-along train for kids. Loops around your event space. Fits 10–12 riders per trip.',
    price: '$300 – $400 / 4 hrs',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80',
    badge: 'Fan Favorite',
  },
  {
    name: 'Pony Ride / Mechanical Horse',
    desc: 'Motorized ride-on horse for young children. Safe, gentle, and endlessly entertaining.',
    price: '$150 – $200 / 4 hrs',
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80',
    badge: null,
  },
  {
    name: 'Mechanical Bull (Junior)',
    desc: 'Slow-speed, padded mechanical bull for older kids and adventurous adults. Includes safety mat.',
    price: '$250 – $350 / 4 hrs',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&q=80',
    badge: null,
  },
  {
    name: 'Carousel / Spinning Ride',
    desc: 'Classic kiddie carousel with seating for 6–8 children. Gentle spinning motion for toddlers and up.',
    price: '$200 – $275 / 4 hrs',
    image: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=400&q=80',
    badge: null,
  },
]

export const INTERACTIVE = [
  {
    name: 'Interactive Dance Floor',
    desc: 'LED light-up tiles that respond to movement and music. Kids love it — adults love it more.',
    price: '$400 – $550 / event',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
    badge: 'Showstopper',
  },
  {
    name: 'Interactive Climbing Wall',
    desc: 'Light-reactive climbing wall with colored hold targets. Kids race to hit the lights — disguised cardio!',
    price: '$300 – $400 / day',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80',
    badge: null,
  },
  {
    name: 'Giant Lawn Games Bundle',
    desc: 'Jumbo Jenga, Cornhole, Giant Connect Four, Ladder Toss, and Ring Toss. Includes all equipment.',
    price: '$100 – $150 / day',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80',
    badge: null,
  },
  {
    name: 'Arcade Game Stations',
    desc: 'Portable arcade cabinets (2–4 units). Classic games like Pac-Man, Air Hockey, and Skee-Ball.',
    price: '$150 – $250 / day',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80',
    badge: null,
  },
  {
    name: 'Virtual Reality Station',
    desc: 'VR headset and controller setup for immersive experiences. 1 station, attendant included.',
    price: '$200 – $300 / 4 hrs',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    badge: null,
  },
  {
    name: 'Photo Booth (Digital)',
    desc: 'Self-serve digital photo booth with props, filters, and instant prints or digital sharing.',
    price: '$250 – $350 / event',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
    badge: null,
  },
]

export const PARTY_SETUP = [
  {
    name: 'Folding Tables (6 ft)',
    desc: 'Sturdy folding banquet tables. Priced per table.',
    price: '$8 – $12 / table',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Folding Chairs',
    desc: 'White or black folding chairs. Priced per chair.',
    price: '$2 – $3 / chair',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Round Banquet Tables',
    desc: 'Seats 8–10 guests. Ideal for dinner-style event layouts.',
    price: '$15 – $20 / table',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
  {
    name: 'Pop-Up Canopy Tent (10x10)',
    desc: 'Weather-resistant pop-up tent with side walls optional.',
    price: '$60 – $80 / tent / day',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
  {
    name: 'Frame Tent (20x20)',
    desc: 'Large event tent for outdoor gatherings. Includes setup and breakdown.',
    price: '$300 – $450 / event',
    image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=400&q=80',
  },
  {
    name: 'Portable Restroom Unit',
    desc: 'Single-unit portable restroom for outdoor events. Includes cleaning and setup.',
    price: '$150 – $250 / event',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  },
  {
    name: 'Coolers (Large)',
    desc: '60-quart rolling coolers, pre-cleaned. Priced per unit.',
    price: '$15 – $25 / cooler',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  },
  {
    name: 'Trash & Recycling Stations',
    desc: 'Matching trash and recycling bins with bags and signage.',
    price: '$20 – $35 / set',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Stage / Platform Riser',
    desc: '8x8 ft modular stage platform, 12–18 inches high. Great for performances or ceremonies.',
    price: '$150 – $250 / event',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
]

export const PARTY_SUPPLY = [
  {
    name: 'Solid-Color Tableware Set',
    desc: 'Plates, napkins, cups, and utensils in your choice of color. Priced per 25-guest bundle.',
    price: '$20 – $30 / bundle',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
  },
  {
    name: 'Themed Tableware Set',
    desc: 'Plates, napkins, and cups matching a specific theme (Unicorn, Dinosaur, Space, etc.).',
    price: '$35 – $50 / bundle',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
  },
  {
    name: 'Linen Tablecloths (6 ft)',
    desc: 'Polyester tablecloths in white, black, or solid colors. Laundered and pressed.',
    price: '$8 – $12 / cloth',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Linen Tablecloths (Round)',
    desc: 'Full-length round table linens for banquet rounds. Multiple colors available.',
    price: '$10 – $15 / cloth',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
  {
    name: 'Balloon Bouquet (6-pack)',
    desc: '6 latex or foil helium balloons in your chosen color scheme, tied and ready.',
    price: '$15 – $20 / bouquet',
    image: 'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=400&q=80',
  },
  {
    name: 'Balloon Garland (6 ft)',
    desc: 'Air-filled balloon garland, 3-color palette. Includes mounting strip.',
    price: '$85 – $120 / garland',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
  {
    name: 'Balloon Garland (10 ft)',
    desc: 'Premium large-format balloon garland with custom color matching.',
    price: '$150 – $200 / garland',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
  {
    name: '"Happy Birthday" Banner Kit',
    desc: 'Reusable banner with ribbon and hanging hardware. Standard or custom text.',
    price: '$15 – $25',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
  {
    name: 'Centerpiece Bundle',
    desc: 'Table centerpieces — balloon bouquet, floral, or themed. Priced per 5-table set.',
    price: '$60 – $100 / set',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
  },
]

export const FOOD_DRINKS = [
  {
    name: 'Pizza Package (per box)',
    desc: 'Large 1-topping pizzas, boxed and ready. Minimum order: 2 boxes.',
    price: '$22 – $28 / box',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  },
  {
    name: 'Snack Basket (serves 10)',
    desc: 'Individual bags of chips, pretzels, goldfish, and granola bars.',
    price: '$18 – $25 / basket',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
  {
    name: 'Fruit & Veggie Tray',
    desc: 'Fresh-cut seasonal fruit or veggie & dip tray. Serves 10–15 guests.',
    price: '$35 – $45 / tray',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&q=80',
  },
  {
    name: 'Cheese & Charcuterie Board',
    desc: 'Curated board with cheeses, meats, crackers, and accompaniments. Serves 12–15.',
    price: '$55 – $75 / board',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
  {
    name: 'Lemonade Dispenser (1 gal)',
    desc: 'Fresh-squeezed lemonade in a decorative dispenser with cups and ice.',
    price: '$25 – $35 / gallon',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  },
  {
    name: 'Coffee Catering Box',
    desc: 'Drip coffee box with cups, lids, cream, sugar, and stirrers. Serves 12.',
    price: '$30 – $45 / box',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  },
  {
    name: 'Cupcake Box (Dozen)',
    desc: 'Custom-colored or themed cupcakes from a local bakery.',
    price: '$40 – $55 / dozen',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80',
  },
  {
    name: 'Specialty Drink Station',
    desc: 'Lemonade, iced tea, and infused water station with dispenser and cups. Serves up to 50.',
    price: '$65 – $85 / station',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
  },
]

export const ENTERTAINERS = [
  {
    name: 'Costumed Character (Licensed Theme)',
    desc: 'Princess, Superhero, or Mascot character appearance. In-venue events only. Minimum 2-hour booking.',
    price: '$125 / hr (2 hr min) · $175 for 1 hr · $30 travel fee',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
    badge: 'In-Venue Only',
  },
  {
    name: 'Mascot Costume Rental',
    desc: 'Rent a mascot costume for your own character to wear. Includes full costume and accessories.',
    price: '$75 – $125 / day',
    image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&q=80',
    badge: null,
  },
  {
    name: 'Face Painter',
    desc: '1-hour professional face painting service. Designs for all ages.',
    price: '$150 – $200 / hr',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80',
    badge: null,
  },
  {
    name: 'Balloon Artist / Twister',
    desc: 'Professional balloon twisting — animals, hats, swords, and more. Great for crowd flow.',
    price: '$150 – $200 / hr',
    image: 'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=400&q=80',
    badge: null,
  },
  {
    name: 'Magician',
    desc: 'Close-up or stage magic show tailored for children and family audiences. 30–60 min set.',
    price: '$175 – $275 / show',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
    badge: null,
  },
  {
    name: 'Stilt Walker / Juggler',
    desc: 'Roaming entertainer for outdoor festivals and large events. 2-hour minimum.',
    price: '$200 – $275 / 2 hrs',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80',
    badge: null,
  },
  {
    name: 'Caricature Artist',
    desc: 'Live caricature sketches — digital or on paper. Great for corporate events and parties.',
    price: '$175 – $225 / 2 hrs',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
    badge: null,
  },
  {
    name: 'DJ / Music Service',
    desc: 'Professional DJ with speaker setup, microphone, and playlist coordination for your event.',
    price: '$300 – $500 / event',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
    badge: null,
  },
]

export const PARTY_STAFF = [
  {
    name: 'Party Host',
    desc: 'A dedicated staff member to manage guest flow, run activities, and assist with setup/cleanup.',
    price: '$25 – $35 / hr (3 hr min)',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Event Coordinator',
    desc: 'Senior staff member who oversees the full event timeline, vendor coordination, and logistics.',
    price: '$45 – $65 / hr (4 hr min)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    name: 'Café Barista (On-Site)',
    desc: 'On-site barista to manage the coffee and drink station for your event.',
    price: '$30 – $40 / hr (3 hr min)',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  },
  {
    name: 'Activity Facilitator',
    desc: 'Dedicated staff to run crafts, games, or structured activities for children during the event.',
    price: '$25 – $35 / hr (2 hr min)',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
  },
  {
    name: 'Security / Crowd Management',
    desc: 'Uniformed staff for larger events requiring entry management or crowd flow assistance.',
    price: '$35 – $50 / hr (4 hr min)',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
]

export const VENUES = [
  {
    name: 'Party Room (Standard)',
    desc: 'Private party room rental only — no open play access included. Ideal for meetings, workshops, or small gatherings.',
    price: '$75 – $100 / hr',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
    badge: null,
  },
  {
    name: 'Full Venue Buyout',
    desc: 'Exclusive access to all of DiscoveryTown — play areas, both party rooms, café space, and gym. Up to 100 guests.',
    price: 'Starting at $2,095',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
    badge: 'Full Exclusive',
  },
  {
    name: 'Meeting Room (Single)',
    desc: 'Professional meeting room for corporate or community use. Seats 8–12. AV available on request.',
    price: '$50 – $75 / hr',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    badge: null,
  },
  {
    name: 'Meeting Room (Multiple)',
    desc: 'Rent multiple meeting rooms simultaneously for breakout sessions or larger conferences.',
    price: 'Contact for quote',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    badge: null,
  },
  {
    name: 'Gym Space Rental',
    desc: 'Rent the gym floor for private fitness sessions, team practice, or group classes. Off-hours only.',
    price: '$80 – $120 / hr',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    badge: null,
  },
  {
    name: 'Outdoor Area (If Available)',
    desc: 'Adjacent outdoor space for tented events, inflatables, or overflow seating.',
    price: 'Contact for quote',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80',
    badge: null,
  },
]

export const AV = [
  {
    name: 'PA Speaker System (Portable)',
    desc: 'Bluetooth-enabled portable PA speaker with microphone. Great for speeches and background music.',
    price: '$50 – $75 / event',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
  },
  {
    name: 'Full PA System (Large Event)',
    desc: 'Powered speakers, subwoofer, mixer, and 2 wireless microphones. Technician included.',
    price: '$250 – $400 / event',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
  },
  {
    name: 'Projector & Screen (Indoor)',
    desc: '4K projector with 100" screen and HDMI connectivity. Perfect for slideshows or movie screenings.',
    price: '$75 – $120 / event',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
  },
  {
    name: 'Inflatable Movie Screen (16 ft)',
    desc: 'Outdoor inflatable screen with projector and sound system. Requires open outdoor space.',
    price: '$150 – $225 / event',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
  },
  {
    name: 'LED String Lights',
    desc: '50 ft warm LED string lights for ambient event lighting. Indoor/outdoor safe.',
    price: '$25 – $40 / strand',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
  {
    name: 'LED Uplighting (Set of 8)',
    desc: "Color-programmable LED uplights to transform a room's atmosphere. Any color, wireless.",
    price: '$120 – $175 / set',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
  },
  {
    name: 'Neon / LED Sign Rental',
    desc: 'Custom or pre-made neon-style LED signs. "Happy Birthday," names, quotes, and more.',
    price: '$45 – $85 / sign',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  },
  {
    name: 'Generator (Outdoor Events)',
    desc: 'Portable generator for outdoor events without power access. Fuel included.',
    price: '$100 – $175 / day',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80',
  },
]

export const INVITATIONS = [
  {
    name: 'Digital Invitation (Canva Design)',
    desc: 'Professionally designed digital invitation file, customized with your event details. Delivered same day.',
    price: '$25 – $35',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
  {
    name: 'Printed Invitation Pack (25)',
    desc: 'Glossy full-color printed invitations with envelopes. Custom design included.',
    price: '$55 – $75 / pack of 25',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
  {
    name: 'Save the Date Cards',
    desc: "Digital or printed save-the-dates to get the date on people's calendars early.",
    price: '$20 – $40',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Thank You Card Pack (25)',
    desc: 'Matching thank you cards to send after the event. Coordinated with your invitation design.',
    price: '$35 – $50 / pack of 25',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
  },
  {
    name: 'Event Program / Agenda',
    desc: 'Printed event programs or schedules for structured events or ceremonies.',
    price: '$30 – $55 / 25 prints',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
]

export const PHOTO_VIDEO = [
  {
    name: 'Photo Booth (Self-Serve Digital)',
    desc: 'Self-serve booth with props, digital backgrounds, and instant sharing to phone. No prints.',
    price: '$175 – $225 / 3 hrs',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
  },
  {
    name: 'Photo Booth (With Prints)',
    desc: 'Self-serve booth with 2x6 or 4x6 instant print strips. Unlimited sessions.',
    price: '$250 – $350 / 3 hrs',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
  },
  {
    name: 'Professional Photographer (2 hrs)',
    desc: 'Experienced event photographer capturing candid and posed shots. Edited gallery delivered within 7 days.',
    price: '$250 – $400 / 2 hrs',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80',
  },
  {
    name: 'Professional Videographer (2 hrs)',
    desc: 'Event videographer with edited highlight reel (3–5 min) delivered within 14 days.',
    price: '$350 – $500 / 2 hrs',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
  },
  {
    name: 'Photo Backdrop (Fabric)',
    desc: 'Themed or solid fabric backdrops for photo stations. Includes stand and clips.',
    price: '$50 – $75 / backdrop',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  },
  {
    name: 'Custom Step-and-Repeat Banner',
    desc: 'Printed step-and-repeat banner with your event logo or design. 6x8 ft with stand.',
    price: '$120 – $175 / banner',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  },
]

export const CONCESSIONS = [
  {
    name: 'Popcorn Machine',
    desc: 'Commercial popcorn machine with bags, butter, and salt. Includes 50 servings.',
    price: '$75 – $100 / event',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80',
  },
  {
    name: 'Cotton Candy Machine',
    desc: 'Spinning cotton candy machine with sugar and cones for 40–50 servings.',
    price: '$85 – $115 / event',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
  {
    name: 'Snow Cone / Shaved Ice Machine',
    desc: 'Electric ice shaver with 4 flavor syrups and 50 cups.',
    price: '$75 – $100 / event',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
  },
  {
    name: 'Hot Dog Roller Grill',
    desc: 'Commercial roller grill for hot dogs and sausages. Serves 50+ guests.',
    price: '$60 – $85 / event',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
  {
    name: 'Nacho Cheese Warmer',
    desc: 'Countertop nacho cheese dispenser with chips for 40–50 servings.',
    price: '$55 – $80 / event',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&q=80',
  },
  {
    name: "S'mores Station",
    desc: "Tabletop s'mores station with fire-safe burners, marshmallows, chocolate, and graham crackers. Serves 20.",
    price: '$65 – $90 / station',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  },
  {
    name: 'Lemonade / Drink Stand',
    desc: 'Decorative drink stand with lemonade or flavored beverage dispenser. Serves 50.',
    price: '$55 – $75 / stand',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
  },
  {
    name: 'Ice Cream Cart',
    desc: 'Insulated ice cream cart stocked with individual cups or bars. Attendant included.',
    price: '$175 – $250 / 2 hrs',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&q=80',
  },
]

export const HERO_PILLS: HeroPill[] = [
  { label: 'Inflatables', bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0' },
  { label: 'Entertainers', bg: '#F3F0FF', text: '#7950F2', border: '#D0BFFF' },
  { label: 'AV & Lighting', bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF' },
  { label: 'Concessions', bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
]

export const ENTERTAINER_NOTE =
  'Character appearances: $125/hr with a 2-hour minimum, or $175 for a single hour. A $30 travel fee applies for in-city events outside our venue. Character events are available inside DiscoveryTown only.'

export const RENTAL_SECTIONS: RentalSectionMeta[] = [
  {
    id: 'inflatables',
    eyebrow: 'Inflatables',
    title: 'Bounce Into the Fun',
    desc: 'Bounce houses, water slides, obstacle courses, and more - delivered, set up, and taken down by our team.',
    items: INFLATABLES,
    theme: { accentBg: 'var(--dt-coral-soft)', accentText: 'var(--dt-coral)', accentBorder: '#FFD0D0' },
  },
  {
    id: 'trains',
    eyebrow: 'Trains & Mechanical Rides',
    title: 'Rides the Whole Family Loves',
    desc: 'Mini trains, mechanical horses, carousels, and more - perfect crowd-pleasers for outdoor events and large parties.',
    items: TRAINS,
    theme: { accentBg: '#FFFBEB', accentText: '#D97706', accentBorder: '#FDE68A' },
  },
  {
    id: 'interactive',
    eyebrow: 'Interactive Play',
    title: 'Games, Tech & Activations',
    desc: 'Interactive dance floors, climbing walls, giant lawn games, arcade stations, and photo booths that get everyone moving and engaged.',
    items: INTERACTIVE,
    theme: { accentBg: '#F3F0FF', accentText: '#7950F2', accentBorder: '#D0BFFF' },
  },
  {
    id: 'party-setup',
    eyebrow: 'Party Setup',
    title: 'Tables, Tents, Stages & More',
    desc: 'Everything you need to physically set up a party - tables, chairs, tents, restrooms, coolers, trash stations, and staging.',
    items: PARTY_SETUP,
    theme: { accentBg: 'var(--dt-mint-soft)', accentText: '#0CA678', accentBorder: '#96F2D7' },
  },
  {
    id: 'party-supply',
    eyebrow: 'Party Supply',
    title: 'Tableware, Linens & Balloons',
    desc: 'Plates, napkins, cups, tablecloths, and balloon arrangements to dress up any event space - in any color or theme you choose.',
    items: PARTY_SUPPLY,
    theme: { accentBg: 'var(--dt-coral-soft)', accentText: 'var(--dt-coral)', accentBorder: '#FFD0D0' },
  },
  {
    id: 'food-drinks',
    eyebrow: 'Food & Drinks',
    title: 'Feed the Crowd',
    desc: 'Catered food and drink packages you can add to any event - pizzas, snack trays, lemonade dispensers, coffee boxes, and cupcakes.',
    items: FOOD_DRINKS,
    theme: { accentBg: '#FFFBEB', accentText: '#D97706', accentBorder: '#FDE68A' },
  },
  {
    id: 'entertainers',
    eyebrow: 'Entertainers',
    title: 'Characters, Artists & Performers',
    desc: 'From costumed princess characters to magicians and DJs - professional entertainers who know how to work a crowd.',
    items: ENTERTAINERS,
    theme: { accentBg: '#F3F0FF', accentText: '#7950F2', accentBorder: '#D0BFFF' },
  },
  {
    id: 'party-staff',
    eyebrow: 'Party Staff',
    title: 'Your Crew for the Day',
    desc: 'Experienced, friendly staff to host, coordinate, serve, and run activities - so you can actually enjoy the party.',
    items: PARTY_STAFF,
    theme: { accentBg: 'var(--dt-mint-soft)', accentText: '#0CA678', accentBorder: '#96F2D7' },
  },
  {
    id: 'venue',
    eyebrow: 'Venue',
    title: 'Book the Space',
    desc: 'Rent a single room, the whole venue, the gym floor, or outdoor space - flexible options for events of any size.',
    items: VENUES,
    theme: { accentBg: '#F0F4FF', accentText: '#4C6EF5', accentBorder: '#C5D0FF' },
  },
  {
    id: 'av-lighting',
    eyebrow: 'Audio-Visual, Lighting & Power',
    title: 'Sound, Light & Screen',
    desc: 'PA systems, projectors, uplighting, neon signs, string lights, and generators - everything to set the scene and fill the room with sound.',
    items: AV,
    theme: { accentBg: 'var(--dt-navy)10', accentText: 'var(--dt-navy)', accentBorder: '#E5E0D8' },
  },
  {
    id: 'invitations',
    eyebrow: 'Invitations',
    title: 'Set the Tone from the Start',
    desc: 'Digital and printed invitations, save-the-dates, thank you cards, and event programs - designed to match your theme.',
    items: INVITATIONS,
    theme: { accentBg: 'var(--dt-coral-soft)', accentText: 'var(--dt-coral)', accentBorder: '#FFD0D0' },
  },
  {
    id: 'photo-video',
    eyebrow: 'Photo & Video',
    title: 'Capture Every Moment',
    desc: 'Photo booths, professional photographers, videographers, backdrops, and step-and-repeat banners to make your event look amazing.',
    items: PHOTO_VIDEO,
    theme: { accentBg: '#F3F0FF', accentText: '#7950F2', accentBorder: '#D0BFFF' },
  },
  {
    id: 'concessions',
    eyebrow: 'Concessions',
    title: 'The Fun Snack Stations',
    desc: 'Popcorn machines, cotton candy, snow cones, hot dog rollers, ice cream carts, and mores stations - the crowd favorites that make every event feel like a carnival.',
    items: CONCESSIONS,
    theme: { accentBg: '#FFFBEB', accentText: '#D97706', accentBorder: '#FDE68A' },
  },
]
