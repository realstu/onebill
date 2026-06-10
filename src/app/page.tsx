import Link from 'next/link'
import { ArrowRight, CheckCircle, DollarSign, Phone, Star, MapPin, Shield, Bell, LayoutDashboard } from 'lucide-react'

const PROBLEM_STATS = [
  { value: '12+', label: 'Bills the average senior manages every month' },
  { value: '1 in 5', label: 'Seniors miss a bill payment due to confusion' },
  { value: '$150+', label: 'Average late fees and penalties per year' },
  { value: '67%', label: 'Of seniors feel overwhelmed by their finances' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'You sign up for your parent',
    desc: 'Takes 10 minutes. Tell us which bills to consolidate and choose your plan. You pay — your parent gets the simplicity.',
  },
  {
    step: '02',
    title: 'We set everything up',
    desc: "We contact each provider and set up payment coordination. Your parent's accounts stay in their name — we just handle the scheduling and payments.",
  },
  {
    step: '03',
    title: 'One payment. Every month.',
    desc: 'You get one invoice on one date. We pay every bill on time. Log in anytime to see exactly what was paid, when, and to whom.',
  },
]

const FEATURES = [
  { icon: DollarSign, title: 'All bills in one place', desc: 'Utilities, insurance, phone, internet, property tax — everything consolidated into a single monthly payment.' },
  { icon: Bell, title: 'Never miss a due date', desc: 'We track every billing cycle and pay on time, every time. No more late fees or service interruptions.' },
  { icon: LayoutDashboard, title: 'Family dashboard', desc: 'Log in anytime to see payment history, upcoming bills, and account status. Full transparency.' },
  { icon: Shield, title: 'Fraud protected', desc: 'Stripe-powered payments with built-in fraud detection on every transaction.' },
]

const PRICING = [
  {
    name: 'Essential',
    price: '$39',
    period: '/month',
    transaction: '2.5%',
    desc: 'One flat monthly fee plus a small percentage on each bill we process.',
    features: [
      '$39/month flat fee',
      '2.5% per bill payment processed',
      'Up to 8 bills',
      'Family dashboard access',
      'Email & SMS confirmations',
      'Phone support',
    ],
    example: 'e.g. $800/mo in bills = $59/mo total',
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$69',
    period: '/month',
    transaction: '2.5%',
    desc: 'Best for families managing 8+ bills. Unlimited consolidation, priority support.',
    features: [
      '$69/month flat fee',
      '2.5% per bill payment processed',
      'Unlimited bills',
      'Family dashboard access',
      'Email & SMS confirmations',
      'Priority phone support',
      'Monthly account review report',
    ],
    example: 'e.g. $1,200/mo in bills = $99/mo total',
    cta: 'Get Started',
    highlight: true,
  },
]

const TESTIMONIALS = [
  {
    name: 'Karen M.',
    relation: 'Daughter — Whitby, ON',
    text: "My dad had 11 different bills coming in at different times. He'd miss payments, get stressed, call me every week. One Bill changed everything. I check the dashboard once a month and that's it.",
    rating: 5,
  },
  {
    name: 'Robert T.',
    relation: 'Son — Ajax, ON',
    text: "Mom was getting late notices constantly. She didn't even realize she was missing payments. One Bill sorted it out in a week. Haven't had a single issue since.",
    rating: 5,
  },
  {
    name: 'Patricia W.',
    relation: 'Client — Oshawa, ON',
    text: "I'm 74 and I was drowning in paperwork. My daughter set this up and now I have one bill, one date, and I never worry about it. Simple as that.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-blue-700/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-14 md:pt-28 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-600/25 text-blue-300 text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-full mb-6">
            <MapPin size={12} /> Serving Durham Region, Ontario
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-5 md:mb-6">
            All their bills.<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              One payment.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            One Bill consolidates every bill your parent has — utilities, insurance, phone, internet — into a single monthly payment. You pay once. We handle everything else.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 md:mb-16">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get Started <ArrowRight size={17} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-xl transition-colors"
            >
              See How It Works
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-3xl mx-auto">
            {PROBLEM_STATS.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl px-3 md:px-4 py-4 md:py-5">
                <div className="text-xl md:text-2xl font-bold text-blue-400">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
            Managing a senior&apos;s bills is overwhelming.<br className="hidden md:block" /> For them and for you.
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Between utilities, insurance, phone bills, internet, property tax, and subscriptions — the average senior juggles 12+ separate bills with different due dates, different portals, and different account numbers. Miss one and there are late fees, service cutoffs, and stress. One Bill fixes this completely.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Everything handled. Nothing missed.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all">
                  <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Set up in 10 minutes. Peace of mind forever.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
                <div className="absolute top-5 right-6 text-5xl font-black text-slate-100 leading-none select-none">{i + 1}</div>
                <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-11 h-11 rounded-xl flex items-center justify-center mb-4 font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple plans. No surprises.</h2>
            <p className="text-slate-500 mt-3 text-base md:text-lg">Low base fee + a small charge per bill. Only pay for what we handle.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-blue-950 border-slate-700 ring-2 ring-blue-600/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period} + {plan.transaction}</span>
                </div>
                <div className={`text-xs font-semibold mb-6 ${plan.highlight ? 'text-blue-400' : 'text-blue-700'}`}>
                  {plan.example}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CheckCircle size={15} className="text-blue-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started"
                  className={`block text-center font-bold py-3 rounded-xl transition-colors text-sm ${
                    plan.highlight
                      ? 'bg-blue-700 hover:bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            Not sure which plan?{' '}
            <Link href="/contact" className="text-blue-700 hover:underline font-medium">Talk to us</Link>
            {' '}— we&apos;ll recommend the right fit.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Families We&apos;ve Helped</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Real families. Real peace of mind.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-blue-600 text-blue-600" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.relation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="relative bg-blue-950 text-white py-16 md:py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-700/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Stop worrying about<br />their bills. Start today.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10">
            Set up in 10 minutes. We handle everything from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-600/20"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4 rounded-xl transition-colors"
            >
              <Phone size={17} /> Talk to Someone
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
