import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'
import { Resend } from 'resend'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' as any })
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { token, action } = await req.json()

  const { data: approval } = await supabaseAdmin
    .from('monthly_approvals')
    .select('*, clients(*)')
    .eq('token', token)
    .single()

  if (!approval || approval.status !== 'pending') {
    return NextResponse.json({ error: 'Invalid or already processed' }, { status: 400 })
  }

  if (action === 'decline') {
    await supabaseAdmin
      .from('monthly_approvals')
      .update({ status: 'declined', approved_at: new Date().toISOString() })
      .eq('token', token)

    // Notify admin
    await resend.emails.send({
      from: 'One Bill <onboarding@resend.dev>',
      to: 'stuartoggrealtor@gmail.com',
      subject: `⚠️ Payment Declined — ${approval.clients.family_name}`,
      html: `<p>${approval.clients.family_name} declined their ${approval.month} payment of $${Number(approval.total_charge).toFixed(2)}. Please follow up.</p>`,
    })

    return NextResponse.json({ ok: true, status: 'declined' })
  }

  // Approve — charge via Stripe
  const client = approval.clients

  try {
    // Get default payment method from Stripe customer
    const paymentMethods = await stripe.paymentMethods.list({ customer: client.stripe_customer_id, type: 'card' })
    const paymentMethodId = paymentMethods.data[0]?.id

    if (!paymentMethodId) throw new Error('No payment method on file')

    const amountCents = Math.round(Number(approval.total_charge) * 100)

    const monthLabel = new Date(approval.month + '-01').toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })

    await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'cad',
      customer: client.stripe_customer_id,
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
      description: `One Bill — ${monthLabel}`,
      metadata: { client_id: client.id, month: approval.month, approval_id: approval.id },
    })

    await supabaseAdmin
      .from('monthly_approvals')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: client.family_name,
      })
      .eq('token', token)

    // Notify admin
    await resend.emails.send({
      from: 'One Bill <onboarding@resend.dev>',
      to: 'stuartoggrealtor@gmail.com',
      subject: `✅ Payment Approved — ${client.family_name} — $${Number(approval.total_charge).toFixed(2)}`,
      html: `<p>${client.family_name} approved and paid $${Number(approval.total_charge).toFixed(2)} for ${monthLabel}.</p>`,
    })

    return NextResponse.json({ ok: true, status: 'approved' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    // Notify admin of failed charge
    await resend.emails.send({
      from: 'One Bill <onboarding@resend.dev>',
      to: 'stuartoggrealtor@gmail.com',
      subject: `❌ Charge Failed — ${client.family_name}`,
      html: `<p>Payment of $${Number(approval.total_charge).toFixed(2)} for ${client.family_name} failed: ${message}</p>`,
    })
    return NextResponse.json({ error: 'Charge failed', message }, { status: 402 })
  }
}
