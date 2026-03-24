'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import {
  COLD_DRINKS,
  DELIVERY_OPTIONS,
  FROZEN_TREATS,
  HERO_PILLS,
  HOT_DRINKS,
  KIDS_CORNER,
  NAV_SECTIONS,
  PASTRIES,
  PIZZAS,
  SALADS,
  SANDWICHES,
  SNACKS,
  SWEETS,
} from './constants'
import DeliveryCards from './DeliveryCards'
import MenuBoard from './MenuBoard'
import MenuCard from './MenuCard'
import { BLUE, CORAL, INPUT_CLASS, MINT, SECTION_CLASS } from './pageConstants'
import { normalizeRows } from './pageHelpers'
import type { CartItem, MenuRow, OrderFormState } from './pageTypes'
import TakeoutCard from './TakeoutCard'
import type { CafeSection } from './types'
import OrderPanel from './OrderPanel'
import Hero from '@/components/shared/Hero'
import ActionLink from '@/components/shared/ActionLink'
import FlowSteps from '@/components/shared/FlowSteps'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'

export default function CafeFoodPageClient() {
  const [activeSection, setActiveSection] = useState<CafeSection>('drinks')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [showOrderPanel, setShowOrderPanel] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

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

  const drinkBoards = useMemo(
    () => [
      {
        title: 'Hot Drinks',
        subtitle: 'Coffee bar, teas & cozy cups',
        accent: CORAL,
        rows: normalizeRows(HOT_DRINKS, 3.95, 'hot-drinks'),
      },
      {
        title: 'Cold Drinks',
        subtitle: 'Fresh juices, soda & sparkling',
        accent: CORAL,
        rows: normalizeRows(COLD_DRINKS, 2.95, 'cold-drinks'),
      },
      {
        title: 'Frozen & Smoothies',
        subtitle: 'Milkshakes, sundaes & blended treats',
        accent: CORAL,
        rows: normalizeRows(FROZEN_TREATS, 4.95, 'frozen'),
      },
    ],
    []
  )

  const sandwichRows = useMemo(
    () =>
      normalizeRows(
        SANDWICHES.flatMap(group => group.items.map(item => ({ ...item, desc: `${item.desc} (${group.category})` }))),
        8.95,
        'sandwiches'
      ),
    []
  )

  const foodCards = useMemo(() => {
    const cards = [
      ...normalizeRows(PIZZAS.slice(0, 4), 10.5, 'pizza'),
      ...normalizeRows([...PASTRIES.slice(0, 2), ...SWEETS.slice(0, 2)], 4.25, 'bakery'),
      ...normalizeRows(sandwichRows.slice(0, 3), 8.75, 'sandwich'),
      ...normalizeRows([...KIDS_CORNER.slice(0, 1), ...SALADS.slice(0, 1), ...SNACKS.slice(0, 1)], 5.5, 'light'),
    ]

    const accents = [CORAL, BLUE, MINT]

    return cards.map((item, index) => ({
      ...item,
      image: item.img,
      accent: accents[index % accents.length],
    }))
  }, [sandwichRows])

  function handleAddItem(item: MenuRow) {
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
