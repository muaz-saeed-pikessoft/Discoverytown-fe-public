'use client'

import Image from 'next/image'
import { useMemo, useRef } from 'react'

export type MediaAttachmentRole = 'PRIMARY' | 'GALLERY' | 'THUMBNAIL'

export interface MediaAttachmentDraft {
  id: string
  role: MediaAttachmentRole
  displayOrder: number
  url: string
  originalName: string
}

interface MediaUploadGalleryProps {
  attachments: MediaAttachmentDraft[]
  onAttachmentsChange: (attachments: MediaAttachmentDraft[]) => void
  maxItems?: number
  className?: string
}

function nextId(): string {
  return `tmp_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export default function MediaUploadGallery({
  attachments,
  onAttachmentsChange,
  maxItems = 8,
  className,
}: MediaUploadGalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const sorted = useMemo(() => {
    return [...attachments].sort((a, b) => a.displayOrder - b.displayOrder)
  }, [attachments])

  function setPrimary(id: string) {
    onAttachmentsChange(
      sorted.map(a => ({
        ...a,
        role: a.id === id ? 'PRIMARY' : a.role === 'PRIMARY' ? 'GALLERY' : a.role,
      })),
    )
  }

  function remove(id: string) {
    const next = sorted.filter(a => a.id !== id).map((a, idx) => ({ ...a, displayOrder: idx }))
    onAttachmentsChange(next)
  }

  function onFilesSelected(files: FileList | null) {
    if (!files) return
    const existingCount = attachments.length
    const remaining = Math.max(0, maxItems - existingCount)
    const incoming = Array.from(files).slice(0, remaining)
    if (incoming.length === 0) return

    const newItems: MediaAttachmentDraft[] = incoming.map((f, idx) => ({
      id: nextId(),
      role: existingCount === 0 && idx === 0 ? 'PRIMARY' : 'GALLERY',
      displayOrder: existingCount + idx,
      url: URL.createObjectURL(f),
      originalName: f.name,
    }))

    onAttachmentsChange([...attachments, ...newItems])
  }

  return (
    <div className={className}>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <div className='text-sm font-black text-gray-900'>Media</div>
          <div className='mt-0.5 text-xs font-semibold text-gray-600'>Upload up to {maxItems} images.</div>
        </div>
        <button
          type='button'
          onClick={() => inputRef.current?.click()}
          disabled={attachments.length >= maxItems}
          className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          Add images
        </button>
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          multiple
          className='hidden'
          onChange={e => onFilesSelected(e.target.files)}
        />
      </div>

      {sorted.length === 0 ? (
        <div className='mt-4 rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center'>
          <div className='text-sm font-black text-gray-900'>No images yet</div>
          <div className='mt-1 text-xs font-semibold text-gray-600'>Add a primary image so the service looks great in listings.</div>
        </div>
      ) : (
        <div className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {sorted.map(a => (
            <div key={a.id} className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
              <div className='relative aspect-[4/3] w-full bg-gray-50'>
                <Image src={a.url} alt={a.originalName} fill sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw' className='object-cover' />
                {a.role === 'PRIMARY' ? (
                  <div className='absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-black text-white'>
                    PRIMARY
                  </div>
                ) : null}
              </div>
              <div className='flex items-center justify-between gap-2 p-3'>
                <div className='min-w-0'>
                  <div className='truncate text-xs font-black text-gray-900'>{a.originalName}</div>
                  <div className='mt-0.5 text-[10px] font-semibold text-gray-500'>#{a.displayOrder + 1}</div>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => setPrimary(a.id)}
                    className='h-8 rounded-xl border border-gray-200 bg-white px-2 text-[10px] font-black text-gray-700 transition hover:bg-gray-50'
                  >
                    Set primary
                  </button>
                  <button
                    type='button'
                    onClick={() => remove(a.id)}
                    className='h-8 rounded-xl bg-red-50 px-2 text-[10px] font-black text-red-700 transition hover:bg-red-100'
                    aria-label='Remove image'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

