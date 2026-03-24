import type { OrderPanelProps } from './types'
import React from 'react'
import Link from 'next/link'
import { BLUE, MINT, INPUT_CLASS } from './pageConstants'
import type { CartItem, OrderFormState } from './pageTypes'

export default function OrderPanel({
  cartItems,
  itemCount,
  subtotal,
  serviceFee,
  total,
  orderForm,
  setOrderForm,
  handleQuantity,
  submitOrder,
  orderSent,
}: OrderPanelProps) {
  return (
    <div className='grid grid-cols-[1.4fr_1fr] gap-5 max-lg:grid-cols-1'>
      <div className='rounded-xl border border-[var(--dt-border)] overflow-hidden'>
        {cartItems.length === 0 ? (
          <div className='px-5 py-8 text-[14px] text-[var(--dt-text-subtle)]'>
            Your cart is empty. Add items from the menu above.
          </div>
        ) : (
          cartItems.map(item => (
            <div
              key={item.id}
              className='px-5 py-4 border-b border-dashed border-[var(--dt-border)] last:border-none flex items-center justify-between gap-3 flex-wrap'
            >
              <div>
                <p className='text-[15px] font-bold text-[var(--dt-dark)]'>{item.name}</p>
                <p className='text-[12px] text-[var(--dt-text-subtle)] mt-0.5'>
                  {item.category} · {item.priceLabel} each
                </p>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={() => handleQuantity(item.id, item.qty - 1)}
                  className='w-7 h-7 rounded-lg border border-[var(--dt-border)] bg-[var(--dt-bg-card)] font-bold cursor-pointer text-[var(--dt-dark)] transition-colors hover:border-[var(--dt-text-subtle)]'
                >
                  −
                </button>
                <span className='min-w-[24px] text-center font-bold text-[var(--dt-dark)] text-sm'>{item.qty}</span>
                <button
                  type='button'
                  onClick={() => handleQuantity(item.id, item.qty + 1)}
                  className='w-7 h-7 rounded-lg border font-bold cursor-pointer transition-colors'
                  style={{ borderColor: `${BLUE}60`, background: `${BLUE}10`, color: BLUE }}
                >
                  +
                </button>
                <p className='text-[13px] font-bold text-[var(--dt-dark)] ml-1'>
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={submitOrder} className='rounded-xl border border-[var(--dt-border)] p-5 flex flex-col gap-3'>
        <p className='text-[11px] font-black tracking-[0.13em] uppercase text-[var(--dt-primary)] mb-1'>
          Contact &amp; Details
        </p>

        <input
          value={orderForm.name}
          onChange={e => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder='Full Name'
          required
          className={INPUT_CLASS}
        />
        <input
          value={orderForm.email}
          onChange={e => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
          placeholder='Email Address'
          type='email'
          required
          className={INPUT_CLASS}
        />
        <input
          value={orderForm.phone}
          onChange={e => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
          placeholder='Phone Number'
          required
          className={INPUT_CLASS}
        />
        <select
          value={orderForm.orderType}
          onChange={e =>
            setOrderForm(prev => ({
              ...prev,
              orderType: e.target.value as OrderFormState['orderType'],
            }))
          }
          className={INPUT_CLASS}
        >
          <option value='pickup'>Pickup</option>
          <option value='delivery'>Delivery</option>
          <option value='catering'>Catering</option>
        </select>
        {orderForm.orderType === 'delivery' && (
          <input
            value={orderForm.address}
            onChange={e => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
            placeholder='Delivery Address'
            required
            className={INPUT_CLASS}
          />
        )}
        <input
          value={orderForm.requestedTime}
          onChange={e => setOrderForm(prev => ({ ...prev, requestedTime: e.target.value }))}
          placeholder='Preferred Time (e.g. Today 6:30 PM)'
          required
          className={INPUT_CLASS}
        />
        <textarea
          value={orderForm.notes}
          onChange={e => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
          placeholder='Allergies, custom requests, event notes...'
          rows={3}
          className={`${INPUT_CLASS} resize-y`}
        />

        <div className='pt-3 border-t border-dashed border-[var(--dt-border)] flex flex-col gap-1'>
          <div className='flex justify-between text-[13px] text-[var(--dt-text-subtle)]'>
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className='flex justify-between text-[13px] text-[var(--dt-text-subtle)]'>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {serviceFee > 0 && (
            <div className='flex justify-between text-[13px] text-[var(--dt-text-subtle)]'>
              <span>Service Fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
          )}
          <div className='flex justify-between text-[15px] font-black text-[var(--dt-dark)] mt-1'>
            <span>Estimated Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type='submit'
          disabled={itemCount === 0}
          className='w-full rounded-xl py-3 text-[14px] font-black text-white transition-all duration-150 mt-1'
          style={{
            background: itemCount === 0 ? 'var(--dt-text-subtle)' : MINT,
            cursor: itemCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Proceed Order Request
        </button>

        <Link
          href='/contact'
          className='text-[12px] font-bold no-underline transition-colors duration-150 hover:underline text-[var(--dt-blue-mid)]'
        >
          Need help? Open full contact page →
        </Link>

        {orderSent && (
          <div className='rounded-xl px-4 py-3 bg-[var(--dt-teal-light)] border border-[var(--dt-teal)]/30 text-[var(--dt-dark)] text-[13px] font-bold'>
            ✓ Order request ready. Connect this form to your API / email handler.
          </div>
        )}
      </form>
    </div>
  )
}
