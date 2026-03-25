'use client'

import { getCommerceItems } from '@/api/commerceApi'
import ActionLink from '@/components/shared/ActionLink'
import FlowSteps from '@/components/shared/FlowSteps'
import Hero from '@/components/shared/Hero'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  BAKED_FOOD,
  COLD_DRINKS,
  DELIVERY_OPTIONS,
  FROZEN_TREATS,
  HOT_DRINKS,
  KIDS_CORNER,
  NAV_SECTIONS,
  PASTRIES,
  PIZZAS,
  SALADS,
  SANDWICHES,
  SNACKS,
  SWEETS,
  TOASTS,
} from './constants'
import { normalizeRows } from './pageHelpers'
import DeliveryCards from './DeliveryCards'
import MenuBoard from './MenuBoard'
import MenuCard from './MenuCard'
import OrderPanel from './OrderPanel'
import { BLUE, CORAL, MINT, SECTION_CLASS } from './pageConstants'
import type { CartItem, MenuRow, OrderFormState } from './pageTypes'
import TakeoutCard from './TakeoutCard'
import type { CafeSection } from './types'

export default function CafeFoodPageClient() {
  const [activeSection, setActiveSection] = useState<CafeSection>('drinks')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [showOrderPanel, setShowOrderPanel] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['commerce', 'cafe'],
    queryFn: () => getCommerceItems('cafe'),
    staleTime: 30_000,
  })

  const [orderForm, setOrderForm] = useState<OrderFormState>({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup',
    requestedTime: '',
    address: '',
    notes: '',
  })

  function scrollToSection(id: CafeSection) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(s => s.id)

    const handleScroll = () => {
      let current: CafeSection = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - 140 <= 0) current = id
      }

      setActiveSection(prev => (prev === current ? prev : current))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const drinkBoards = useMemo(() => {
    const categories = [
      { key: 'hot-drinks', title: 'Hot Drinks', sub: 'Coffee bar, teas & cozy cups', fallback: HOT_DRINKS, base: 3.5 },
      { key: 'cold-drinks', title: 'Cold Drinks', sub: 'Fresh juices, soda & sparkling', fallback: COLD_DRINKS, base: 3.75 },
      { key: 'frozen', title: 'Frozen & Smoothies', sub: 'Milkshakes, sundaes & blended treats', fallback: FROZEN_TREATS, base: 4.25 },
    ]

    return categories.map(cat => {
      const apiRows = products
        .filter(p => p.tags.includes(cat.key))
        .map(p => ({
          id: p.id,
          name: p.name,
          detail: p.description,
          price: p.price,
          priceLabel: `$${p.price.toFixed(2)}`,
          category: cat.key,
          img: p.image,
        }))

      return {
        title: cat.title,
        subtitle: cat.sub,
        accent: CORAL,
        rows: apiRows.length > 0 ? apiRows : normalizeRows(cat.fallback, cat.base, cat.key),
      }
    })
  }, [products])

  const foodCards = useMemo(() => {
    const accents = [CORAL, BLUE, MINT]
    const apiFood = products.filter(p => p.tags.includes('food'))

    if (apiFood.length > 0) {
      return apiFood.map((p, index) => ({
        id: p.id,
        name: p.name,
        detail: p.description,
        price: p.price,
        priceLabel: `$${p.price.toFixed(2)}`,
        image: p.image,
        accent: accents[index % accents.length],
        badge: p.popular ? 'Bestseller' : undefined,
      }))
    }

    const fallbackRows = [
      ...normalizeRows(PIZZAS.map(p => ({ name: p.name, desc: p.desc, badge: p.badge })), 8.5, 'pizza'),
      ...normalizeRows(SANDWICHES.flatMap(g => g.items.map(i => ({ name: i.name, desc: i.desc }))), 7.5, 'sandwich'),
      ...normalizeRows(TOASTS, 5.75, 'toasts'),
      ...normalizeRows(KIDS_CORNER, 4.95, 'kids'),
      ...normalizeRows(SALADS, 6.95, 'salads'),
      ...normalizeRows(SNACKS, 2.95, 'snacks'),
      ...normalizeRows(PASTRIES, 3.25, 'bakery'),
      ...normalizeRows(SWEETS, 2.95, 'sweets'),
      ...normalizeRows(BAKED_FOOD, 4.25, 'baked'),
    ]

    return fallbackRows.map((row, index) => ({
      id: row.id,
      name: row.name,
      detail: row.detail,
      price: row.price,
      priceLabel: row.priceLabel,
      image: row.img ?? '',
      accent: accents[index % accents.length],
      badge: row.badge,
    }))
  }, [products])

  function handleAddItem(item: MenuRow | any) {
    setOrderSent(false)
    setCart(prev => {
      const current = prev[item.id]
      if (current) return { ...prev, [item.id]: { ...current, qty: current.qty + 1 } }

      return { ...prev, [item.id]: { ...item, qty: 1 } }
    })
  }

  function handleQuantity(itemId: string, nextQty: number) {
    setCart(prev => {
      if (!prev[itemId]) return prev
      if (nextQty <= 0) {
        const copy = { ...prev }
        delete copy[itemId]

        return copy
      }

      return { ...prev, [itemId]: { ...prev[itemId], qty: nextQty } }
    })
  }

  function openOrderPanel() {
    setShowOrderPanel(true)
    setTimeout(() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const cartItems = useMemo(() => Object.values(cart), [cart])

  const cartQtyMap = useMemo(
    () =>
      cartItems.reduce<Record<string, number>>((acc, item) => {
        acc[item.id] = item.qty

        return acc
      }, {}),
    [cartItems]
  )

  const itemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems])
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems])

  const serviceFee = useMemo(() => {
    if (subtotal <= 0) return 0
    if (orderForm.orderType === 'delivery') return 4.5
    if (orderForm.orderType === 'catering') return 12

    return 0
  }, [orderForm.orderType, subtotal])

  const total = subtotal + serviceFee

  function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!itemCount) return
    if (!orderForm.name || !orderForm.email || !orderForm.phone || !orderForm.requestedTime) return
    if (orderForm.orderType === 'delivery' && !orderForm.address.trim()) return

    setOrderSent(true)
  }

  return (
    <div className='dt-font-body bg-[var(--dt-bg-page)] min-h-screen'>
      <Hero
        title={
          <>
            A Real <em className='not-italic text-[var(--dt-hero-accent)]'>Cafe Menu</em> for Family Days
          </>
        }
        description='Drinks, kitchen favorites, kids combos, and catering options — presented like a true restaurant menu.'
        bgUrl='/foodAndcafe/img4.jpg'
        bgStyle={{ backgroundPosition: 'center 40%' }}
        hasGrain={true}
        containerClassName='relative max-w-[1200px] mx-auto px-8 py-20'
        actions={
          <>
            <ActionLink href='#drinks' accentColor='var(--dt-teal)' className='px-7 py-3.5 text-sm'>
              Browse Menu
            </ActionLink>
            <ActionLink
              href='#delivery'
              variant='outline'
              className='dt-btn-hero-outline px-7 py-3.5 text-sm !text-white border-white/30 bg-white/10'
            >
              Delivery &amp; Catering
            </ActionLink>
          </>
        }
      />
      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-28 flex flex-col gap-5'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-teal)] border-t-transparent' />
          </div>
        ) : (
          <>
            <FlowSteps
              eyebrow='How Ordering Works'
              title='Browse, add items, then submit the cafe order'
              description='Cafe and food now has a visible purchase path. Families can browse the menu, build the cart, and finish the request in one frontend flow.'
              accentColor='var(--dt-teal)'
              primaryHref='#drinks'
              primaryLabel='Start Building Order'
              secondaryHref={itemCount > 0 ? '#order' : '#delivery'}
              secondaryLabel={itemCount > 0 ? 'Jump to Order' : 'See Catering'}
              steps={[
                {
                  title: 'Build the cart',
                  description: 'Add drinks, food, and treats from the menu boards and item cards.',
                },
                {
                  title: 'Choose fulfillment',
                  description: 'Set pickup or delivery, preferred timing, and add any allergy or event notes.',
                },
                {
                  title: 'Submit the request',
                  description: 'Review totals in the order panel and send the frontend cafe request.',
                },
              ]}
            />

            <section id='drinks' className={SECTION_CLASS}>
              <SectionHeader
                eyebrow='Drinks Menu'
                title='Cafe Menu Board'
                description='Tap Add on any item — your cart builds instantly. Adjust quantities when you proceed.'
              />
              <div className='grid grid-cols-1 gap-4'>
                {drinkBoards.map(board => (
                  <MenuBoard
                    key={board.title}
                    {...board}
                    cartQty={cartQtyMap}
                    onAdd={handleAddItem}
                    onRemove={row => handleQuantity(row.id, (cartQtyMap[row.id] ?? 0) - 1)}
                  />
                ))}
              </div>
            </section>

            <section id='food' className={SECTION_CLASS}>
              <SectionHeader
                eyebrow='Food Menu'
                title='All-Day Kitchen Favorites'
                description='Premium card-style menu with image-first dishes, clean pricing, and quick add actions.'
              />
              <div className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
                {foodCards.map(item => (
                  <MenuCard
                    key={item.id}
                    item={{
                      name: item.name,
                      desc: item.detail || 'Chef-crafted and freshly prepared.',
                      priceLabel: item.priceLabel,
                      badge: item.badge,
                      image: item.image,
                    }}
                    accent={item.accent}
                    qty={cartQtyMap[item.id] ?? 0}
                    onAdd={() => handleAddItem(item)}
                    onRemove={() => handleQuantity(item.id, (cartQtyMap[item.id] ?? 0) - 1)}
                  />
                ))}
              </div>
            </section>

            <section id='takeout' className={SECTION_CLASS}>
              <SectionHeader
                eyebrow='Take Out'
                title='Counter Pickup'
                description='Quick grab-and-go flow with full menu access and family-size packaging.'
              />
              <TakeoutCard />
            </section>

            <section id='delivery' className={SECTION_CLASS}>
              <SectionHeader
                eyebrow='Delivery & Catering'
                title='We Bring the Cafe to You'
                description='Office lunches, birthday tables, or school events — custom menus and easy booking.'
              />

              <DeliveryCards options={DELIVERY_OPTIONS} />

              <div className='mt-5 rounded-xl bg-[var(--dt-dark)] px-7 py-6 flex items-center justify-between gap-4 flex-wrap'>
                <div>
                  <p className='dt-font-heading text-[21px] font-black text-white leading-[1.2] mb-1'>
                    Plan your food setup in minutes
                  </p>
                  <p className='text-[13px] text-white/55'>
                    Fast response, package options, and setup support for your event.
                  </p>
                </div>
                <Link
                  href='/contact'
                  className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--dt-teal)] text-white text-[14px] font-bold no-underline transition-all duration-200 hover:bg-[var(--dt-teal-dark)] whitespace-nowrap'
                >
                  Contact Catering
                </Link>
              </div>
            </section>

            {(showOrderPanel || itemCount > 0) && (
              <section id='order' className={SECTION_CLASS}>
                <SectionHeader
                  eyebrow='Your Order'
                  title='Review, Set Quantity & Proceed'
                  description='Adjust item quantities, fill in your details, and submit your order request.'
                />

                <OrderPanel
                  cartItems={cartItems}
                  itemCount={itemCount}
                  subtotal={subtotal}
                  serviceFee={serviceFee}
                  total={total}
                  orderForm={orderForm}
                  setOrderForm={setOrderForm}
                  handleQuantity={handleQuantity}
                  submitOrder={submitOrder}
                  orderSent={orderSent}
                />
              </section>
            )}
          </>
        )}
      </div>

      {itemCount > 0 && (
        <div className='fixed left-4 right-4 bottom-4 z-50 mx-auto max-w-[980px] rounded-2xl bg-[var(--dt-dark)] px-5 py-3.5 flex justify-between items-center gap-3 shadow-[0_16px_40px_rgba(10,15,30,0.4)]'>
          <div>
            <p className='text-white text-[13px] font-bold'>
              {itemCount} item{itemCount > 1 ? 's' : ''} in cart
            </p>
            <p className='text-white/50 text-[12px]'>${subtotal.toFixed(2)} subtotal</p>
          </div>
          <button
            type='button'
            onClick={openOrderPanel}
            className='rounded-xl px-5 py-2.5 bg-[var(--dt-teal)] text-white text-[13px] font-black cursor-pointer border-none transition-all duration-150 hover:bg-[var(--dt-teal-dark)] whitespace-nowrap'
          >
            View Order →
          </button>
        </div>
      )}
    </div>
  )
}
