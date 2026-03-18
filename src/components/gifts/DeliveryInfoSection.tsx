import React from 'react';
import SectionHeader from '../shared/SectionHeader';

const DELIVERY_INFO = [
  {
    img: '/icons/truck.svg',
    fallback: '🚚',
    title: 'Local Delivery',
    desc: 'Same-day or scheduled delivery within 15 miles of DiscoveryTown. Hand-delivered with care.',
  },
  {
    img: '/icons/hospital.svg',
    fallback: '🏥',
    title: 'Hospital Drops',
    desc: "Special coordination with local children's hospitals to ensure gifts reach their rooms safely.",
  },
  {
    img: '/icons/gift.svg',
    fallback: '🎁',
    title: 'Pick Up',
    desc: 'Grab your gift basket directly from the DiscoveryTown front desk on your way to the party.',
  },
];

export default function DeliveryInfoSection() {
  return (
    <>
      <SectionHeader
        eyebrow='Delivery Info'
        title='How It Works'
        accentColor='var(--dt-coral)'
      />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {DELIVERY_INFO.map(info => (
          <div
            key={info.title}
            className='rounded-[16px] border border-[var(--dt-border)] bg-white p-6 shadow-sm'
          >
            <div className='mb-3 text-[1.75rem]'>{info.fallback}</div>
            <div className='mb-1.5 text-sm font-black text-[var(--dt-navy)]'>{info.title}</div>
            <div className='text-[13px] leading-[1.6] text-[var(--dt-text-muted)]'>{info.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
