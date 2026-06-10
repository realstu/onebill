'use client'

import { useState } from 'react'
import { CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

const TOPICS = ['General Inquiry', 'One Bill Financial', 'Mobile Teller', 'Senior Pods', 'Care Network', 'Caregiver Application', 'Partnership']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`One Bill — ${form.topic || 'Contact Form'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Get in Touch</h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
          Have a question about our services? Want to learn more before signing up? We&apos;re here to help.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-8">

        {/* Contact info */}
        <div className="space-y-5">
          <h2 className="font-bold text-slate-900 text-xl mb-6">Contact Information</h2>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={17} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">Phone</div>
              <a href="tel:647-980-8315" className="text-slate-500 text-sm hover:text-blue-700 transition-colors">647-980-8315</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <Mail size={17} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">Email</div>
              <a href="mailto:stuartoggrealtor@gmail.com" className="text-slate-500 text-sm hover:text-blue-700 transition-colors">stuartoggrealtor@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600/10 border border-blue-600/20 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={17} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">Service Area</div>
              <p className="text-slate-500 text-sm">Durham Region, Ontario<br />Whitby · Oshawa · Ajax · Pickering · Clarington</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4">
            <p className="text-teal-800 text-sm font-medium mb-1">Response time</p>
            <p className="text-teal-700 text-sm">We respond to all inquiries within 1 business day.</p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm h-full flex flex-col items-center justify-center">
              <CheckCircle size={48} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-500 text-sm">We&apos;ll be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="905-555-1234"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@email.com"
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Topic</label>
                  <select name="topic" value={form.topic} onChange={handleChange}
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors bg-white">
                    <option value="">Select a topic...</option>
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Message</label>
                  <textarea name="message" required value={form.message} onChange={handleChange}
                    placeholder="Tell us about your situation and how we can help..."
                    rows={5}
                    className="w-full border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors resize-none" />
                </div>
              </div>
              <button type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
