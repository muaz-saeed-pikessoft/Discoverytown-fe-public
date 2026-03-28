'use client'

import type { ChangeEvent } from 'react'
import { useMemo, useRef, useState } from 'react'

interface FileUploadProps {
  accept: string
  maxSizeMb: number
  multiple?: boolean
  preview?: boolean
  onFilesSelected: (files: File[]) => void
}

function bytesFromMb(mb: number): number {
  return Math.max(0, mb) * 1024 * 1024
}

function isImage(file: File): boolean {
  return file.type.startsWith('image/')
}

export default function FileUpload({ accept, maxSizeMb, multiple = false, preview = false, onFilesSelected }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previews, setPreviews] = useState<Array<{ name: string; url: string }>>([])

  const maxBytes = useMemo(() => bytesFromMb(maxSizeMb), [maxSizeMb])

  function pickFiles() {
    inputRef.current?.click()
  }

  function validateFiles(files: File[]): File[] {
    return files.filter(f => {
      if (maxBytes > 0 && f.size > maxBytes) return false
      return true
    })
  }

  function handleFiles(files: File[]) {
    const valid = validateFiles(files)
    if (valid.length === 0) return

    if (preview) {
      const next = valid
        .filter(isImage)
        .slice(0, 8)
        .map(f => ({ name: f.name, url: URL.createObjectURL(f) }))
      setPreviews(prev => {
        prev.forEach(p => URL.revokeObjectURL(p.url))
        return next
      })
    }

    onFilesSelected(valid)
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : []
    handleFiles(list)
    e.target.value = ''
  }

  return (
    <div>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        className='hidden'
        onChange={onInputChange}
      />

      <div
        className={[
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white p-8 text-center transition',
          isDragging ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200 hover:border-gray-300',
        ].join(' ')}
        onClick={pickFiles}
        onDragEnter={e => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(true)
        }}
        onDragOver={e => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(true)
        }}
        onDragLeave={e => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
        }}
        onDrop={e => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
          const list = Array.from(e.dataTransfer.files)
          handleFiles(list)
        }}
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') pickFiles()
        }}
      >
        <div className='text-sm font-black text-gray-900'>Drag and drop files here</div>
        <div className='mt-1 text-xs font-semibold text-gray-500'>
          or <span className='text-blue-600'>browse</span> (max {maxSizeMb}MB)
        </div>
      </div>

      {preview && previews.length > 0 ? (
        <div className='mt-4 grid grid-cols-4 gap-2'>
          {previews.map(p => (
            <div key={p.url} className='overflow-hidden rounded-xl border border-gray-200 bg-gray-50'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.name} className='h-20 w-full object-cover' />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

