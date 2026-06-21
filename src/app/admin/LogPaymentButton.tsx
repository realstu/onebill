'use client'

import { useState } from 'react'
import { logBillPayment } from './actions'
import { PlusCircle, X } from 'lucide-react'

const PAYMENT_METHODS = [
  { value: 'online_banking', label: 'Online Banking' },
  { value: 'bill_payment', label: 'Bill Payment Portal' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'etransfer', label: 'e-Transfer' },
  { value: 'autopay', label: 'Autopay' },
  { value: 'other', label: 'Other' },
]

export default function LogPaymentButton({
  billId,
  clientId,
  provider,
  estimatedAmount,
}: {
  billId: string
  clientId: string
  provider: string
  estimatedAmount: number | null
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    amountPaid: estimatedAmount?.toString() ?? '',
    paidDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'online_banking',
    referenceNumber: '',
    notes: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await logBillPayment({
        billId,
        clientId,
        amountPaid: parseFloat(form.amountPaid),
        paidDate: form.paidDate,
        paymentMethod: form.paymentMethod,
        referenceNumber: form.referenceNumber,
        notes: form.notes,
      })
      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
      }, 1200)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-600 font-semibold border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg px-2.5 py-1.5 transition-colors"
      >
        <PlusCircle size={12} /> Log Payment
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900">Log Payment</h2>
                <p className="text-xs text-slate-400 mt-0.5">{provider}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            {success ? (
              <div className="px-6 py-12 text-center">
                <div className="text-4xl mb-3">✓</div>
                <p className="font-semibold text-green-600">Payment logged!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Amount Paid</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={form.amountPaid}
                        onChange={e => setForm({ ...form, amountPaid: e.target.value })}
                        className="w-full border border-slate-200 focus:border-blue-400 rounded-xl pl-7 pr-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Date Paid</label>
                    <input
                      type="date"
                      required
                      value={form.paidDate}
                      onChange={e => setForm({ ...form, paidDate: e.target.value })}
                      className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors bg-white"
                  >
                    {PAYMENT_METHODS.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Reference / Confirmation # <span className="text-slate-300">(optional)</span></label>
                  <input
                    type="text"
                    value={form.referenceNumber}
                    onChange={e => setForm({ ...form, referenceNumber: e.target.value })}
                    placeholder="e.g. TXN-123456"
                    className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Notes <span className="text-slate-300">(optional)</span></label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g. Amount higher than usual — seasonal"
                    className="w-full border border-slate-200 focus:border-blue-400 rounded-xl px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || !form.amountPaid}
                    className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                    {loading ? 'Saving...' : 'Log Payment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
