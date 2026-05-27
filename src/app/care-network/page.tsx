'use client'

import { useState } from 'react'
import { CheckCircle, Users, ArrowRight } from 'lucide-react'

export default function CareNetworkPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('One Bill — Care Network Interest')
    const body = encodeURIComponent(
      `Care Network interest:\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nNotes: ${form.notes || 'None'}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/12 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Users size={13} /> Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Care Network —<br />
            <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">Trusted care workers, on demand.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Book vetted PSW care workers for check-ins, medication reminders, companionship, and daily assistance — all through your One Bill account. Register your interest below.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">What&apos;s coming</h2>
          <ul className="space-y-3 mb-6">
            {[
              'Background-checked, bonded PSW workers',
              'Scheduled check-ins and daily visits',
              'Medication reminders and assistance',
              'Companionship and social visits',
              'Real-time family notifications',
              'Integrated with your One Bill plan',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle size={15} className="text-violet-500 mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
            <p className="text-violet-800 text-sm font-semibold mb-1">Launching in Durham Region first</p>
            <p className="text-violet-700 text-sm">Register below and we&apos;ll contact you as soon as the Care Network is live in your area.</p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm h-full flex flex-col items-center justify-center">
              <CheckCircle size={48} className="text-violet-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">You&apos;re on the list!</h3>
              <p className="text-slate-500 text-sm">We&apos;ll be in touch when the Care Network launches in Durham Region.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Register Your Interest</h2>
              {[
                { name: 'name', label: 'Full Name', placeholder: 'Jane Smith', type: 'text' },
                { name: 'phone', label: 'Phone', placeholder: '905-555-1234', type: 'text' },
                { name: 'email', label: 'Email', placeholder: 'jane@email.com', type: 'email' },
                { name: 'city', label: 'City', placeholder: 'Whitby', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{field.label}</label>
                  <input name={field.name} required type={field.type}
                    value={form[field.name as keyof typeof form]} onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Anything to share? <span className="text-slate-400">(optional)</span></label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Type of care needed, frequency, questions..."
                  rows={3}
                  className="w-full border border-slate-200 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Register Interest <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
