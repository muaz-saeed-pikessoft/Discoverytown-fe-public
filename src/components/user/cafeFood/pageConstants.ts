import type { SpecialItem } from './pageTypes'

export const BLUE = 'var(--dt-blue-mid)'

export const MINT = 'var(--dt-teal)'

export const CORAL = 'var(--dt-primary)'

export const SECTION_CLASS =
  'scroll-mt-28 rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-card)] px-8 py-9 shadow-[0_4px_20px_rgba(10,15,30,0.05)]'

export const INPUT_CLASS =
  'w-full rounded-xl border border-[var(--dt-border)] px-3.5 py-2.5 text-[13px] text-[var(--dt-text-body)] placeholder-[var(--dt-text-subtle)] outline-none focus:border-[var(--dt-blue-mid)] focus:ring-1 focus:ring-[var(--dt-blue-mid)]/20 transition-colors duration-150 bg-[var(--dt-bg-card)]'

export const SPECIALS: SpecialItem[] = [
  {
    title: 'Kids Combo',
    price: '$8.95',
    note: 'Mini pizza + juice box + fruit cup',
    color: MINT,
    bg: 'var(--dt-teal-light)',
  },
  {
    title: 'Family Pizza Night',
    price: '$24.50',
    note: 'Any 2 pizzas + garlic knots + 2 drinks',
    color: BLUE,
    bg: 'var(--dt-blue-mid-light)',
  },
  {
    title: 'Coffee + Pastry',
    price: '$6.75',
    note: 'Morning special until 11:30 AM',
    color: CORAL,
    bg: 'var(--dt-primary-light)',
  },
]
