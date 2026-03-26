import type { DeliveryOption, DrinkItem, MenuItem, NavSectionItem, PillItem, PizzaItem, SandwichGroup } from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'drinks', label: 'Drinks' },
  { id: 'food', label: 'Food' },
  { id: 'takeout', label: 'Take Out' },
  { id: 'delivery', label: 'Delivery & Catering' },
]

/** In-page anchors for the drinks boards (jump from the cafe menu). */
export const CAFE_DRINK_JUMP_LINKS: { id: string; label: string }[] = [
  { id: 'cafe-hot-drinks', label: 'Hot drinks' },
  { id: 'cafe-cold-drinks', label: 'Cold drinks' },
  { id: 'cafe-frozen', label: 'Frozen & smoothies' },
]

/** In-page anchors for grouped food sections (fallback menu). */
export const CAFE_FOOD_JUMP_LINKS: { id: string; label: string }[] = [
  { id: 'cafe-pizza', label: 'Pizza & mains' },
  { id: 'cafe-sandwiches', label: 'Sandwiches & toasts' },
  { id: 'cafe-salads-snacks', label: 'Salads & snacks' },
  { id: 'cafe-kids-bakery', label: 'Kids & bakery' },
  { id: 'cafe-sweets', label: 'Sweets' },
]

export const CAFE_FOOD_MENU_ANCHOR = 'cafe-food-menu'

