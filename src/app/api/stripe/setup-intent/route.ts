import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

export async function POST(req: NextRequest) {
  const { customerId } = await req.json()

  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
  })

  return NextResponse.json({ clientSecret: setupIntent.client_secret })
}
