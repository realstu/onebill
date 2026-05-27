'use client'

import { useState } from 'react'
import { CheckCircle, Home, ArrowRight, MapPin } from 'lucide-react'

export default function PodsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('One Bill — Senior Pods Interest')
    const body = encodeURIComponent(
      `Senior Pods interest:\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nNotes: ${form.notes || 'None'}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-amber-600/12 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Home size={13} /> Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Senior Pods —<br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Independent living, close to family.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Purpose-built backyard suites for seniors. Keep mom or dad close, safe, and independent — at a fraction of the cost of a retirement home. Register your interest and be first to know when we launch.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">What to expect</h2>
          <ul className="space-y-3 mb-6">
            {[
              'Prefab garden suites from ~$90,000',
              'Dementia-friendly design options available',
              'Legal on most Ontario lots under Bill 23',
              'Partnered with trusted local builders',
              'One Bill care services fully integrated',
              'Significant savings vs. retirement homes ($4,500+/mo)',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle size={15} className="text-amber-500 mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-amber-800 text-sm font-semibold mb-1">Launching in Durham Region first</p>
            <p className="text-amber-700 text-sm">Register below to be first on the list when pods become available in your area.</p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm h-full flex flex-col items-center justify-center">
              <CheckCircle size={48} className="text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">You&apos;re on the list!</h3>
              <p className="text-slate-500 text-sm">We&apos;ll reach out as soon as Senior Pods launches in your area.</p>
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
                    className="w-full border border-slate-200 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Any details? <span className="text-slate-400">(optional)</span></label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Lot size, timeline, questions..."
                  rows={3}
                  className="w-full border border-slate-200 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Register Interest <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
