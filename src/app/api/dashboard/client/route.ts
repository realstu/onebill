import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const { data: client, error } = await supabaseAdmin
    .from('clients')
    .select('id, family_name, parent_name, parent_address, parent_city, plan, status, cashback_balance, cashback_rate, created_at')
    .eq('family_email', email)
    .single()

  if (error || !client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  const { data: bills } = await supabaseAdmin
    .from('bills')
    .select('id, provider, bill_type, monthly_amount, frequency, billing_method, next_due_date, last_paid_date, status')
    .eq('client_id', client.id)
    .order('provider')

  return NextResponse.json({ client, bills: bills ?? [] })
}
