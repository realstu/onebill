'use client'

import { useState } from 'react'
import { sendMonthlyStatement } from './actions'
import { Send } from 'lucide-react'

export default function SendStatementButton({ clientId, email }: { clientId: string; email: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handle() {
    if (!confirm(`Send monthly statement to ${email}?`)) return
    setLoading(true)
    try {
      await sendMonthlyStatement(clientId)
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 transition-colors ${
        done
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-white border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-200'
      }`}
    >
      <Send size={12} />
      {done ? 'Sent!' : loading ? 'Sending...' : 'Send Statement'}
    </button>
  )
}
