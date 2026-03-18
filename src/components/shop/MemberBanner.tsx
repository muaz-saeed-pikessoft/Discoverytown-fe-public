import React from 'react';

export default function MemberBanner() {
  return (
    <div className='dt-surface mb-9 flex items-center gap-4 rounded-[22px] px-7 py-[22px]'>
      <img
        src='https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&q=80'
        alt='Member Save'
        className='w-[48px] h-[48px] object-cover rounded-[12px] shrink-0'
      />
      <div>
        <div className='mb-0.5 dt-font-heading text-base font-black text-[var(--dt-shop-purple)]'>
          Members Save 10% on All Shop Purchases
        </div>
        <div className='text-[13px] text-[var(--dt-text-muted)]'>
          Active DiscoveryTown members automatically receive 10% off everything in the shop — online and in-store. Not a
          member yet?{' '}
          <a href='/play' className='font-extrabold text-[var(--dt-shop-purple)]'>
            Join today →
          </a>
        </div>
      </div>
    </div>
  );
}
