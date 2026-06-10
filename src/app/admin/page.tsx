import { supabaseAdmin } from '@/lib/supabase'
import { CheckCircle, Clock, Users, DollarSign, ExternalLink, AlertCircle } from 'lucide-react'
import UpdateClientStatus from './UpdateClientStatus'

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700 border-amber-200',
  active:    'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
}

const PLAN_BASE_FEE: Record<string, number> = { essential: 39, premium: 69 }
const TRANSACTION_RATE = 0.025

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const { data: clients } = await supabaseAdmin
    .from('clients')
    .select('*, bills(*)')
    .order('created_at', { ascending: false })

  const total = clients?.length ?? 0
  const active = clients?.filter(c => c.status === 'active').length ?? 0
  const pending = clients?.filter(c => c.status === 'pending').length ?? 0

  // Estimated monthly recurring revenue from active clients
  const mrr = clients
    ?.filter(c => c.status === 'active')
    .reduce((sum, c) => {
      const base = PLAN_BASE_FEE[c.plan] ?? 39
      const billsTotal = c.bills?.reduce((s: number, b: { monthly_amount: number | null }) =>
        s + (b.monthly_amount ?? 0), 0) ?? 0
      return sum + base + billsTotal * TRANSACTION_RATE
    }, 0) ?? 0

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-blue-950 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">One Bill Admin</p>
          <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Users,       label: 'Total Clients',  value: total },
              { icon: CheckCircle, label: 'Active',         value: active },
              { icon: Clock,       label: 'Pending Setup',  value: pending },
              { icon: DollarSign,  label: 'Est. MRR',       value: `$${mrr.toFixed(0)}/mo` },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
                  <Icon size={16} className="text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Client list */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {!clients || clients.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <Users size={40} className="text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-700 mb-1">No clients yet</h2>
            <p className="text-slate-400 text-sm">Sign-ups will appear here once submitted.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => {
              const base = PLAN_BASE_FEE[client.plan] ?? 39
              const billCount = client.bills?.length ?? 0
              const billsTotal = client.bills?.reduce((sum: number, b: { monthly_amount: number | null }) =>
                sum + (b.monthly_amount ?? 0), 0) ?? 0
              const estimatedMonthly = (base + billsTotal * TRANSACTION_RATE).toFixed(2)

              return (
                <div key={client.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">

                  {/* Client header */}
                  <div className="px-6 py-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-lg">{client.parent_name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[client.status] ?? STATUS_COLORS.pending}`}>
                          {client.status}
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 font-medium px-2 py-0.5 rounded-full capitalize">
                          {client.plan}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm mb-3">{client.parent_address}, {client.parent_city}</p>

                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        <div>
                          <span className="text-slate-400 text-xs">Family contact</span>
                          <p className="font-semibold text-slate-800">{client.family_name}</p>
                          <p className="text-slate-500 text-xs">{client.family_phone} · {client.family_email}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-xs">Est. monthly fee</span>
                          <p className="font-bold text-blue-700">${estimatedMonthly}/mo</p>
                          <p className="text-slate-400 text-xs">{billCount} bill{billCount !== 1 ? 's' : ''}</p>
                        </div>
                        {billsTotal > 0 && (
                          <div>
                            <span className="text-slate-400 text-xs">Bills total value</span>
                            <p className="font-semibold text-slate-700">${billsTotal.toFixed(2)}/mo</p>
                            <p className="text-slate-400 text-xs">across all providers</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0 items-end">
                      {client.stripe_customer_id && (
                        <a
                          href={`https://dashboard.stripe.com/test/customers/${client.stripe_customer_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-700 font-medium transition-colors border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blue-200"
                        >
                          <ExternalLink size={12} /> View in Stripe
                        </a>
                      )}
                      <UpdateClientStatus clientId={client.id} currentStatus={client.status} />
                    </div>
                  </div>

                  {/* Bills */}
                  {client.bills && client.bills.length > 0 && (
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                        Bills to Handle ({client.bills.length})
                      </p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {client.bills.map((bill: {
                          id: string
                          provider: string
                          bill_type: string
                          account_number: string | null
                          monthly_amount: number | null
                          status: string
                        }) => (
                          <div key={bill.id} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold text-slate-800 text-sm">{bill.provider}</p>
                                <p className="text-slate-400 text-xs">{bill.bill_type}</p>
                                {bill.account_number && (
                                  <p className="text-slate-400 text-xs mt-0.5 font-mono">Acct: {bill.account_number}</p>
                                )}
                              </div>
                              <div className="text-right shrink-0">
                                {bill.monthly_amount ? (
                                  <p className="text-sm font-bold text-slate-700">${bill.monthly_amount}</p>
                                ) : (
                                  <p className="text-xs text-slate-300">No amount</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {client.notes && (
                    <div className="border-t border-slate-100 px-6 py-3 flex items-start gap-2">
                      <AlertCircle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-500">{client.notes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-slate-100 px-6 py-3">
                    <p className="text-xs text-slate-400">
                      Signed up {new Date(client.created_at).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
