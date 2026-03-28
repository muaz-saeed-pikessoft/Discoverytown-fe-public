import { NextResponse } from 'next/server'

import { creditLedgerByContact, paginated } from '@/app/api/v1/admin/clients/_mockDb'

const meId = 'contact-parent-1'

export async function GET() {
  return NextResponse.json(paginated(creditLedgerByContact[meId] ?? []))
}

