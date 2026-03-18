import type { MenuRow } from './pageTypes'

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getPrice(base: number, index: number) {
  const amount = base + (index % 4) * 0.5 + Math.floor(index / 4) * 0.25

  return { amount, label: `$${amount.toFixed(2)}` }
}

function shorten(text?: string) {
  if (!text) return ''
  const first = text.split('. ')[0]?.trim() ?? ''

  return first.length > 80 ? `${first.slice(0, 77)}...` : first
}

const KEYWORD_IMAGE_PAIRS: Array<[string, string]> = [
  ['coffee', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80'],
  ['tea', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=80'],
  ['chocolate', 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=900&q=80'],
  ['lemonade', 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=900&q=80'],
  ['soda', 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=900&q=80'],
  ['juice', 'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=900&q=80'],
  ['smoothie', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=900&q=80'],
  ['milkshake', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=900&q=80'],
  ['ice cream', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=900&q=80'],
  ['pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80'],
  ['salad', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=900&q=80'],
  ['sandwich', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=900&q=80'],
  ['sub', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=900&q=80'],
  ['wrap', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=900&q=80'],
  ['croissant', 'https://images.unsplash.com/photo-1555507036-ab794f4afe5b?w=900&q=80'],
  ['muffin', 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=900&q=80'],
  ['cookie', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&q=80'],
  ['brownie', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=80'],
  ['cake', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80'],
  ['kids', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'],
  ['pretzel', 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=900&q=80'],
]

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'hot-drinks': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
  'cold-drinks': 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=900&q=80',
  frozen: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=900&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=900&q=80',
  sandwiches: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=900&q=80',
  light: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=900&q=80',
}

function getRelevantImage(name: string, category: string) {
  const needle = `${name} ${category}`.toLowerCase()
  for (const [keyword, image] of KEYWORD_IMAGE_PAIRS) {
    if (needle.includes(keyword)) return image
  }

  return CATEGORY_IMAGE_MAP[category] ?? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'
}

export function normalizeRows<T extends { name: string; desc?: string; badge?: string }>(
  items: T[],
  base: number,
  category: string
): MenuRow[] {
  return items.map((item, index) => {
    const price = getPrice(base, index)

    return {
      id: `${category}-${toSlug(item.name)}-${index}`,
      name: item.name,
      detail: shorten(item.desc),
      badge: item.badge,
      priceLabel: price.label,
      price: price.amount,
      category,
      img: getRelevantImage(item.name, category),
    }
  })
}
