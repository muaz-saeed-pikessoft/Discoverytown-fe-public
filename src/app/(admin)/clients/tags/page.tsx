'use client'

import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'
import ColorPicker from '@/portal/admin/features/clients/components/ColorPicker'
import TagPill from '@/portal/admin/features/clients/components/TagPill'
import { useCreateTag, useDeleteTag, useTags } from '@/portal/admin/features/clients/hooks/useTags'

export default function AdminClientsTagsPage() {
  const { data: tags = [], isLoading } = useTags()
  const createTag = useCreateTag()
  const deleteTag = useDeleteTag()
  const [name, setName] = useState('')
  const [color, setColor] = useState('#3B82F6')

  return (
    <div className='space-y-4'>
      <PageHeader title='Tags' subtitle='Organize clients with tags.' />
      <div className='rounded-2xl border border-gray-200 bg-white p-4'>
        <div className='grid gap-3 sm:grid-cols-[1fr_220px_auto]'>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Tag name'
            className='h-10 rounded-xl border border-gray-200 px-3 text-sm font-semibold'
          />
          <ColorPicker value={color} onChange={setColor} />
          <button
            type='button'
            onClick={() => createTag.mutate({ name, color })}
            className='h-10 rounded-xl bg-blue-600 px-3 text-xs font-black text-white'
          >
            New Tag
          </button>
        </div>
      </div>
      <div className='rounded-2xl border border-gray-200 bg-white p-4'>
        {isLoading ? (
          <div className='text-sm font-semibold text-gray-500'>Loading tags…</div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {tags.map(tag => (
              <TagPill key={tag.id} name={`${tag.name}${typeof tag.contactCount === 'number' ? ` (${tag.contactCount})` : ''}`} color={tag.color} onRemove={() => deleteTag.mutate(tag.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

