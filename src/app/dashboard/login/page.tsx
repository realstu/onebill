'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Lock } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-700 text-white rounded-xl p-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M16 10h2M16 14h2M6 10h8M6 14h5"/>
              </svg>
            </div>
            <span className="text-slate-900 font-bold text-xl">One Bill</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Family Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to view your bills and account</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h2 className="font-bold text-slate-900 mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                We sent a sign-in link to <strong>{email}</strong>. Click it to access your dashboard — no password needed.
              </p>
              <button onClick={() => setSent(false)} className="mt-4 text-xs text-blue-700 hover:underline">
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@email.com"
                  className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                />
                <p className="text-xs text-slate-400 mt-1.5">Use the email you signed up with</p>
              </div>

              {error && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={14} />
                {loading ? 'Sending...' : 'Send Sign-In Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Not a client yet?{' '}
          <a href="/get-started" className="text-blue-700 hover:underline">Get started →</a>
        </p>

      </div>
    </div>
  )
}
