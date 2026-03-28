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
    ctx.strokeStyle = 'rgb(15 29 53)'
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
        className='w-full rounded-2xl border border-[var(--dt-border)] bg-white shadow-sm'
      />
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={clear}
          className='rounded-[999px] border border-[var(--dt-border)] bg-white px-4 py-2 text-[13px] font-bold text-[var(--dt-text-body)] transition hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
        >
          Clear
        </button>
        <button
          type='button'
          onClick={() => {
            if (!canvasRef.current) return
            onSave(canvasRef.current.toDataURL('image/png'))
          }}
          className='dt-btn-primary px-5 py-2'
        >
          Save signature
        </button>
      </div>
    </div>
  )
}

