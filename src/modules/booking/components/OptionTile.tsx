import type { OptionTileProps } from './types'
import type { ServiceOption } from './types'

export default function OptionTile({ option, selected, accentColor, accentHex, onClick }: OptionTileProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={[
        'dt-card-interactive text-left rounded-[22px] p-6 transition-all duration-200 cursor-pointer w-full',
        'hover:-translate-y-0.5',
        selected ? 'shadow-[0_8px_28px_rgba(0,0,0,0.1)]' : '',
      ].join(' ')}
      style={selected ? { borderColor: accentHex, background: `${accentHex}08` } : {}}
    >
      <div className='flex items-start justify-between gap-3 mb-3'>
        <p className='text-[15px] font-black leading-[1.25]' style={{ color: selected ? accentHex : 'var(--dt-navy)' }}>
          {option.label}
        </p>
        <div className='text-right shrink-0'>
          <span className='text-[22px] font-black block' style={{ color: accentColor }}>
            {option.price}
          </span>
          <span className='text-[11px] text-[var(--dt-text-subtle)]'>{option.unit}</span>
        </div>
      </div>

      {option.badge && (
        <span
          className='inline-block mb-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.08em] text-white'
          style={{ background: accentHex }}
        >
          {option.badge}
        </span>
      )}

      <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65] mb-3'>{option.desc}</p>

      <ul className='flex flex-col gap-1'>
        {option.inclusions.map(inc => (
          <li key={inc} className='flex items-center gap-2 text-[12px] text-[var(--dt-text-muted)]'>
            <span
              className='w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0'
              style={{ background: accentHex }}
            >
              ✓
            </span>
            {inc}
          </li>
        ))}
      </ul>

      {selected && (
        <div className='mt-4 text-[11px] font-black uppercase tracking-[0.1em]' style={{ color: accentHex }}>
          ✓ Selected
        </div>
      )}
    </button>
  )
}
