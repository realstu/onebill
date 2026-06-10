'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, DollarSign, Heart, Plus, Trash2, Lock } from 'lucide-react'
import { submitOneBillSignup } from './actions'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const BILL_TYPES = [
  'Hydro / Electricity', 'Natural Gas', 'Water & Sewer',
  'Home Phone', 'Cell Phone', 'Internet', 'Cable / Streaming',
  'Home Insurance', 'Car Insurance', 'Life Insurance',
  'Property Tax', 'Mortgage / Rent', 'Credit Card', 'Other',
]

const PLANS = [
  { id: 'essential', name: 'Essential', price: '$39/mo + 2.5%', desc: 'Up to 8 bills consolidated + family dashboard', icon: DollarSign },
  { id: 'premium', name: 'Premium', price: '$69/mo + 2.5%', desc: 'Unlimited bills + priority support + monthly review report', icon: Heart },
]

type Bill = { provider: string; billType: string; accountNumber: string; monthlyAmount: string }
const emptyBill = (): Bill => ({ provider: '', billType: '', accountNumber: '', monthlyAmount: '' })

type SignupResult = { clientId: string; stripeCustomerId: string }

function PaymentStep({
  result,
  plan,
  onSuccess,
}: {
  result: SignupResult
  plan: string
  onSuccess: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const planLabel = plan === 'premium' ? '$69/mo' : '$39/mo'

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    try {
      // Get setup intent client secret
      const res = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: result.stripeCustomerId }),
      })
      const { clientSecret } = await res.json()

      // Confirm card setup
      const { error: setupError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      })

      if (setupError || !setupIntent?.payment_method) {
        setError(setupError?.message ?? 'Card setup failed. Please try again.')
        setLoading(false)
        return
      }

      // Create subscription
      await fetch('/api/stripe/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: result.stripeCustomerId,
          paymentMethodId: setupIntent.payment_method,
          plan,
          clientId: result.clientId,
        }),
      })

      onSuccess()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePayment} className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Lock size={14} className="text-blue-700" />
        <span className="text-xs text-slate-500 font-medium">Secured by Stripe — your card details are never stored on our servers</span>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-sm font-semibold text-blue-900">Your plan: <span className="capitalize">{plan}</span> — {planLabel}</p>
        <p className="text-xs text-blue-700 mt-0.5">+ 2.5% on each bill payment processed. First charge today.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Card Details</label>
        <div className="border border-slate-200 rounded-xl px-4 py-3.5 bg-white focus-within:border-blue-400 transition-colors">
          <CardElement options={{
            style: {
              base: { fontSize: '14px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } },
              invalid: { color: '#ef4444' },
            },
            hidePostalCode: true,
          }} />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : <><Lock size={15} /> Start My Subscription</>}
      </button>
      <p className="text-xs text-slate-400 text-center">Cancel anytime. No setup fees.</p>
    </form>
  )
}

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signupResult, setSignupResult] = useState<SignupResult | null>(null)
  const [form, setForm] = useState({
    familyName: '', familyPhone: '', familyEmail: '',
    parentName: '', parentAddress: '', parentCity: '',
    plan: 'essential', notes: '',
  })
  const [bills, setBills] = useState<Bill[]>([emptyBill()])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function updateBill(i: number, field: keyof Bill, value: string) {
    setBills((prev) => prev.map((b, idx) => idx === i ? { ...b, [field]: value } : b))
  }

  function addBill() { setBills((prev) => [...prev, emptyBill()]) }
  function removeBill(i: number) { setBills((prev) => prev.filter((_, idx) => idx !== i)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await submitOneBillSignup({
        ...form,
        bills: bills.filter(b => b.provider || b.billType),
      })
      setSignupResult(result)
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re all set!</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your subscription is active. We&apos;ll be in touch within 1 business day to confirm your bills and get everything set up.
          </p>
        </div>
      </div>
    )
  }

  const totalSteps = 4

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Get Started</h1>
          <p className="text-slate-500">Takes about 5 minutes. We&apos;ll handle everything from there.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-400'
              }`}>{s}</div>
              {s < totalSteps && <div className={`w-10 h-0.5 ${step > s ? 'bg-blue-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-xs text-slate-400 mb-8">
          <span className={step >= 1 ? 'text-blue-700 font-medium' : ''}>Your Info</span>
          <span className={step >= 2 ? 'text-blue-700 font-medium' : ''}>Parent Info</span>
          <span className={step >= 3 ? 'text-blue-700 font-medium' : ''}>Bills & Plan</span>
          <span className={step >= 4 ? 'text-blue-700 font-medium' : ''}>Payment</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Your contact information</h2>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Your Full Name</label>
                <input name="familyName" required value={form.familyName} onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                  <input name="familyPhone" required value={form.familyPhone} onChange={handleChange}
                    placeholder="905-555-1234"
                    className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <input name="familyEmail" type="email" required value={form.familyEmail} onChange={handleChange}
                    placeholder="jane@email.com"
                    className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)}
                disabled={!form.familyName || !form.familyPhone || !form.familyEmail}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
                Next <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Senior&apos;s information</h2>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Senior&apos;s Full Name</label>
                <input name="parentName" required value={form.parentName} onChange={handleChange}
                  placeholder="Margaret Smith"
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Street Address</label>
                <input name="parentAddress" required value={form.parentAddress} onChange={handleChange}
                  placeholder="123 Main St"
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">City</label>
                <input name="parentCity" required value={form.parentCity} onChange={handleChange}
                  placeholder="Whitby"
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                  Back
                </button>
                <button type="button" onClick={() => setStep(3)}
                  disabled={!form.parentName || !form.parentAddress || !form.parentCity}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plan */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Choose a plan</h2>
                <div className="space-y-3">
                  {PLANS.map((plan) => {
                    const Icon = plan.icon
                    return (
                      <label key={plan.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.plan === plan.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <input type="radio" name="plan" value={plan.id}
                          checked={form.plan === plan.id}
                          onChange={(e) => setForm({ ...form, plan: e.target.value })}
                          className="sr-only" />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          form.plan === plan.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                        }`}><Icon size={18} /></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                            <span className="font-bold text-blue-700 text-sm">{plan.price}</span>
                          </div>
                          <p className="text-slate-500 text-xs mt-0.5">{plan.desc}</p>
                        </div>
                        {form.plan === plan.id && <CheckCircle size={18} className="text-blue-600 shrink-0" />}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Bills */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-bold text-slate-900">Bills to consolidate</h2>
                  <button type="button" onClick={addBill}
                    className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-600 font-semibold">
                    <Plus size={14} /> Add bill
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">Add each bill with account details — the more you add now, the faster we get set up.</p>
                <div className="space-y-3">
                  {bills.map((bill, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-500">Bill {i + 1}</span>
                        {bills.length > 1 && (
                          <button type="button" onClick={() => removeBill(i)}
                            className="text-slate-300 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Provider / Company</label>
                          <input value={bill.provider} onChange={(e) => updateBill(i, 'provider', e.target.value)}
                            placeholder="e.g. Hydro One"
                            className="w-full border border-slate-200 focus:border-blue-400 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none bg-white transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Bill Type</label>
                          <select value={bill.billType} onChange={(e) => updateBill(i, 'billType', e.target.value)}
                            className="w-full border border-slate-200 focus:border-blue-400 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none bg-white transition-colors">
                            <option value="">Select type...</option>
                            {BILL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Account Number <span className="text-slate-300">(optional)</span></label>
                          <input value={bill.accountNumber} onChange={(e) => updateBill(i, 'accountNumber', e.target.value)}
                            placeholder="e.g. 1234567890"
                            className="w-full border border-slate-200 focus:border-blue-400 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none bg-white transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Monthly Amount <span className="text-slate-300">(optional)</span></label>
                          <input value={bill.monthlyAmount} onChange={(e) => updateBill(i, 'monthlyAmount', e.target.value)}
                            placeholder="e.g. 120.00" type="number" step="0.01"
                            className="w-full border border-slate-200 focus:border-blue-400 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none bg-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Anything else? <span className="text-slate-400">(optional)</span></label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Access notes, medical conditions, preferred contact times..."
                  rows={3}
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                  Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  {loading ? 'Saving...' : <>Continue to Payment <ArrowRight size={16} /></>}
                </button>
              </div>
            </form>
          )}

          {/* Step 4 — Payment */}
          {step === 4 && signupResult && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-5">Set up payment</h2>
              <Elements stripe={stripePromise}>
                <PaymentStep
                  result={signupResult}
                  plan={form.plan}
                  onSuccess={() => setSubmitted(true)}
                />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
