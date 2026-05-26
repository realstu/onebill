import Link from 'next/link'
import {
  ArrowRight, CheckCircle, Heart, Shield, Users, Home,
  Calendar, DollarSign, Phone, Star, MapPin, Zap
} from 'lucide-react'

const PILLARS = [
  {
    icon: DollarSign,
    color: 'teal',
    label: 'One Bill Financial',
    href: '/financial',
    tagline: 'One payment. Zero confusion.',
    desc: 'We consolidate every bill — utilities, insurance, phone, internet — into a single monthly payment. Your parent pays once. We handle everything else.',
    features: ['All bills consolidated into one', 'One payment on one date', 'Family dashboard to monitor spending', 'Never a late payment again'],
    badge: 'Most Popular',
  },
  {
    icon: Heart,
    color: 'rose',
    label: 'Mobile Teller',
    href: '/mobile-teller',
    tagline: 'A friendly face, once a month.',
    desc: 'A trusted, background-checked Mobile Teller visits your parent at home to review finances together, answer questions, help with paperwork, and make sure everything is on track.',
    features: ['Monthly in-home visit', 'Bill and statement review', 'Paperwork & cheque assistance', 'Wellness check-in included'],
    badge: 'Premium',
  },
  {
    icon: Home,
    color: 'amber',
    label: 'Senior Pods',
    href: '/pods',
    tagline: 'Close to family. Independent living.',
    desc: 'A beautiful backyard suite installed on your property — purpose-built for seniors. Keep mom or dad close, safe, and independent at a fraction of retirement home costs.',
    features: ['Prefab garden suites from $90K', 'Dementia-friendly design options', 'Legal on most Ontario lots (Bill 23)', 'Lifetime referral partnership pricing'],
    badge: 'Coming Soon',
  },
  {
    icon: Users,
    color: 'violet',
    label: 'Care Network',
    href: '/care-network',
    tagline: 'Trusted care workers, on demand.',
    desc: 'Book vetted PSW care workers for scheduled check-ins, medication reminders, companionship visits, and daily assistance — all through one platform.',
    features: ['Background-checked PSW workers', 'Flexible scheduling', 'Real-time family notifications', 'Integrated with your One Bill plan'],
    badge: 'Coming Soon',
  },
]

const PROBLEM_STATS = [
  { value: '$4,500', label: 'Average monthly cost of memory care in Ontario' },
  { value: '12+', label: 'Bills the average senior manages every month' },
  { value: '67%', label: 'Of seniors feel overwhelmed by their finances' },
  { value: '1 in 5', label: 'Seniors miss bill payments due to confusion' },
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
    desc: "We contact each provider, set up payments, and confirm every bill is covered. Your parent's accounts stay in their name — we just coordinate.",
  },
  {
    step: '03',
    title: 'One payment. Every month.',
    desc: 'You get one invoice. We pay everything on time. Your parent gets a monthly visit from their Mobile Teller. Everyone sleeps better.',
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
    text: 'The Mobile Teller service is worth every penny. Someone actually sits down with mom, goes through her statements, answers her questions. She looks forward to the visits.',
    rating: 5,
  },
  {
    name: 'Patricia W.',
    relation: 'Client — Oshawa, ON',
    text: "I'm 74 and I was drowning in paperwork. My daughter set this up and now I have one bill, one date, and a lovely young woman who comes to see me once a month. Simple as that.",
    rating: 5,
  },
]

