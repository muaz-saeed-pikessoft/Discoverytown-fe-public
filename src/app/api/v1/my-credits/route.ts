import { NextResponse } from 'next/server'

import { contacts, packsByContact } from '@/app/api/v1/admin/clients/_mockDb'

const meId = 'contact-parent-1'

export async function GET() {
  const me = contacts.find(item => item.id === meId)
  return NextResponse.json({
    balance: me?.creditBalance ?? '0',
    packs: packsByContact[meId] ?? [],
  })
}

