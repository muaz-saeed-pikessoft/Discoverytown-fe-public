'use client'

import { useRef, useState } from 'react'

interface SignatureCanvasProps {
  onSave: (dataUrl: string) => void
}

export default function SignatureCanvas({ onSave }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawing, setDrawing] = useState(false)

  function pointFromEvent(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  function start(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { x, y } = pointFromEvent(event)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#111827'
    setDrawing(true)
  }

  function move(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { x, y } = pointFromEvent(event)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function clear() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className='space-y-2'>
      <canvas
        ref={canvasRef}
        width={520}
        height={140}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={() => setDrawing(false)}
        onMouseLeave={() => setDrawing(false)}
        className='w-full rounded-xl border border-gray-200 bg-white'
      />
      <div className='flex gap-2'>
        <button type='button' onClick={clear} className='h-8 rounded-lg border border-gray-200 px-2.5 text-xs font-black text-gray-700'>
          Clear
        </button>
        <button
          type='button'
          onClick={() => {
            if (!canvasRef.current) return
            onSave(canvasRef.current.toDataURL('image/png'))
          }}
          className='h-8 rounded-lg bg-blue-600 px-2.5 text-xs font-black text-white'
        >
          Save Signature
        </button>
      </div>
    </div>
  )
}

