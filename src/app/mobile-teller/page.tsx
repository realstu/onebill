import Link from 'next/link'
import { CheckCircle, ArrowRight, Heart, Shield, Calendar, Clock, Star, FileText, Coffee } from 'lucide-react'

const VISIT_INCLUDES = [
  { icon: FileText, title: 'Statement review', desc: 'Go through the month\'s payments together. Every line item explained in plain language.' },
  { icon: Shield, title: 'Fraud check', desc: 'Spot unusual charges, scam attempts, or billing errors before they become problems.' },
  { icon: FileText, title: 'Paperwork assistance', desc: 'Help with cheques, forms, government correspondence, and anything that has been piling up.' },
  { icon: Coffee, title: 'Wellness check-in', desc: 'A friendly face and a genuine conversation. Family receives a brief written summary after each visit.' },
  { icon: Calendar, title: 'Next month planning', desc: 'Review upcoming bills, flag any expected changes, and answer questions before they become worries.' },
  { icon: Clock, title: 'Flexible timing', desc: 'Morning, afternoon, or evening visits available. Scheduled at your parent\'s convenience.' },
]

const TELLER_STANDARDS = [
  'Background check & police clearance',
  'Bonded and insured',
  'Seniors care training',
  'One Bill certified',
  'Regular performance reviews',
  'Direct family feedback line',
]

const FAQ = [
  {
    q: 'How long is each visit?',
    a: 'Visits are typically 45–60 minutes. We never rush — your parent sets the pace.',
  },
  {
    q: 'Can I meet the Mobile Teller before they visit my parent?',
    a: 'Absolutely. We offer an introductory call or video chat so your parent and family feel comfortable before the first visit.',
  },
  {
    q: 'What if my parent does not get along with their assigned teller?',
    a: 'We will reassign immediately, no questions asked. The relationship has to feel right.',
  },
  {
    q: 'Is the Mobile Teller able to handle cash or make deposits?',
    a: 'Mobile Tellers can assist with paperwork and accompany your parent to the bank, but do not handle cash independently. This keeps everything transparent and safe.',
  },
  {
    q: 'Do I get a report after each visit?',
    a: 'Yes. Family members on the account receive a brief written summary within 24 hours of each visit — what was reviewed, anything flagged, and how your parent is doing.',
  },
]

export default function MobileTellerPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-rose-600/12 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <Heart size={13} /> Mobile Teller Service
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            A friendly face.<br />
            <span className="bg-gradient-to-r from-rose-400 to-rose-300 bg-clip-text text-transparent">Once a month. At the door.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Every Premium plan includes a monthly in-home visit from a trained, background-checked Mobile Teller — someone your parent can trust to sit down, review their finances, and genuinely check in.
          </p>
          <Link href="/get-started"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-rose-500/25">
            Get Started — $89/mo <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* What a visit includes */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-2">Every Visit</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">What your parent gets</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {VISIT_INCLUDES.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Teller standards */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-3">Our Standards</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Every Mobile Teller is vetted, trained, and trusted.</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              We don&apos;t just send anyone. Every Mobile Teller completes a rigorous screening process, receives seniors-specific training, and is continuously evaluated based on family feedback.
            </p>
            <ul className="space-y-3">
              {TELLER_STANDARDS.map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle size={15} className="text-rose-500 shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-rose-500 text-rose-500" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
              &ldquo;Our teller, Sarah, has been visiting my mother for four months now. Mom lights up when she comes. She helped catch a double-billing error on the Hydro account that we never would have spotted. This service is worth every dollar.&rdquo;
            </p>
            <div>
              <div className="font-semibold text-slate-900 text-sm">David K.</div>
              <div className="text-slate-400 text-xs">Son — Oshawa, ON</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="py-10 px-4 bg-rose-50 border-y border-rose-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div>
            <h3 className="font-bold text-slate-900 text-xl mb-1">Included in the Premium Plan</h3>
            <p className="text-slate-500 text-sm">Bill consolidation + monthly Mobile Teller visit — everything for $89/month.</p>
          </div>
          <Link href="/get-started"
            className="shrink-0 inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
