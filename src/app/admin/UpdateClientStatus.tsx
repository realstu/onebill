'use client'

import { useState } from 'react'
import { updateClientStatus } from './actions'

export default function UpdateClientStatus({
  clientId,
  currentStatus,
}: {
  clientId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  async function handleChange(newStatus: string) {
    setLoading(true)
    await updateClientStatus(clientId, newStatus)
    setStatus(newStatus)
    setLoading(false)
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 cursor-pointer hover:border-blue-300 transition-colors disabled:opacity-50"
    >
      <option value="pending">Pending</option>
      <option value="active">Active</option>
      <option value="cancelled">Cancelled</option>
    </select>
  )
}
