import Link from 'next/link'
import { CheckCircle, ArrowRight, DollarSign, Shield, Clock, Bell, LayoutDashboard, Phone } from 'lucide-react'

const BILLS_HANDLED = [
  'Hydro One / local utilities', 'Enbridge Gas', 'Rogers / Bell / Telus',
  'Internet & Cable', 'Home Insurance', 'Car Insurance',
  'Property Tax', 'Credit Cards', 'Subscription services', 'And more',
]

const HOW = [
  {
    icon: Phone,
    title: 'You submit your bills',
    desc: "After signing up, upload photos of your bills or enter account details manually. All accounts stay in your name — we just coordinate the payments.",
  },
  {
    icon: Shield,
    title: 'We set up payment coordination',
    desc: 'We schedule and track every payment on your behalf, making sure nothing is missed. We monitor for changes and alert you to anything unusual.',
  },
  {
    icon: DollarSign,
    title: 'One invoice. One date.',
    desc: 'You receive a single monthly invoice covering all bills plus our service fee. Pay it once and everything is handled.',
  },
  {
    icon: LayoutDashboard,
    title: 'Family dashboard',
    desc: 'Log in anytime to see exactly what was paid, when, and to whom. Full transparency. No surprises.',
  },
]

const FAQ = [
  {
    q: "Do my accounts stay in my name?",
    a: 'Yes. We never take ownership of any accounts. We are a coordination and payment service — you remain the account holder for everything.',
  },
  {
    q: 'What if a bill amount changes?',
    a: 'We monitor for changes and notify you before processing. You approve any significant changes before payment.',
  },
  {
    q: 'What if I have more than 8 bills?',
    a: 'The Essential plan covers up to 8 bills. Premium covers unlimited bills.',
  },
  {
    q: 'Is this a bank or financial institution?',
    a: 'No. One Bill is a care coordination service, not a bank. We help families manage and track bill payments — we do not hold deposits or provide financial advice.',
  },
  {
    q: 'How do I get started?',
    a: 'Click "Get Started" below. The sign-up takes about 5 minutes and we will be in touch within 1 business day.',
  },
]

export default function FinancialPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-blue-700/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-600/25 text-blue-300 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <DollarSign size={13} /> One Bill Financial
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Every bill. One payment.<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Zero confusion.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            We consolidate every bill into a single monthly payment. You pay once. We handle the rest.
          </p>
          <Link href="/get-started"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25">
            Get Started <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Bills we handle */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Coverage</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Bills we consolidate</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {BILLS_HANDLED.map((bill) => (
              <div key={bill} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 shadow-sm">
                <CheckCircle size={14} className="text-blue-600" /> {bill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How it works</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {HOW.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="text-slate-300 font-black text-3xl leading-none">0{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Simple, transparent pricing</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 text-xl mb-1">Essential</h3>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">$39<span className="text-base font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-500 text-sm mb-5">Up to 8 bills consolidated</p>
              <ul className="space-y-2.5 mb-6">
                {['Up to 8 bills', 'Single monthly payment', 'Family dashboard', 'Email & SMS confirmations', 'Phone support'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={14} className="text-blue-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/get-started" className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors text-sm">
                Get Started
              </Link>
            </div>
            <div className="relative bg-slate-900 border border-slate-700 ring-2 ring-blue-600/50 rounded-2xl p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-bold text-white text-xl mb-1">Premium</h3>
              <div className="text-3xl font-extrabold text-white mb-1">$49<span className="text-base font-normal text-slate-400">/mo</span></div>
              <p className="text-slate-400 text-sm mb-5">Unlimited bills + priority support</p>
              <ul className="space-y-2.5 mb-6">
                {['Unlimited bills', 'Single monthly payment', 'Family dashboard', 'Monthly account review report', 'Priority support'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-blue-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/get-started" className="block text-center bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/get-started"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Get Started Today <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
