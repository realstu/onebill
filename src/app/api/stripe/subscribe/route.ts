import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

const PRICE_IDS: Record<string, string> = {
  essential: process.env.STRIPE_PRICE_ESSENTIAL!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
}

export async function POST(req: NextRequest) {
  const { customerId, paymentMethodId, plan, clientId } = await req.json()

  // Attach payment method to customer and set as default
  await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId })
  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  })

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: PRICE_IDS[plan] }],
    default_payment_method: paymentMethodId,
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  })

  // Update client in Supabase with subscription ID
  await supabaseAdmin
    .from('clients')
    .update({ stripe_subscription_id: subscription.id })
    .eq('id', clientId)

  return NextResponse.json({ subscriptionId: subscription.id, status: subscription.status })
}