export const HERO_PILLS: PillItem[] = [
  { label: 'Drinks', bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  { label: 'Food', bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0' },
  { label: 'Take Out', bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7' },
  { label: 'Delivery & Catering', bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF' },
]

export const HOT_DRINKS: DrinkItem[] = [
  {
    name: 'Hot Chocolate',
    desc: 'Creamy and comforting, made with quality chocolate.',
    emoji: '🍫',
  },
  {
    name: 'Steamer',
    desc: 'Steamed milk sweetened with any of our available flavor syrups.',
    emoji: '🥛',
  },
  {
    name: 'Artisan Teas',
    desc: 'A curated selection of premium whole-leaf teas.',
    emoji: '🫖',
    variants: [
      { label: 'Black Teas', items: 'Earl Grey, English Breakfast' },
      { label: 'Green Teas', items: 'Sencha, Jasmine' },
      { label: 'Herbal Teas', items: 'Peppermint, Chamomile, Berry Hibiscus' },
    ],
  },
]

export const COLD_DRINKS: DrinkItem[] = [
  { name: 'Fresh-Squeezed Lemonade', desc: 'Tart, sweet, and made daily.', emoji: '🍋' },
  {
    name: 'Italian Soda',
    desc: 'Carbonated water with your choice of flavor syrup. Ask for a cream option!',
    emoji: '🫧',
  },
  { name: 'Bottled & Sparkling Water', desc: 'Plain or flavored sparkling water & seltzer.', emoji: '💧' },
  { name: 'Juices', desc: 'Apple Juice, Orange Juice, Cranberry Juice.', emoji: '🧃' },
  { name: 'Soft Drinks', desc: 'Coca-Cola, Diet Coke, Sprite, Fanta Orange, Dr. Pepper, Root Beer.', emoji: '🥤' },
  { name: 'Specialty Craft Sodas', desc: 'Local & unique flavors - ginger ale, cream soda, and more.', emoji: '✨' },
  { name: 'Milkshakes & Floats', desc: 'Vanilla Milkshake, Chocolate Milkshake.', emoji: '🥤' },
  { name: 'Energy Drinks', desc: 'Available during late-night service (check local regulations).', emoji: '⚡' },
]

export const FROZEN_TREATS: DrinkItem[] = [
  {
    name: 'Ice Cream Scoops',
    desc: 'Vanilla, Chocolate, Strawberry + rotating monthly flavor. Served in a cup or cone.',
    emoji: '🍦',
  },
  {
    name: 'Sundae',
    desc: 'Two scoops of your choice, whipped cream, cherry, and chocolate, caramel, or strawberry topping.',
    emoji: '🍨',
  },
  {
    name: 'Root Beer Float',
    desc: 'Vanilla ice cream topped with cold root beer.',
    emoji: '🍺',
  },
  {
    name: 'Smoothies',
    desc: '',
    emoji: '🫙',
    variants: [
      { label: 'Strawberry Banana', items: 'Strawberries, banana, and yogurt/milk base.' },
      { label: 'Tropical Mango', items: 'Mango, pineapple, and a splash of orange juice.' },
      { label: 'Green Detox', items: 'Spinach, banana, apple, and almond milk.' },
      { label: 'Berry Blast', items: 'Blueberry, raspberry, blackberry, and yogurt.' },
    ],
  },
  {
    name: 'Slushies',
    desc: '',
    emoji: '🧊',
    variants: [
      { label: 'Fruit Slushies', items: 'Rotating flavors: Cherry, Blue Raspberry, Watermelon.' },
      { label: 'Frozen Lemonade', items: 'Icy, tart, and refreshing. Add fruit purees like strawberry.' },
      { label: 'Iced Coffee Blender', items: 'Coffee, milk, ice, and sweetener blended smooth - like a Frappé.' },
    ],
  },
]

export const PASTRIES: MenuItem[] = [
  {
    name: 'Signature Croissant',
    desc: 'Flaky, buttery, baked to golden perfection. Also: Pain au Chocolat, Almond Croissant.',
    emoji: '🥐',
  },
  { name: 'Bagel', desc: 'Classic bagel, made fresh daily.', emoji: '🥯' },
  { name: 'Danish', desc: 'Filled with chocolate, cheese, or fruit.', emoji: '🍮' },
  { name: 'Muffins', desc: 'Daily rotating flavors: Blueberry Streusel, Lemon Poppy Seed, Banana Nut.', emoji: '🧁' },
  { name: 'Scones', desc: 'Lightly sweetened with seasonal fruits - Cranberry Orange, Apple Cinnamon.', emoji: '🫓' },
  {
    name: 'Cinnamon Rolls',
    desc: 'Giant soft rolls with cream cheese glaze. Weekends only.',
    emoji: '🌀',
    badge: 'Weekend Only',
  },
  { name: 'Breakfast Breads', desc: 'Slices of Zucchini Bread, Pumpkin Loaf, or Marble Swirl Bread.', emoji: '🍞' },
  { name: 'Cake Pops', desc: 'Fun, bite-sized, and colorful.', emoji: '🍭' },
  { name: 'Cookies', desc: 'Large Chocolate Chip and Oatmeal Raisin.', emoji: '🍪' },
  { name: 'Donuts', desc: 'Glazed, frosted, or specialty flavors.', emoji: '🍩' },
]

export const SWEETS: MenuItem[] = [
  { name: 'Classic Chocolate Chip Cookie', desc: 'Crispy edges, soft center, and loaded with chocolate.', emoji: '🍪' },
  { name: 'Oatmeal Raisin Cookie', desc: 'Hearty and perfectly spiced.', emoji: '🍪' },
  { name: 'Shortbread', desc: 'Simple, buttery, and melt-in-your-mouth.', emoji: '🫓' },
  { name: 'Fudge Brownie', desc: 'Dense, dark, and intensely chocolaty.', emoji: '🍫' },
  { name: 'Lemon Bar', desc: 'Tart lemon curd over a buttery shortbread crust.', emoji: '🟡' },
  { name: 'Pecan Bar', desc: 'Sweet, gooey caramel filling studded with pecans.', emoji: '🌰' },
  {
    name: 'Cake Slices (Rotating)',
    desc: 'Daily selection - Red Velvet, Carrot Cake, Chocolate Decadence.',
    emoji: '🎂',
  },
]

export const BAKED_FOOD: MenuItem[] = [
  { name: 'Fatayer', desc: 'Cheese, spinach, or meat filling.', emoji: '🥟' },
  { name: 'Zaatar Manaeish', desc: 'Classic Middle Eastern flatbread with zaatar and olive oil.', emoji: '🫓' },
]

export const PIZZAS: PizzaItem[] = [
  { name: 'Classic Cheese', desc: 'Signature crust, savory tomato sauce, premium mozzarella.' },
  { name: 'Margherita', desc: 'Fresh mozzarella, tomato, and basil.' },
  { name: 'Pepperoni', desc: 'Classic with high-quality pepperoni.' },
  { name: 'BBQ Chicken', desc: 'Grilled chicken, BBQ sauce, red onion, and cilantro.' },
  { name: 'Veggie Delight', desc: 'Mushrooms, bell peppers, black olives, onions, and spinach.' },
  {
    name: '"Discovery Town" Supreme',
    desc: 'Pepperoni, sausage, mushrooms, onions, and green peppers.',
    badge: 'House Special',
  },
  { name: 'Pesto & Goat Cheese', desc: 'Pesto base, sun-dried tomatoes, and crumbled goat cheese.' },
  { name: 'Buffalo Chicken', desc: 'Ranch or bleu cheese base, buffalo chicken, drizzle of hot sauce.' },
  {
    name: "DIY Kid's Pizza",
    desc: 'Start with cheese and choose two toppings: Ham, Corn, or Pineapple.',
    badge: 'Kids Fave',
  },
]

export const SANDWICHES: SandwichGroup[] = [
  {
    category: 'Hot Subs',
    items: [
      { name: 'Meatball Parm Sub', desc: 'Homemade meatballs, marinara, melted mozzarella on a toasted hoagie roll.' },
      { name: 'Chicken Philly', desc: 'Sliced grilled chicken, melted provolone, sautéed peppers and onions.' },
      { name: 'Ham & Cheese Melt', desc: 'Sliced ham, Swiss or Cheddar cheese on a pretzel roll or ciabatta.' },
    ],
  },
  {
    category: 'Cold Subs',
    items: [
      {
        name: 'Italian Cold Cut',
        desc: 'Salami, pepperoni, ham, provolone, lettuce, tomato, onion, and Italian dressing.',
      },
      { name: 'Turkey & Provolone', desc: 'Sliced turkey breast, provolone, lettuce, tomato, and mayo/mustard.' },
      { name: 'Veggie Sub', desc: 'Hummus or cream cheese, cucumber, sprouts, tomato, bell pepper, and spinach.' },
      { name: 'Egg Salad Sandwich', desc: 'Classic egg salad with chives on whole wheat bread.' },
    ],
  },
  {
    category: 'Panini',
    items: [
      { name: 'Caprese Panini', desc: 'Fresh mozzarella, tomato, basil, and pesto pressed on focaccia.' },
      { name: 'Smoked Turkey & Swiss', desc: 'Smoked turkey, Swiss cheese, and honey mustard on whole wheat.' },
    ],
  },
  {
    category: 'Grilled',
    items: [{ name: 'Classic Grilled Cheese', desc: 'Cheddar and Provolone on sourdough. Add tomato or bacon.' }],
  },
  {
    category: 'Wraps',
    items: [{ name: 'Veggie Hummus Wrap', desc: 'Roasted vegetables, spinach, feta, and hummus in a tortilla.' }],
  },
]

export const TOASTS: MenuItem[] = [
  {
    name: 'Avocado Smash Toast',
    desc: 'Freshly smashed avocado with sea salt, pepper, and optional chili flakes.',
    emoji: '🥑',
  },
  {
    name: 'Hummus & Cucumber Toast',
    desc: 'Creamy hummus, crisp cucumber slices, and a drizzle of olive oil.',
    emoji: '🫒',
  },
  {
    name: 'Cinnamon Sugar Toast',
    desc: 'Buttered toast dusted with cinnamon and sugar. A kid favorite!',
    emoji: '🍞',
    badge: 'Kids Fave',
  },
  { name: 'Peanut Butter & Banana Toast', desc: 'Classic peanut butter spread and sliced fresh banana.', emoji: '🍌' },
  { name: 'Labneh Toast', desc: 'Creamy strained yogurt spread on thick-cut artisan bread.', emoji: '🧀' },
]

export const KIDS_CORNER: MenuItem[] = [
  { name: 'Macaroni & Cheese', desc: 'Creamy classic elbow pasta in a cheesy sauce.', emoji: '🧀' },
  { name: 'Mini Corn Dogs', desc: 'Three miniature corn dogs, served warm.', emoji: '🌭' },
  { name: 'Chicken Strips', desc: 'Two all-white meat chicken strips, baked (not fried).', emoji: '🍗' },
  { name: 'PB&J Uncrustable', desc: 'Crusts removed for easy little-hand eating.', emoji: '🥜' },
  { name: 'Mini Snack Box', desc: 'Crackers, cheese, and fruit.', emoji: '📦' },
  { name: 'Bagel Bites / Mini Pizzas', desc: 'Quick, light, savory bites.', emoji: '🍕' },
  { name: 'Peanut Butter & Apple Dip', desc: 'Creamy peanut butter with fresh apple slices for dipping.', emoji: '🍎' },
  { name: 'Applesauce Pouches', desc: 'Easy squeeze pouches for the littlest ones.', emoji: '🫙' },
  { name: 'Yogurt Pouches', desc: 'Smooth and portable.', emoji: '🥛' },
]

export const SALADS: MenuItem[] = [
  {
    name: 'Cafe Cobb Salad',
    desc: 'Mixed greens, grilled chicken, bacon, hard-boiled egg, tomato, avocado, bleu cheese.',
  },
  { name: 'Caesar Salad', desc: 'Romaine, Parmesan, croutons, and Caesar dressing. Add grilled chicken.' },
  { name: 'Greek Salad', desc: 'Romaine, cucumber, tomato, red onion, Kalamata olives, feta, Greek vinaigrette.' },
  { name: 'Side Salad', desc: 'Small mixed greens, tomato, cucumber, with choice of dressing.' },
  { name: 'Hummus & Veggie Dip', desc: 'Classic hummus with pita bread and fresh-cut carrots, cucumber, peppers.' },
  { name: 'Caprese Skewers', desc: 'Cherry tomatoes, fresh mozzarella, and basil drizzled with balsamic glaze.' },
]

export const SNACKS: MenuItem[] = [
  { name: 'Bag of Chips', desc: 'Individual potato chip bags.', emoji: '🥔' },
  { name: 'Fruit Cup', desc: 'Seasonal fresh-cut fruit mix.', emoji: '🍓' },
  { name: 'Yogurt Parfait', desc: 'Greek yogurt, crunchy granola, and fresh seasonal fruit or honey.', emoji: '🥄' },
  { name: 'Overnight Oats', desc: 'Oats soaked in milk (or dairy-free) with seeds and fruit.', emoji: '🫙' },
  { name: 'Cheese Stick', desc: 'Individual wrapped portion.', emoji: '🧀' },
  { name: 'Granola Bar', desc: 'Nut-free options recommended.', emoji: '🌾' },
  { name: 'Protein Bars', desc: 'For the on-the-go parent.', emoji: '💪' },
  { name: 'Veggie Sticks & Dip', desc: 'Carrots, celery, and cucumber with hummus or ranch.', emoji: '🥕' },
  { name: 'Soft Pretzel', desc: 'With cheese sauce or mustard.', emoji: '🥨' },
  { name: 'Goldfish / Pretzels', desc: 'Individual bags.', emoji: '🐟' },
]

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    title: 'Local Delivery',
    desc: 'Get your café favorites delivered fresh to your door. Available for select menu items within our delivery zone.',
    color: '#4C6EF5',
    bg: '#F0F4FF',
    border: '#C5D0FF',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  },
  {
    title: 'Event Catering',
    desc: "Birthday parties, corporate gatherings, school events - we'll customize a catering package to fit your needs and headcount.",
    color: 'var(--dt-coral)',
    bg: 'var(--dt-coral-soft)',
    border: '#FFD0D0',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  },
]
