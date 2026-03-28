'use client'

import { useState } from 'react'

const PRESET_COLORS = [
  '#3B82F6',
  '#10B981',
  '#8B5CF6',
  '#F59E0B',
  '#EF4444',
  '#6366F1',
  '#EC4899',
  '#14B8A6',
  '#0EA5E9',
  '#22C55E',
  '#A855F7',
  '#F97316',
  '#71717A',
  '#6B7280',
  '#0F172A',
  '#111827',
]

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [custom, setCustom] = useState(value)

  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-8 gap-1.5'>
        {PRESET_COLORS.map(color => {
          const selected = value === color
          return (
            <button
              key={color}
              type='button'
              onClick={() => onChange(color)}
              className={`h-6 w-6 rounded-full border transition ${
                selected ? 'border-gray-900 ring-2 ring-gray-900/40' : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          )
        })}
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          value={custom}
          onChange={e => {
            setCustom(e.target.value)
            onChange(e.target.value)
          }}
          placeholder='#000000'
          className='h-8 flex-1 rounded-md border border-gray-300 px-2 text-xs font-mono text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
        />
        <div className='h-6 w-6 rounded-full border border-gray-300' style={{ backgroundColor: custom || value }} />
      </div>
    </div>
  )
}

