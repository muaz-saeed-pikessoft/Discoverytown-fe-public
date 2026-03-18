import type { NavItem, SectionNavProps } from './types'

export default function SectionNav({ active, onNav, items }: SectionNavProps) {
  return (
    <nav className='sticky top-[74px] z-40 border-b border-[var(--dt-border)] bg-[rgba(251,248,243,0.97)] px-5 backdrop-blur-xl shadow-[0_10px_24px_rgba(20,35,59,0.04)]'>
      <div className='mx-auto flex max-w-[1200px] gap-2 overflow-x-auto py-3 [scrollbar-width:none]'>
        {items.map(item => {
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              type='button'
              onClick={() => onNav(item.id)}
              className={[
                'flex-shrink-0 whitespace-nowrap rounded-[16px] border px-5 py-2.5 text-[13px] font-extrabold cursor-pointer transition-all duration-[180ms]',
                isActive
                  ? 'border-[var(--dt-teal-dark)] bg-[var(--dt-teal-dark)] text-white shadow-[0_10px_22px_rgba(17,123,114,0.18)]'
                  : 'border-[var(--dt-border)] bg-white text-[var(--dt-text-body)] hover:border-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)] hover:text-[var(--dt-primary)]',
              ].join(' ')}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
