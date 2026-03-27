'use client'

import { QRCodeCanvas } from 'qrcode.react'

interface QRCodeDisplayProps {
  value: string
  size?: number
  className?: string
}

export default function QRCodeDisplay({ value, size = 220, className }: QRCodeDisplayProps) {
  return (
    <div className={className}>
      <div className='inline-flex items-center justify-center rounded-2xl border border-base-300 bg-white p-4'>
        <QRCodeCanvas value={value} size={size} includeMargin />
      </div>
    </div>
  )
}

