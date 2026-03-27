'use client'

import { useForm } from 'react-hook-form'
import { DocumentType } from '@/types/clients.shared'

interface DocumentEditorProps {
  initial?: { title: string; content: string; documentType: DocumentType; requiresFor: string[] }
  onSubmit: (values: { title: string; content: string; documentType: DocumentType; requiresFor: string[] }) => void
}

export default function DocumentEditor({ initial, onSubmit }: DocumentEditorProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: initial?.title ?? '',
      content: initial?.content ?? '',
      documentType: initial?.documentType ?? DocumentType.WAIVER,
      requiresFor: initial?.requiresFor?.join(',') ?? '',
    },
  })

  return (
    <form
      className='space-y-3'
      onSubmit={handleSubmit(values =>
        onSubmit({
          title: values.title,
          content: values.content,
          documentType: values.documentType as DocumentType,
          requiresFor: String(values.requiresFor)
            .split(',')
            .map(item => item.trim())
            .filter(Boolean),
        })
      )}
    >
      <select {...register('documentType')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'>
        {Object.values(DocumentType).map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input {...register('title')} placeholder='Document title' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
      <textarea {...register('content')} placeholder='Document content' className='min-h-40 w-full rounded-xl border border-gray-200 p-3 text-sm font-semibold' />
      <input
        {...register('requiresFor')}
        placeholder='Requires for (comma separated)'
        className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
      />
      <div className='flex justify-end'>
        <button type='submit' className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'>
          Save Document
        </button>
      </div>
    </form>
  )
}

