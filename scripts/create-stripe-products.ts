import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

async function main() {
  // Essential plan
  const essential = await stripe.products.create({
    name: 'One Bill Essential',
    description: '$39/mo flat fee + 2.5% per bill payment processed. Up to 8 bills.',
  })
  const essentialPrice = await stripe.prices.create({
    product: essential.id,
    unit_amount: 3900,
    currency: 'cad',
    recurring: { interval: 'month' },
  })

  // Premium plan
  const premium = await stripe.products.create({
    name: 'One Bill Premium',
    description: '$69/mo flat fee + 2.5% per bill payment processed. Unlimited bills.',
  })
  const premiumPrice = await stripe.prices.create({
    product: premium.id,
    unit_amount: 6900,
    currency: 'cad',
    recurring: { interval: 'month' },
  })

  console.log('✅ Stripe products created!')
  console.log(`STRIPE_PRICE_ESSENTIAL=${essentialPrice.id}`)
  console.log(`STRIPE_PRICE_PREMIUM=${premiumPrice.id}`)
}

main()
