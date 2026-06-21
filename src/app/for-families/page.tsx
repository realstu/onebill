import Link from 'next/link'
import { ArrowRight, CheckCircle, Heart, Phone, Shield, Clock, Bell } from 'lucide-react'

const WORRIES = [
  { worry: 'Did the hydro bill get paid this month?', solution: 'We pay it. You get a confirmation.' },
  { worry: "There was a suspicious call about the account.", solution: 'One Bill monitors and alerts you to anything unusual.' },
  { worry: "I live 2 hours away and can't check in often.", solution: 'Log into the dashboard anytime and see exactly what was paid.' },
  { worry: 'Keeping track of which bills are due when is exhausting.', solution: 'There is only one bill now. One date. We handle the rest.' },
]

const STEPS = [
  { step: '01', title: 'Sign up in 5 minutes', desc: 'Fill in your details, the account address, and which bills to consolidate. Upload bill photos or enter details manually.' },
  { step: '02', title: 'We set everything up', desc: 'We review your account within 1 business day, verify bill details, and get everything configured.' },
  { step: '03', title: 'One bill. One date.', desc: 'One payment goes out each month covering every bill. Simple, predictable, stress-free.' },
  { step: '04', title: 'Full visibility', desc: 'Check the dashboard anytime. See exactly what was paid, when, and to whom. No surprises.' },
]

export default function ForFamiliesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-blue-700/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-600/25 text-blue-300 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <Heart size={13} /> For Families
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Stop worrying about<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">the bills.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            You sign up. You pay the plan. Everyone gets simplicity and you get to stop worrying.
          </p>
          <Link href="/get-started"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25">
            Get Started <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Worry → Solution */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Sound Familiar?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">The worry stops here.</h2>
          </div>
          <div className="space-y-3">
            {WORRIES.map((item) => (
              <div key={item.worry} className="grid md:grid-cols-2 gap-0 bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <p className="text-slate-600 text-sm italic">&ldquo;{item.worry}&rdquo;</p>
                </div>
                <div className="p-5 flex items-center gap-3 bg-blue-50">
                  <CheckCircle size={16} className="text-blue-600 shrink-0" />
                  <p className="text-slate-700 text-sm font-medium">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">You set it up once. It runs itself.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <div key={s.step} className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="absolute top-5 right-5 text-5xl font-black text-slate-100 leading-none select-none">{s.step}</div>
                <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan comparison */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Plans</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Simple plans. No surprises.</h2>
        </div>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 text-xl mb-1">Essential</h3>
            <div className="text-3xl font-extrabold text-slate-900 mb-4">$29<span className="text-base font-normal text-slate-400">/mo</span></div>
            <p className="text-slate-500 text-sm mb-4">Up to 8 bills consolidated.</p>
            <ul className="space-y-2 mb-6">
              {['All bills consolidated', 'One monthly payment', 'Family dashboard', 'Confirmation alerts'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={13} className="text-blue-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/get-started" className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl text-sm transition-colors">
              Choose Essential
            </Link>
          </div>
          <div className="relative bg-blue-700 border border-blue-700 rounded-2xl p-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="font-bold text-white text-xl mb-1">Premium</h3>
            <div className="text-3xl font-extrabold text-white mb-4">$49<span className="text-base font-normal text-blue-200">/mo</span></div>

            <p className="text-blue-200 text-sm mb-4">Unlimited bills, priority support.</p>
            <ul className="space-y-2 mb-6">
              {['Everything in Essential', 'Unlimited bills', 'Priority phone support', 'Monthly account review report'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle size={13} className="text-blue-200 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/get-started" className="block text-center bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 rounded-xl text-sm transition-colors">
              Choose Premium
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Ready to simplify everything?</h2>
          <p className="text-slate-500 text-sm mb-7">Takes 5 minutes. We handle everything from there.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm">
              <Phone size={15} /> Talk to Us First
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
