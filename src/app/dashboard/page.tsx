'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { LogOut, DollarSign, FileText, Clock, CheckCircle, AlertCircle, Gift } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Bill = {
  id: string
  provider: string
  bill_type: string
  monthly_amount: number | null
  frequency: string
  billing_method: string
  next_due_date: string | null
  last_paid_date: string | null
  status: string
}

type Client = {
  id: string
  family_name: string
  parent_name: string
  parent_address: string
  parent_city: string
  plan: string
  status: string
  cashback_balance: number
  cashback_rate: number
  created_at: string
}

const FREQUENCY_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  bimonthly: 'Every 2 months',
  quarterly: 'Quarterly',
  semiannual: 'Semi-annual',
  annual: 'Annual',
  manual: 'As received',
}

const METHOD_LABELS: Record<string, string> = {
  manual: 'Manual entry',
  email: 'Email forwarding',
  autopay: 'Autopay set up',
  online: 'Online access',
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/dashboard/login'
      return
    }
    setUser({ email: session.user.email! })
    await loadClientData(session.user.email!)
  }

  async function loadClientData(email: string) {
    const res = await fetch(`/api/dashboard/client?email=${encodeURIComponent(email)}`)
    if (!res.ok) {
      setError('Could not load your account. Please contact hello@onebill.ca')
      setLoading(false)
      return
    }
    const data = await res.json()
    setClient(data.client)
    setBills(data.bills)
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/dashboard/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading your account...</div>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-sm">
          <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
          <p className="text-slate-600 text-sm">{error || 'Account not found.'}</p>
        </div>
      </div>
    )
  }

  const activeBills = bills.filter(b => b.status === 'active')
  const totalMonthlyBills = activeBills.reduce((sum, b) => sum + (b.monthly_amount ?? 0), 0)
  const baseFee = client.plan === 'premium' ? 69 : 39
  const transactionFee = totalMonthlyBills * 0.025
  const totalMonthly = baseFee + transactionFee
  const cashbackPct = (client.cashback_rate * 100).toFixed(1)

  const upcomingBills = activeBills
    .filter(b => b.next_due_date)
    .sort((a, b) => new Date(a.next_due_date!).getTime() - new Date(b.next_due_date!).getTime())
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-950 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 text-white rounded-xl p-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M16 10h2M16 14h2M6 10h8M6 14h5"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg">One Bill</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden md:block">{user?.email}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {client.family_name}&apos;s Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Managing bills for <strong>{client.parent_name}</strong> · {client.parent_city} ·{' '}
            <span className={`capitalize font-medium ${client.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
              {client.status}
            </span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Bills Managed</p>
            <p className="text-2xl font-extrabold text-slate-900">{activeBills.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">active bills</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Monthly Bills</p>
            <p className="text-2xl font-extrabold text-slate-900">${totalMonthlyBills.toFixed(0)}</p>
            <p className="text-xs text-slate-400 mt-0.5">est. total</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Your Monthly Fee</p>
            <p className="text-2xl font-extrabold text-blue-700">${totalMonthly.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-0.5">${baseFee} + 2.5% of bills processed</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Gift size={12} className="text-amber-500" />
              <p className="text-xs text-slate-400 font-medium">Cashback Balance</p>
            </div>
            <p className="text-2xl font-extrabold text-amber-600">${client.cashback_balance.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-0.5">{cashbackPct}% back on payments</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Bills list */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText size={15} className="text-blue-700" /> Your Bills
              </h2>
              <span className="text-xs text-slate-400">{activeBills.length} active</span>
            </div>
            <div className="divide-y divide-slate-100">
              {activeBills.length === 0 && (
                <div className="px-5 py-8 text-center text-slate-400 text-sm">
                  No bills added yet. Contact us at hello@onebill.ca to add bills.
                </div>
              )}
              {activeBills.map((bill) => (
                <div key={bill.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <DollarSign size={14} className="text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{bill.provider}</p>
                      <p className="text-xs text-slate-400">
                        {bill.bill_type} · {FREQUENCY_LABELS[bill.frequency] ?? bill.frequency} · {METHOD_LABELS[bill.billing_method] ?? bill.billing_method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-bold text-slate-900">
                      {bill.monthly_amount ? `$${bill.monthly_amount.toFixed(2)}` : <span className="text-slate-300">—</span>}
                    </p>
                    {bill.next_due_date && (
                      <p className="text-xs text-slate-400">
                        Due {new Date(bill.next_due_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Upcoming */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Clock size={15} className="text-blue-700" /> Upcoming
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {upcomingBills.length === 0 && (
                  <p className="px-5 py-4 text-xs text-slate-400">No upcoming due dates on file.</p>
                )}
                {upcomingBills.map((bill) => (
                  <div key={bill.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{bill.provider}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(bill.next_due_date!).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {bill.monthly_amount ? `$${bill.monthly_amount.toFixed(2)}` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle size={15} className="text-green-600" /> Account
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan</span>
                  <span className="text-slate-800 font-semibold capitalize">{client.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`font-semibold capitalize ${client.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Member since</span>
                  <span className="text-slate-800 font-semibold">
                    {new Date(client.created_at).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  Questions? <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