const PRICING = [
  {
    name: 'Essential',
    price: '$39',
    period: '/month',
    desc: 'Bill consolidation for families who want simplicity.',
    features: [
      'Up to 8 bills consolidated',
      'Single monthly payment',
      'Family dashboard access',
      'Email & SMS confirmations',
      'Phone support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$89',
    period: '/month',
    desc: 'Everything in Essential plus a real human at the door.',
    features: [
      'Unlimited bills consolidated',
      'Single monthly payment',
      'Family dashboard access',
      'Monthly Mobile Teller home visit',
      'Wellness check-in report to family',
      'Priority phone support',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Full Care',
    price: 'Custom',
    period: '',
    desc: 'Premium plan plus care worker scheduling and pod referral.',
    features: [
      'Everything in Premium',
      'Care worker booking (PSW)',
      'Senior Pod consultation & referral',
      'Dedicated family coordinator',
      'Emergency contact protocol',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/20',   text: 'text-teal-600',   badge: 'bg-teal-500' },
  rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/20',   text: 'text-rose-600',   badge: 'bg-rose-500' },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  text: 'text-amber-600',  badge: 'bg-amber-500' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-600', badge: 'bg-violet-500' },
}

export default function HomePage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-teal-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-teal-900/30 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-14 md:pt-28 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/25 text-teal-300 text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-full mb-6">
            <MapPin size={12} /> Serving Durham Region, Ontario
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-5 md:mb-6">
            Keep mom close.<br />
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
              Keep it affordable.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            One Bill consolidates every bill into a single monthly payment, sends a trusted Mobile Teller to your parent&apos;s door, and connects them with care workers — so you stop worrying and they stay independent.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 md:mb-16">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/25"
            >
              Get Started for Your Parent <ArrowRight size={17} />
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
                <div className="text-xl md:text-2xl font-bold text-teal-400">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
            Managing a senior&apos;s finances is a full-time job.<br className="hidden md:block" /> No family should do it alone.
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Between utilities, insurance, phone bills, internet, property tax, and credit cards — the average senior juggles 12+ separate bills. Miss one and there are late fees, service cutoffs, and stress. Add early-stage dementia and it becomes a crisis. Retirement homes cost $4,500–$8,000 a month. There has to be a better way.
          </p>
        </div>
      </section>

      {/* ── FOUR PILLARS ─────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">One platform. Four ways we help.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              const c = colorMap[pillar.color]
              return (
                <Link
                  key={pillar.label}
                  href={pillar.href}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${c.bg} ${c.border} border ${c.text} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <Icon size={22} />
                    </div>
                    <span className={`${c.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-slate-900 font-bold text-xl mb-1">{pillar.label}</h3>
                  <p className={`${c.text} font-semibold text-sm mb-3`}>{pillar.tagline}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {pillar.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle size={14} className={`${c.text} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex items-center gap-1 ${c.text} text-sm font-semibold group-hover:gap-2 transition-all`}>
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Set up in 10 minutes. Peace of mind forever.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
                <div className="absolute top-5 right-6 text-5xl font-black text-slate-100 leading-none select-none">{i + 1}</div>
                <div className="bg-teal-500/10 border border-teal-500/20 text-teal-600 w-11 h-11 rounded-xl flex items-center justify-center mb-4 font-bold text-sm">
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple plans. No surprises.</h2>
            <p className="text-slate-500 mt-3 text-base md:text-lg">Compare this to $4,500/month for a retirement home.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-slate-900 border-slate-700 ring-2 ring-teal-500/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm mb-1 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CheckCircle size={15} className="text-teal-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.cta === 'Contact Us' ? '/contact' : '/get-started'}
                  className={`block text-center font-bold py-3 rounded-xl transition-colors text-sm ${
                    plan.highlight
                      ? 'bg-teal-500 hover:bg-teal-400 text-white'
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
            <Link href="/contact" className="text-teal-600 hover:underline font-medium">Talk to us</Link>
            {' '}— we&apos;ll recommend the right fit.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Families We&apos;ve Helped</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Real families. Real peace of mind.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-teal-500 text-teal-500" />
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
      <section className="relative bg-slate-900 text-white py-16 md:py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart size={18} className="text-teal-400" />
            <span className="text-teal-400 font-semibold text-sm">Built for Durham Region families</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Your parent deserves<br />to live with dignity.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10">
            Get started today. We&apos;ll handle the bills, send someone to the door, and make sure they&apos;re never alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-teal-500/20"
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
