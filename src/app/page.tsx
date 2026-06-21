import Link from 'next/link'
import { ArrowRight, CheckCircle, DollarSign, Phone, Star, MapPin, Shield, Bell, LayoutDashboard } from 'lucide-react'

const PROBLEM_STATS = [
  { value: '12+', label: 'Bills the average household manages monthly' },
  { value: '1 in 5', label: 'People miss a payment due to confusion' },
  { value: '$400+', label: 'Average cost of one missed utility payment' },
  { value: '67%', label: 'Of people feel overwhelmed managing their bills' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Sign up in minutes',
    desc: 'Takes 10 minutes. Tell us which bills to consolidate and choose your plan. Simple as that.',
  },
  {
    step: '02',
    title: 'We set everything up',
    desc: 'We contact each provider and set up payment coordination. All accounts stay in your name — we just handle the scheduling and payments.',
  },
  {
    step: '03',
    title: 'One payment. Every month.',
    desc: 'One invoice, one date. We pay every bill on time. Log in anytime to see exactly what was paid, when, and to whom.',
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
    price: '$29',
    period: '/month',
    transaction: '+ bills paid on your behalf',
    desc: 'Up to 8 bills consolidated.',
    features: [
      '$29/month flat service fee',
      'Up to 8 bills',
      'Monthly pre-authorization hold',
      'Family dashboard access',
      'Email confirmations',
      'Phone support',
    ],
    example: 'e.g. $800/mo in bills → $829/mo total',
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/month',
    transaction: '+ bills paid on your behalf',
    desc: 'Unlimited bills. Priority support.',
    features: [
      '$49/month flat service fee',
      'Unlimited bills',
      'Monthly pre-authorization hold',
      'Family dashboard access',
      'Email & SMS confirmations',
      'Priority phone support',
      'Monthly account review report',
    ],
    example: 'e.g. $1,200/mo in bills → $1,249/mo total',
    cta: 'Get Started',
    highlight: true,
  },
]

const TESTIMONIALS = [
  {
    name: 'Karen M.',
    relation: 'Whitby, ON',
    text: "There were 11 different bills coming in at different times — missed payments, stress, calls every week. One Bill changed everything. I check the dashboard once a month and that's it.",
    rating: 5,
  },
  {
    name: 'Robert T.',
    relation: 'Ajax, ON',
    text: "Late notices were piling up and nothing was getting paid on time. One Bill sorted it out in a week. Haven't had a single issue since.",
    rating: 5,
  },
  {
    name: 'Patricia W.',
    relation: 'Oshawa, ON',
    text: "I was drowning in paperwork and due dates. Now I have one bill, one date, and I never worry about it. Simple as that.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.6 }} />
        {/* Blue glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-14 md:pt-28 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-full mb-6">
            <MapPin size={12} /> Ontario, Canada
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-slate-900 mb-5 md:mb-6">
            Every bill.<br />
            <span className="text-blue-700">One payment.</span>
          </h1>

          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            One Bill consolidates every bill into a single monthly payment — utilities, insurance, phone, internet, and more. You pay once. We handle everything else.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 md:mb-20">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-xl transition-all shadow-lg shadow-blue-700/20 hover:shadow-blue-600/30"
            >
              Get Started <ArrowRight size={17} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-xl transition-colors"
            >
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {PROBLEM_STATS.map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-5 shadow-sm">
                <div className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-1">{s.value}</div>
                <div className="text-slate-500 text-xs leading-snug">{s.label}</div>
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
            Managing bills is overwhelming.<br className="hidden md:block" /> It doesn&apos;t have to be.
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Between utilities, insurance, phone, internet, property tax, and subscriptions — the average household juggles 12+ separate bills with different due dates, different portals, and different account numbers. Miss one and there are late fees, service cutoffs, and stress. One Bill fixes this completely.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Everything handled. Nothing missed.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="group bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all">
                  <div className="bg-blue-50 text-blue-700 w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <Icon size={20} />
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Set up in 10 minutes.<br className="hidden md:block" /> Runs itself after that.</h2>
          </div>

          {/* Vertical flow */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-blue-100 hidden md:block" />

            <div className="space-y-4">

              {/* Step 1 */}
              <div className="relative flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm z-10 shadow-lg shadow-blue-700/20">1</div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">You sign up & submit your bills</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Takes 10 minutes. Enter your bill details manually or snap a photo of each bill. We handle the rest from here.</p>
                    </div>
                    <div className="shrink-0 text-3xl">📋</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Hydro', 'Internet', 'Insurance', 'Gas', 'Phone', '+ more'].map(tag => (
                      <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm z-10 shadow-lg shadow-blue-700/20">2</div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">We review & set everything up</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Within 1 business day we verify your account details, contact your billers, and get everything configured. You'll get a confirmation once you're live.</p>
                    </div>
                    <div className="shrink-0 text-3xl">⚙️</div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm z-10 shadow-lg shadow-blue-700/20">3</div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">We pay every bill on time</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Each month we pay every biller directly. Every payment is logged and visible in your dashboard in real time. Nothing gets missed.</p>
                    </div>
                    <div className="shrink-0 text-3xl">💳</div>
                  </div>
                  <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Hydro One · paid</span>
                    <span className="text-green-600 font-semibold">✓ $143.20</span>
                  </div>
                  <div className="mt-1.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Rogers Internet · paid</span>
                    <span className="text-green-600 font-semibold">✓ $89.99</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm z-10 shadow-lg shadow-blue-700/20">4</div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">You get one approval request</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">We send you an email and text with an itemized summary of everything paid. One tap to approve and authorize your One Bill charge.</p>
                    </div>
                    <div className="shrink-0 text-3xl">📱</div>
                  </div>
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <p className="text-xs text-blue-800 font-medium">One Bill — June statement ready</p>
                    <p className="text-xs text-blue-600 mt-0.5">6 bills paid · Total charge: $97.40 · <span className="font-bold underline">Tap to approve</span></p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-extrabold text-sm z-10 shadow-lg shadow-green-600/20">✓</div>
                <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Done — same time next month</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">That's it. Every month runs the same way. No logins, no due dates to track, no missed payments. Just one notification and one tap.</p>
                    </div>
                    <div className="shrink-0 text-3xl">🎉</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/get-started"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple plans. No surprises.</h2>
            <p className="text-slate-500 mt-3 text-base">Low flat monthly fee. We pre-authorize your card for the bill total and only collect what was actually spent.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-blue-700 border-blue-700 shadow-2xl shadow-blue-700/25'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className={`text-5xl font-extrabold tracking-tight ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.period}</span>
                </div>
                <p className={`text-xs font-semibold mb-1 ${plan.highlight ? 'text-blue-200' : 'text-blue-700'}`}>{plan.transaction}</p>
                <div className={`text-xs font-medium mb-6 ${plan.highlight ? 'text-blue-100/70' : 'text-slate-400'}`}>
                  {plan.example}
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                      <CheckCircle size={15} className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-blue-600'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started"
                  className={`block text-center font-bold py-3 rounded-xl transition-colors text-sm ${
                    plan.highlight
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-700 text-white hover:bg-blue-600'
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
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">What Clients Are Saying</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Real people. Real peace of mind.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
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
      <section className="py-16 md:py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Ontario, Canada
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Stop worrying about<br />their bills. Start today.
          </h2>
          <p className="text-slate-500 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
            Set up in 10 minutes. We handle everything from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-700/20 hover:shadow-blue-600/30"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base px-8 py-4 rounded-xl transition-colors"
            >
              <Phone size={17} /> Talk to Someone
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
