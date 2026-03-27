'use client'

import type { FlowState, FulfillmentMode } from './types'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { COMMERCE_CATEGORY_META, getCommerceItems, type CommerceCategory } from './commerceData'

const inputClass =
  'w-full rounded-xl border border-[var(--dt-border)] px-4 py-3 text-[14px] font-medium text-[var(--dt-navy)] placeholder:text-[var(--dt-text-subtle)] focus:outline-none focus:border-[var(--dt-primary)] transition-colors'

export default function CommerceFlowPageClient() {
  const searchParams = useSearchParams()
  const categoryParam = (searchParams?.get('category') ?? null) as CommerceCategory | null
  const selectedSlug = searchParams?.get('item') ?? null

  const category: CommerceCategory = categoryParam && categoryParam in COMMERCE_CATEGORY_META ? categoryParam : 'shop'
  const meta = COMMERCE_CATEGORY_META[category]
  const items = useMemo(() => getCommerceItems(category), [category])

  const preselectedItem = useMemo(() => items.find(item => item.slug === selectedSlug) ?? null, [items, selectedSlug])

  const [selectedItem, setSelectedItem] = useState(preselectedItem)
  const [step, setStep] = useState(preselectedItem ? 1 : 0)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FlowState>({
    quantity: 1,
    fulfillment: category === 'rental' ? 'delivery' : 'pickup',
    date: '',
    time: '',
    address: '',
    notes: '',
    name: '',
    email: '',
    phone: '',
  })

  const accent = selectedItem?.accent ?? 'var(--dt-primary)'

  const canContinueToReview =
    !!selectedItem && !!form.date && !!form.time && (form.fulfillment === 'pickup' || !!form.address.trim())

  const canSubmit = canContinueToReview && !!form.name && !!form.email && !!form.phone

  if (submitted && selectedItem) {
    return (
      <div className='min-h-screen bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] px-5 py-16'>
        <div className='mx-auto max-w-[640px] rounded-[30px] bg-white p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.1)]'>
          <div
            className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-black text-white'
            style={{ background: accent }}
          >
            ✓
          </div>
          <p className='dt-eyebrow mb-2' style={{ color: accent }}>
            Request Received
          </p>
          <h1 className='dt-font-heading mb-3 text-[2.2rem] font-black text-[var(--dt-navy)]'>
            {meta.label} flow complete
          </h1>
          <p className='mx-auto max-w-[460px] text-[15px] leading-[1.8] text-[var(--dt-text-muted)]'>
            We captured your request for <strong>{selectedItem.name}</strong> and will follow up at{' '}
            <strong>{form.email}</strong> with confirmation and next steps.
          </p>

          <div className='mt-8 grid gap-3 rounded-[20px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-5 text-left text-[14px] text-[var(--dt-text-muted)]'>
            <div className='flex items-center justify-between gap-4'>
              <span>Item</span>
              <strong className='text-[var(--dt-navy)]'>{selectedItem.name}</strong>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span>Quantity</span>
              <strong className='text-[var(--dt-navy)]'>{form.quantity}</strong>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span>{meta.dateLabel}</span>
              <strong className='text-[var(--dt-navy)]'>{form.date}</strong>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span>Time Window</span>
              <strong className='text-[var(--dt-navy)]'>{form.time}</strong>
            </div>
          </div>

          <div className='mt-8 flex flex-wrap justify-center gap-3'>
            <button
              type='button'
              onClick={() => {
                setSubmitted(false)
                setStep(0)
                setSelectedItem(null)
              }}
              className='rounded-xl px-5 py-3 text-sm font-black text-white'
              style={{ background: accent }}
            >
              Start Another Request
            </button>
            <Link
              href='/'
              className='rounded-xl border border-[var(--dt-border)] px-5 py-3 text-sm font-bold text-[var(--dt-navy)] no-underline'
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] px-5 py-10 dt-font-body'>
      <div className='mx-auto max-w-[1180px]'>
        <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='dt-eyebrow mb-2 text-[var(--dt-primary)]'>{meta.label}</p>
            <h1 className='dt-font-heading text-[clamp(2rem,4vw,3rem)] font-black text-[var(--dt-navy)]'>
              {meta.title}
            </h1>
            <p className='mt-3 max-w-[620px] text-[15px] leading-[1.75] text-[var(--dt-text-muted)]'>
              {meta.description}
            </p>
          </div>
          <Link href='/' className='text-sm font-bold text-[var(--dt-primary)] no-underline'>
            ← Back to Home
          </Link>
        </div>

        <div className='mb-6 grid gap-3 rounded-[22px] border border-[var(--dt-border)] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:grid-cols-3'>
          {['Choose', 'Details', 'Review'].map((label, index) => {
            const active = step >= index

            return (
              <div
                key={label}
                className='rounded-[16px] px-4 py-3 text-sm font-bold'
                style={{
                  background: active && selectedItem ? selectedItem.softBg : 'var(--dt-bg-page)',
                  color: active ? accent : 'var(--dt-text-subtle)',
                }}
              >
                {index + 1}. {label}
              </div>
            )
          })}
        </div>

        <div className='grid gap-6 lg:grid-cols-[1.25fr_0.85fr]'>
          <div className='rounded-[30px] border border-[var(--dt-border)] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] lg:p-8'>
            {step === 0 ? (
              <>
                <h2 className='mb-2 text-[1.4rem] font-black text-[var(--dt-navy)]'>{meta.ctaLabel}</h2>
                <p className='mb-6 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>
                  Start by picking the exact item you want to request. You can still add notes in the next step.
                </p>
                <div className='grid gap-4 md:grid-cols-2'>
                  {items.map(item => (
                    <button
                      key={item.slug}
                      type='button'
                      onClick={() => {
                        setSelectedItem(item)
                        setStep(1)
                      }}
                      className='overflow-hidden rounded-[22px] border bg-white text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]'
                      style={{ borderColor: item.border }}
                    >
                      <div className='h-[5px]' style={{ background: item.accent }} />
                      <div className='p-5'>
                        <img src={item.image} alt={item.name} className='mb-3 h-14 w-14 rounded-[14px] object-cover' />
                        <p className='mb-1 text-[15px] font-black text-[var(--dt-navy)]'>{item.name}</p>
                        <p className='mb-3 text-[13px] leading-[1.6] text-[var(--dt-text-muted)]'>{item.description}</p>
                        <div className='flex items-center justify-between gap-3'>
                          <span className='text-[13px] font-bold text-[var(--dt-text-subtle)]'>
                            {item.sectionLabel}
                          </span>
                          <span className='text-[15px] font-black' style={{ color: item.accent }}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 1 && selectedItem ? (
              <>
                <button
                  type='button'
                  onClick={() => setStep(0)}
                  className='mb-5 text-sm font-bold text-[var(--dt-text-muted)]'
                >
                  ← Change item
                </button>
                <h2 className='mb-2 text-[1.4rem] font-black text-[var(--dt-navy)]'>Set your details</h2>
                <p className='mb-6 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>
                  Tell us when you need it and how you want us to prepare the order or quote.
                </p>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    Quantity
                    <input
                      type='number'
                      min={1}
                      value={form.quantity}
                      onChange={event => setForm(prev => ({ ...prev, quantity: Number(event.target.value) || 1 }))}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    Fulfillment
                    <select
                      value={form.fulfillment}
                      onChange={event =>
                        setForm(prev => ({ ...prev, fulfillment: event.target.value as FulfillmentMode }))
                      }
                      className={`${inputClass} mt-2`}
                    >
                      <option value='pickup'>Pickup</option>
                      <option value='delivery'>
                        {category === 'rental' ? 'On-site setup / delivery' : 'Delivery'}
                      </option>
                    </select>
                  </label>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    {meta.dateLabel}
                    <input
                      type='date'
                      value={form.date}
                      onChange={event => setForm(prev => ({ ...prev, date: event.target.value }))}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    Preferred Time
                    <input
                      type='text'
                      value={form.time}
                      onChange={event => setForm(prev => ({ ...prev, time: event.target.value }))}
                      placeholder='10:00 AM - 12:00 PM'
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                </div>

                {form.fulfillment === 'delivery' ? (
                  <label className='mt-4 block text-sm font-bold text-[var(--dt-navy)]'>
                    {meta.addressLabel}
                    <input
                      type='text'
                      value={form.address}
                      onChange={event => setForm(prev => ({ ...prev, address: event.target.value }))}
                      placeholder='Street, city, and any access notes'
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                ) : null}

                <label className='mt-4 block text-sm font-bold text-[var(--dt-navy)]'>
                  Notes
                  <textarea
                    value={form.notes}
                    onChange={event => setForm(prev => ({ ...prev, notes: event.target.value }))}
                    rows={4}
                    placeholder='Theme, personalization, delivery instructions, or anything else'
                    className={`${inputClass} mt-2 resize-y`}
                  />
                </label>

                <button
                  type='button'
                  onClick={() => setStep(2)}
                  disabled={!canContinueToReview}
                  className='mt-6 rounded-xl px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[var(--dt-border)]'
                  style={{ background: canContinueToReview ? accent : undefined }}
                >
                  Continue to review
                </button>
              </>
            ) : null}

            {step === 2 && selectedItem ? (
              <>
                <button
                  type='button'
                  onClick={() => setStep(1)}
                  className='mb-5 text-sm font-bold text-[var(--dt-text-muted)]'
                >
                  ← Back to details
                </button>
                <h2 className='mb-2 text-[1.4rem] font-black text-[var(--dt-navy)]'>Review and send</h2>
                <p className='mb-6 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>
                  Final step. Confirm the request and leave your contact information.
                </p>

                <div className='mb-6 grid gap-3 rounded-[22px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-5 text-[14px] text-[var(--dt-text-muted)] sm:grid-cols-2'>
                  <div>
                    <p className='text-xs font-black uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>Item</p>
                    <p className='mt-1 font-black text-[var(--dt-navy)]'>{selectedItem.name}</p>
                  </div>
                  <div>
                    <p className='text-xs font-black uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>Price</p>
                    <p className='mt-1 font-black' style={{ color: accent }}>
                      {selectedItem.price}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-black uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
                      Quantity
                    </p>
                    <p className='mt-1 font-black text-[var(--dt-navy)]'>{form.quantity}</p>
                  </div>
                  <div>
                    <p className='text-xs font-black uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
                      Fulfillment
                    </p>
                    <p className='mt-1 font-black capitalize text-[var(--dt-navy)]'>{form.fulfillment}</p>
                  </div>
                </div>

                <div className='grid gap-4 sm:grid-cols-2'>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    Full Name
                    <input
                      value={form.name}
                      onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <label className='text-sm font-bold text-[var(--dt-navy)]'>
                    Email Address
                    <input
                      type='email'
                      value={form.email}
                      onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                </div>
                <label className='mt-4 block text-sm font-bold text-[var(--dt-navy)]'>
                  Phone Number
                  <input
                    value={form.phone}
                    onChange={event => setForm(prev => ({ ...prev, phone: event.target.value }))}
                    className={`${inputClass} mt-2`}
                  />
                </label>

                <button
                  type='button'
                  onClick={() => {
                    if (!canSubmit) return
                    setSubmitted(true)
                  }}
                  disabled={!canSubmit}
                  className='mt-6 rounded-xl px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[var(--dt-border)]'
                  style={{ background: canSubmit ? accent : undefined }}
                >
                  {meta.buttonLabel}
                </button>
              </>
            ) : null}
          </div>

          <aside className='rounded-[30px] border border-[var(--dt-border)] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)]'>
            <p className='text-xs font-black uppercase tracking-[0.14em] text-[var(--dt-text-subtle)]'>Selected Item</p>
            {selectedItem ? (
              <div className='mt-4'>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className='mb-4 h-[220px] w-full rounded-[22px] object-cover'
                />
                <h3 className='text-[1.2rem] font-black text-[var(--dt-navy)]'>{selectedItem.name}</h3>
                <p className='mt-2 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>{selectedItem.description}</p>
                <div
                  className='mt-4 inline-flex rounded-full px-3 py-1 text-xs font-black'
                  style={{ background: selectedItem.softBg, color: selectedItem.accent }}
                >
                  {selectedItem.sectionLabel}
                </div>
                <div className='mt-4 text-[1.5rem] font-black' style={{ color: selectedItem.accent }}>
                  {selectedItem.price}
                </div>
              </div>
            ) : (
              <p className='mt-4 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>
                Pick an item from the left to start the request flow.
              </p>
            )}

            <div className='mt-8 rounded-[20px] bg-[var(--dt-bg-page)] p-5'>
              <p className='mb-3 text-sm font-black text-[var(--dt-navy)]'>What happens next</p>
              <div className='space-y-3 text-[13px] leading-[1.65] text-[var(--dt-text-muted)]'>
                <p>1. You choose the item and share your timeline.</p>
                <p>2. Discovery Town confirms availability, delivery, or setup details.</p>
                <p>3. Final payment and handoff happen after confirmation.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
