import { supabaseAdmin } from '@/lib/supabase'
import { ArrowLeft, CalendarClock, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import LogPaymentButton from '../LogPaymentButton'

export const dynamic = 'force-dynamic'

const METHOD_LABELS: Record<string, string> = {
  manual: 'Manual',
  email: 'Email',
  autopay: 'Autopay',
  online: 'Online',
}

const FREQ_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  bimonthly: 'Every 2 mo',
  quarterly: 'Quarterly',
  semiannual: 'Semi-annual',
  annual: 'Annual',
  manual: 'As received',
}

export default async function QueuePage() {
  const now = new Date()
  const monthLabel = now.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

  // All active bills with client info
  const { data: bills } = await supabaseAdmin
    .from('bills')
    .select('*, clients(id, family_name, parent_name, family_email, plan)')
    .eq('status', 'active')
    .order('next_due_date', { ascending: true, nullsFirst: false })

  // Payments already made this month
  const { data: paidThisMonth } = await supabaseAdmin
    .from('bill_payments')
    .select('bill_id, amount_paid, paid_date')
    .gte('paid_date', monthStart)
    .lte('paid_date', monthEnd)

  const paidBillIds = new Set(paidThisMonth?.map(p => p.bill_id) ?? [])

  const overdue = bills?.filter(b =>
    b.next_due_date && b.next_due_date < now.toISOString().split('T')[0] && !paidBillIds.has(b.id)
  ) ?? []

  const upcoming = bills?.filter(b =>
    b.next_due_date && b.next_due_date >= now.toISOString().split('T')[0] && !paidBillIds.has(b.id)
  ) ?? []

  const paid = bills?.filter(b => paidBillIds.has(b.id)) ?? []
  const noDueDate = bills?.filter(b => !b.next_due_date && !paidBillIds.has(b.id)) ?? []

  const totalOwing = [...overdue, ...upcoming].reduce((s, b) => s + (b.monthly_amount ?? 0), 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-950 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/admin" className="flex items-center gap-1.5 text-blue-400 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={14} /> Back to clients
          </Link>
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Payment Queue</p>
          <h1 className="text-2xl font-bold mb-6">{monthLabel}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Overdue', value: overdue.length, color: 'text-red-400' },
              { label: 'Upcoming', value: upcoming.length, color: 'text-amber-400' },
              { label: 'Paid This Month', value: paid.length, color: 'text-green-400' },
              { label: 'Total Owing', value: `$${totalOwing.toFixed(0)}`, color: 'text-blue-300' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Overdue */}
        {overdue.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-red-500" />
              <h2 className="font-bold text-slate-900">Overdue ({overdue.length})</h2>
            </div>
            <div className="space-y-2">
              {overdue.map(bill => (
                <BillRow key={bill.id} bill={bill} isPaid={false} isOverdue />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CalendarClock size={16} className="text-amber-500" />
              <h2 className="font-bold text-slate-900">Upcoming ({upcoming.length})</h2>
            </div>
            <div className="space-y-2">
              {upcoming.map(bill => (
                <BillRow key={bill.id} bill={bill} isPaid={false} isOverdue={false} />
              ))}
            </div>
          </section>
        )}

        {/* No due date */}
        {noDueDate.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CalendarClock size={16} className="text-slate-400" />
              <h2 className="font-bold text-slate-900">No Due Date Set ({noDueDate.length})</h2>
            </div>
            <div className="space-y-2">
              {noDueDate.map(bill => (
                <BillRow key={bill.id} bill={bill} isPaid={false} isOverdue={false} />
              ))}
            </div>
          </section>
        )}

        {/* Paid */}
        {paid.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-green-500" />
              <h2 className="font-bold text-slate-900">Paid This Month ({paid.length})</h2>
            </div>
            <div className="space-y-2">
              {paid.map(bill => (
                <BillRow key={bill.id} bill={bill} isPaid paidInfo={paidThisMonth?.find(p => p.bill_id === bill.id)} isOverdue={false} />
              ))}
            </div>
          </section>
        )}

        {(!bills || bills.length === 0) && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <p className="text-slate-400">No active bills found. Add clients first.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function BillRow({ bill, isPaid, isOverdue, paidInfo }: {
  bill: {
    id: string
    provider: string
    bill_type: string
    monthly_amount: number | null
    next_due_date: string | null
    last_paid_date: string | null
    frequency: string
    billing_method: string
    clients: { id: string; family_name: string; parent_name: string; family_email: string; plan: string } | null
  }
  isPaid: boolean
  isOverdue: boolean
  paidInfo?: { amount_paid: number; paid_date: string } | null | undefined
}) {
  return (
    <div className={`bg-white border rounded-xl px-5 py-4 flex items-center justify-between gap-4 ${
      isOverdue ? 'border-red-200 bg-red-50/30' : isPaid ? 'border-green-200 bg-green-50/20 opacity-70' : 'border-slate-200'
    }`}>
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-2 h-2 rounded-full shrink-0 ${isOverdue ? 'bg-red-400' : isPaid ? 'bg-green-400' : 'bg-amber-400'}`} />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-sm">{bill.provider}</span>
            <span className="text-xs text-slate-400">{bill.bill_type}</span>
            {bill.frequency && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {FREQ_LABELS[bill.frequency] ?? bill.frequency}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-xs text-slate-500">{bill.clients?.family_name}</span>
            {bill.next_due_date && (
              <span className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-slate-500'}`}>
                Due {new Date(bill.next_due_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                {isOverdue && ' — OVERDUE'}
              </span>
            )}
            {isPaid && paidInfo && (
              <span className="text-xs text-green-600 font-medium">
                Paid {new Date(paidInfo.paid_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} · ${Number(paidInfo.amount_paid).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="font-bold text-slate-800 text-sm">
          {bill.monthly_amount ? `$${bill.monthly_amount.toFixed(2)}` : <span className="text-slate-300 font-normal">no amount</span>}
        </span>
        {!isPaid && bill.clients && (
          <LogPaymentButton
            billId={bill.id}
            clientId={bill.clients.id}
            provider={bill.provider}
            estimatedAmount={bill.monthly_amount}
          />
        )}
        {isPaid && <CheckCircle2 size={16} className="text-green-500" />}
      </div>
    </div>
  )
}
