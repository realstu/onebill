import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ApproveButton from './ApproveButton'
import { CheckCircle, XCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ApprovePage({ params }: { params: { token: string } }) {
  const { data: approval } = await supabaseAdmin
    .from('monthly_approvals')
    .select('*, clients(family_name, parent_name, plan)')
    .eq('token', params.token)
    .single()

  if (!approval) return notFound()

  const monthLabel = new Date(approval.month + '-01').toLocaleDateString('en-CA', {
    month: 'long', year: 'numeric',
  })

  if (approval.status === 'approved') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-sm shadow-sm">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Already Approved</h2>
          <p className="text-slate-500 text-sm">
            Your {monthLabel} payment of <strong>${Number(approval.total_charge).toFixed(2)}</strong> was already authorized
            {approval.approved_at && ` on ${new Date(approval.approved_at).toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}`}.
          </p>
        </div>
      </div>
    )
  }

  if (approval.status === 'declined') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-sm shadow-sm">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={28} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Declined</h2>
          <p className="text-slate-500 text-sm">
            This payment was declined. Please contact us at{' '}
            <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-700 text-white rounded-xl p-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M16 10h2M16 14h2M6 10h8M6 14h5"/>
              </svg>
            </div>
            <span className="text-slate-900 font-bold text-xl">One Bill</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Review & Approve</h1>
          <p className="text-slate-500 text-sm mt-1">{monthLabel} — {approval.clients?.family_name}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Summary */}
          <div className="px-6 py-5 space-y-3 border-b border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Bills paid on your behalf</span>
              <span className="font-semibold text-slate-800">${Number(approval.total_bills).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">One Bill base fee ({approval.clients?.plan})</span>
              <span className="font-semibold text-slate-800">${Number(approval.base_fee).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Transaction fee (2.5%)</span>
              <span className="font-semibold text-slate-800">${Number(approval.transaction_fee).toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="px-6 py-4 bg-blue-50 flex justify-between items-center">
            <span className="font-bold text-slate-900">Total charge</span>
            <span className="text-2xl font-extrabold text-blue-700">${Number(approval.total_charge).toFixed(2)}</span>
          </div>

          {/* Approve / Decline */}
          <div className="px-6 py-5">
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              By approving, you authorize One Bill to charge <strong>${Number(approval.total_charge).toFixed(2)}</strong> to your payment method on file for {monthLabel}.
            </p>
            <ApproveButton token={params.token} totalCharge={Number(approval.total_charge)} />
          </div>

          <div className="px-6 pb-5 text-center">
            <p className="text-xs text-slate-400">
              Questions? <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
