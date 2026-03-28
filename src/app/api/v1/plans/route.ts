import { NextResponse } from 'next/server'

import { plans } from '@/app/api/v1/admin/clients/_mockDb'

export async function GET() {
  return NextResponse.json(plans)
}

