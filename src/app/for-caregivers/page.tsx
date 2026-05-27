'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Heart, Clock, DollarSign, Users, Shield } from 'lucide-react'

const BENEFITS = [
  { icon: DollarSign, title: 'Competitive pay', desc: 'Earn above-market rates for Mobile Teller visits. Transparent per-visit compensation with no hidden deductions.' },
  { icon: Clock, title: 'Flexible scheduling', desc: 'Set your own availability. Work as many or as few visits as you like — build a schedule around your life.' },
  { icon: Users, title: 'Meaningful work', desc: 'You are not just reviewing statements. You are the trusted face a senior looks forward to seeing every month.' },
  { icon: Shield, title: 'Full support', desc: 'Training, certification, insurance coverage, and a dedicated coordinator to support you on every visit.' },
]

const REQUIREMENTS = [
  'Clean background check & police clearance',
  'Valid Ontario driver\'s license',
  'Reliable transportation',
  'Strong communication skills',
  'Comfort working with seniors',
  'PSW certification is an asset (not required)',
]

export default function ForCaregiversPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', experience: '', availability: '', notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('One Bill — Mobile Teller Application')
    const body = encodeURIComponent(
      `New Mobile Teller application:\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\n` +
      `Experience: ${form.experience}\nAvailability: ${form.availability}\nNotes: ${form.notes || 'None'}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/12 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <Heart size={13} /> Join Our Team
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Become a Mobile Teller.<br />
            <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">Make a real difference.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Join the One Bill care team as a Mobile Teller. Visit seniors in their homes, help them with their finances, and become the friendly face their family counts on.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 md:py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Why Join Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Work that matters. On your terms.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {BENEFITS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="bg-violet-500/10 border border-violet-500/20 text-violet-600 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Requirements + Form */}
      <section className="max-w-5xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10">

        {/* Requirements */}
        <div>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">What We Look For</p>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Requirements</h2>
          <ul className="space-y-3 mb-8">
            {REQUIREMENTS.map((r) => (
              <li key={r} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle size={15} className="text-violet-500 shrink-0" /> {r}
              </li>
            ))}
          </ul>
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
            <p className="text-violet-800 text-sm font-semibold mb-1">No financial background required</p>
            <p className="text-violet-700 text-sm leading-relaxed">
              We train you on everything you need to know. If you are compassionate, reliable, and good with people — we can teach the rest.
            </p>
          </div>
        </div>

        {/* Application form */}
        <div>
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center shadow-sm">
              <CheckCircle size={48} className="text-violet-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h3>
              <p className="text-slate-500 text-sm">We&apos;ll be in touch within 2 business days to discuss next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Apply Now</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder="905-555-1234"
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@email.com"
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">City</label>
                  <input name="city" required value={form.city} onChange={handleChange} placeholder="Whitby"
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Relevant experience</label>
                  <input name="experience" value={form.experience} onChange={handleChange} placeholder="PSW, banking, customer service, caregiving..."
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Availability</label>
                  <select name="availability" value={form.availability} onChange={handleChange}
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors bg-white">
                    <option value="">Select...</option>
                    <option>Weekdays only</option>
                    <option>Weekends only</option>
                    <option>Flexible — any day</option>
                    <option>Mornings preferred</option>
                    <option>Afternoons preferred</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Tell us a bit about yourself <span className="text-slate-400">(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    placeholder="Why do you want to work with seniors? Any relevant background?"
                    rows={3}
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
                </div>
              </div>
              <button type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Submit Application <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}
