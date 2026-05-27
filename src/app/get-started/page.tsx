'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, DollarSign, Heart, Users } from 'lucide-react'

const BILLS = [
  'Hydro One', 'Enbridge Gas', 'Rogers', 'Bell', 'Telus',
  'Property Tax', 'Home Insurance', 'Car Insurance',
  'Internet', 'Cable / Streaming', 'Credit Card', 'Other',
]

const PLANS = [
  {
    id: 'essential',
    name: 'Essential',
    price: '$39/mo',
    desc: 'Bill consolidation + family dashboard',
    icon: DollarSign,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$89/mo',
    desc: 'Everything + monthly Mobile Teller home visit',
    icon: Heart,
  },
  {
    id: 'full-care',
    name: 'Full Care',
    price: 'Custom',
    desc: 'Premium + PSW care workers + pod consultation',
    icon: Users,
  },
]

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    familyName: '', familyPhone: '', familyEmail: '',
    parentName: '', parentAddress: '', parentCity: '',
    plan: 'premium',
    bills: [] as string[],
    notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleBill(bill: string) {
    setForm((f) => ({
      ...f,
      bills: f.bills.includes(bill) ? f.bills.filter((b) => b !== bill) : [...f.bills, bill],
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('One Bill — New Family Sign-Up')
    const body = encodeURIComponent(
      `New sign-up from One Bill:\n\n` +
      `--- FAMILY ---\n` +
      `Name: ${form.familyName}\nPhone: ${form.familyPhone}\nEmail: ${form.familyEmail}\n\n` +
      `--- PARENT ---\n` +
      `Name: ${form.parentName}\nAddress: ${form.parentAddress}, ${form.parentCity}\n\n` +
      `--- PLAN ---\n${form.plan.toUpperCase()}\n\n` +
      `--- BILLS TO CONSOLIDATE ---\n${form.bills.join(', ') || 'Not specified'}\n\n` +
      `--- NOTES ---\n${form.notes || 'None'}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} className="text-teal-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re all set!</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Thanks for signing up. We&apos;ll be in touch within 1 business day to confirm your plan and get everything set up for your parent.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Get Started</h1>
          <p className="text-slate-500">Takes about 5 minutes. We&apos;ll handle everything from there.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-400'
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-teal-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 text-xs text-slate-400 mb-8 -mt-4">
          <span className={step >= 1 ? 'text-teal-600 font-medium' : ''}>Your Info</span>
          <span className={step >= 2 ? 'text-teal-600 font-medium' : ''}>Parent Info</span>
          <span className={step >= 3 ? 'text-teal-600 font-medium' : ''}>Plan & Bills</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">

            {/* Step 1 — Family info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Your contact information</h2>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Your Full Name</label>
                  <input name="familyName" required value={form.familyName} onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                    <input name="familyPhone" required value={form.familyPhone} onChange={handleChange}
                      placeholder="905-555-1234"
                      className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                    <input name="familyEmail" type="email" required value={form.familyEmail} onChange={handleChange}
                      placeholder="jane@email.com"
                      className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  disabled={!form.familyName || !form.familyPhone || !form.familyEmail}
                  className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2 — Parent info */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Your parent&apos;s information</h2>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Parent&apos;s Full Name</label>
                  <input name="parentName" required value={form.parentName} onChange={handleChange}
                    placeholder="Margaret Smith"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Their Street Address</label>
                  <input name="parentAddress" required value={form.parentAddress} onChange={handleChange}
                    placeholder="123 Main St"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">City</label>
                  <input name="parentCity" required value={form.parentCity} onChange={handleChange}
                    placeholder="Whitby"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(3)}
                    disabled={!form.parentName || !form.parentAddress || !form.parentCity}
                    className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Plan + Bills */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Choose your plan</h2>
                  <div className="space-y-3">
                    {PLANS.map((plan) => {
                      const Icon = plan.icon
                      return (
                        <label key={plan.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          form.plan === plan.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          <input type="radio" name="plan" value={plan.id}
                            checked={form.plan === plan.id}
                            onChange={(e) => setForm({ ...form, plan: e.target.value })}
                            className="sr-only" />
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            form.plan === plan.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                              <span className="font-bold text-teal-600 text-sm">{plan.price}</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-0.5">{plan.desc}</p>
                          </div>
                          {form.plan === plan.id && <CheckCircle size={18} className="text-teal-500 shrink-0" />}
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-1">Which bills do we consolidate?</h2>
                  <p className="text-xs text-slate-400 mb-3">Select all that apply — we&apos;ll confirm the details with you.</p>
                  <div className="flex flex-wrap gap-2">
                    {BILLS.map((bill) => (
                      <button key={bill} type="button" onClick={() => toggleBill(bill)}
                        className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                          form.bills.includes(bill)
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'border-slate-200 text-slate-600 hover:border-teal-300'
                        }`}>
                        {bill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Anything else we should know? <span className="text-slate-400">(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    placeholder="Medical conditions, access notes, preferred contact times..."
                    rows={3}
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                    Back
                  </button>
                  <button type="submit"
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                    Submit <ArrowRight size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-400 text-center">We&apos;ll contact you within 1 business day to confirm everything.</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
