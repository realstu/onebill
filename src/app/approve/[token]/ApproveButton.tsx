'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ApproveButton({ token, totalCharge }: { token: string; totalCharge: number }) {
  const [loading, setLoading] = useState<'approve' | 'decline' | null>(null)
  const [done, setDone] = useState<'approved' | 'declined' | null>(null)

  async function handle(action: 'approve' | 'decline') {
    if (action === 'decline' && !confirm('Are you sure you want to decline this payment? Your account may be paused.')) return
    setLoading(action)
    await fetch('/api/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action }),
    })
    setDone(action === 'approve' ? 'approved' : 'declined')
    setLoading(null)
  }

  if (done === 'approved') {
    return (
      <div className="text-center py-4">
        <CheckCircle size={36} className="text-green-500 mx-auto mb-2" />
        <p className="font-bold text-green-700">Payment Authorized</p>
        <p className="text-slate-500 text-sm mt-1">Thank you. Your ${totalCharge.toFixed(2)} charge has been approved.</p>
      </div>
    )
  }

  if (done === 'declined') {
    return (
      <div className="text-center py-4">
        <XCircle size={36} className="text-red-400 mx-auto mb-2" />
        <p className="font-bold text-red-600">Payment Declined</p>
        <p className="text-slate-500 text-sm mt-1">We've been notified. Please contact hello@onebill.ca to resolve.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => handle('approve')}
        disabled={!!loading}
        className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle size={16} />
        {loading === 'approve' ? 'Authorizing...' : `Approve — $${totalCharge.toFixed(2)}`}
      </button>
      <button
        onClick={() => handle('decline')}
        disabled={!!loading}
        className="w-full bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-600 font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {loading === 'decline' ? 'Processing...' : 'Decline'}
      </button>
    </div>
  )
}
