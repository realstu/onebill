'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import Stripe from 'stripe'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

const PLAN_BASE_FEE: Record<string, number> = {
  essential: 29,
  premium: 49,
}

const BUFFER_RATE = 0.10 // 10% buffer on estimated bill total, minimum $150
const BUFFER_MIN = 150

const PLAN_LABELS: Record<string, string> = {
  essential: 'Essential ($29/mo — up to 8 bills)',
  premium: 'Premium ($49/mo — unlimited bills)',
}

export async function submitOneBillSignup(data: {
  familyName: string
  familyEmail: string
  familyPhone: string
  parentName: string
  parentAddress: string
  parentCity: string
  plan: string
  bills: { provider: string; billType: string; accountNumber: string; monthlyAmount: string; billingMethod: string; frequency: string }[]
  notes: string
  poaName?: string | null
  poaEmail?: string | null
  poaPhone?: string | null
}) {
  // 1. Create Stripe customer
  const stripeCustomer = await stripe.customers.create({
    name: data.familyName,
    email: data.familyEmail,
    phone: data.familyPhone,
    metadata: {
      parent_name: data.parentName,
      parent_city: data.parentCity,
      plan: data.plan,
    },
  })

  // 2. Save client to Supabase
  const { data: client, error } = await supabaseAdmin
    .from('clients')
    .insert({
      family_name: data.familyName,
      family_email: data.familyEmail,
      family_phone: data.familyPhone,
      parent_name: data.parentName,
      parent_address: data.parentAddress,
      parent_city: data.parentCity,
      plan: data.plan,
      notes: data.notes,
      status: 'pending',
      stripe_customer_id: stripeCustomer.id,
      poa_name: data.poaName ?? null,
      poa_email: data.poaEmail ?? null,
      poa_phone: data.poaPhone ?? null,
    })
    .select('id')
    .single()

  if (error || !client) throw new Error('Failed to create client: ' + error?.message)

  // 3. Save bills to Supabase
  const validBills = data.bills.filter(b => b.provider || b.billType)
  if (validBills.length > 0) {
    await supabaseAdmin.from('bills').insert(
      validBills.map((b) => ({
        client_id: client.id,
        provider: b.provider,
        bill_type: b.billType,
        account_number: b.accountNumber || null,
        monthly_amount: b.monthlyAmount ? parseFloat(b.monthlyAmount) : null,
        billing_method: b.billingMethod || 'manual',
        frequency: b.frequency || 'monthly',
        status: 'active',
      }))
    )
  }

  // 4. Calculate estimated monthly total
  const billCount = validBills.length
  const baseFee = PLAN_BASE_FEE[data.plan] ?? 29
  const totalBillValue = validBills.reduce((sum, b) => sum + (b.monthlyAmount ? parseFloat(b.monthlyAmount) : 0), 0)
  const buffer = Math.max(totalBillValue * BUFFER_RATE, BUFFER_MIN)
  const preAuthAmount = (totalBillValue + buffer).toFixed(2)
  const estimatedTotal = (baseFee + totalBillValue).toFixed(2)

  // 5. Notify admin
  await resend.emails.send({
    from: 'One Bill <onboarding@resend.dev>',
    to: 'stuartoggrealtor@gmail.com',
    subject: `New One Bill Sign-Up — ${data.parentName}`,
    html: `
      <h2>New One Bill Client Signup</h2>
      <p><strong>Family:</strong> ${data.familyName} · ${data.familyPhone} · ${data.familyEmail}</p>
      <p><strong>Senior:</strong> ${data.parentName}, ${data.parentAddress}, ${data.parentCity}</p>
      <p><strong>Plan:</strong> ${PLAN_LABELS[data.plan] ?? data.plan}</p>
      <p><strong>Bills Added:</strong> ${billCount}</p>
      <p><strong>Estimated Bills Total:</strong> $${totalBillValue.toFixed(2)}/mo</p>
      <p><strong>Service Fee:</strong> $${baseFee}/mo</p>
      <p><strong>Pre-Auth Amount (bills + 10% buffer, min $150):</strong> $${preAuthAmount}</p>
      <p><strong>Estimated Total to Client:</strong> $${estimatedTotal}/mo</p>
      <p><strong>Stripe Customer ID:</strong> ${stripeCustomer.id}</p>
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
      <p><a href="https://dashboard.stripe.com/test/customers/${stripeCustomer.id}">View in Stripe →</a></p>
    `,
  })

  // 6. Confirm to family
  await resend.emails.send({
    from: 'One Bill <onboarding@resend.dev>',
    to: data.familyEmail,
    subject: `Welcome to One Bill — we're getting everything set up!`,
    html: `
      <h2>Hi ${data.familyName},</h2>
      <p>Thanks for signing up for One Bill! We've received your information and will be in touch within 1 business day to confirm your plan and get everything set up for ${data.parentName}.</p>
      <p>
        <strong>Plan:</strong> ${PLAN_LABELS[data.plan] ?? data.plan}<br/>
        <strong>Bills to consolidate:</strong> ${billCount}<br/>
        <strong>Monthly service fee:</strong> $${baseFee}/mo<br/>
        <strong>Estimated bills total:</strong> $${totalBillValue.toFixed(2)}/mo<br/>
        <strong>Monthly pre-authorization hold:</strong> $${preAuthAmount} (released at month end — you only pay what was spent)
      </p>
      <p>Questions? Just reply to this email.</p>
      <p>— The One Bill Team<br/>Durham Region, Ontario</p>
    `,
  })

  return { clientId: client.id, stripeCustomerId: stripeCustomer.id }
}
