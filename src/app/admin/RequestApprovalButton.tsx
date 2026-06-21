'use client'

import { useState } from 'react'
import { requestApproval } from './actions'
import { Bell } from 'lucide-react'

export default function RequestApprovalButton({ clientId, email }: { clientId: string; email: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handle() {
    if (!confirm(`Send approval request to ${email}?`)) return
    setLoading(true)
    try {
      await requestApproval(clientId)
      setDone(true)
      setTimeout(() => setDone(false), 4000)
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
          : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
      }`}
    >
      <Bell size={12} />
      {done ? 'Sent!' : loading ? 'Sending...' : 'Request Approval'}
    </button>
  )
}
