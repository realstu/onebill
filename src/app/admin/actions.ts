'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import twilio from 'twilio'

const resend = new Resend(process.env.RESEND_API_KEY)

function twilioClient() {
  return twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
}

export async function updateClientStatus(clientId: string, status: string) {
  await supabaseAdmin
    .from('clients')
    .update({ status })
    .eq('id', clientId)

  revalidatePath('/admin')
}

export async function logBillPayment(data: {
  billId: string
  clientId: string
  amountPaid: number
  paidDate: string
  paymentMethod: string
  referenceNumber: string
  notes: string
}) {
  const { error } = await supabaseAdmin
    .from('bill_payments')
    .insert({
      bill_id: data.billId,
      client_id: data.clientId,
      amount_paid: data.amountPaid,
      paid_date: data.paidDate,
      payment_method: data.paymentMethod,
      reference_number: data.referenceNumber || null,
      notes: data.notes || null,
    })

  if (error) throw new Error(error.message)

  // Update last_paid_date on the bill
  await supabaseAdmin
    .from('bills')
    .update({ last_paid_date: data.paidDate })
    .eq('id', data.billId)

  revalidatePath('/admin')
  revalidatePath('/admin/queue')
}

export async function sendMonthlyStatement(clientId: string) {
  // Load client
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (!client) throw new Error('Client not found')

  // Load payments this month
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

  const { data: payments } = await supabaseAdmin
    .from('bill_payments')
    .select('*, bills(provider, bill_type)')
    .eq('client_id', clientId)
    .gte('paid_date', monthStart)
    .lte('paid_date', monthEnd)
    .order('paid_date')

  const totalPaid = payments?.reduce((sum, p) => sum + p.amount_paid, 0) ?? 0
  const baseFee = client.plan === 'premium' ? 49 : 29
  const oneBillFee = (baseFee + totalPaid).toFixed(2)
  const monthLabel = now.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })

  const paymentRows = payments?.map(p => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;">${p.bills?.provider ?? '—'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;">${p.bills?.bill_type ?? '—'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;">${new Date(p.paid_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;font-weight:600;text-align:right;">$${Number(p.amount_paid).toFixed(2)}</td>
    </tr>
  `).join('') ?? '<tr><td colspan="4" style="padding:16px;text-align:center;color:#94a3b8;">No payments recorded this month</td></tr>'

  await resend.emails.send({
    from: 'One Bill <onboarding@resend.dev>',
    to: client.family_email,
    subject: `Your One Bill Statement — ${monthLabel}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
        <div style="background:#1d4ed8;padding:28px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:22px;font-weight:800;">One Bill</h1>
          <p style="color:#bfdbfe;margin:4px 0 0;font-size:14px;">Monthly Statement — ${monthLabel}</p>
        </div>
        <div style="background:white;border:1px solid #e2e8f0;border-top:none;padding:28px 32px;border-radius:0 0 12px 12px;">
          <p style="margin:0 0 20px;color:#475569;">Hi ${client.family_name},</p>
          <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">
            Here's a summary of all bills we paid on your behalf this month.
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
            <thead>
              <tr style="background:#f8fafc;">
                <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Provider</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Type</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Date Paid</th>
                <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${paymentRows}
            </tbody>
          </table>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
              <span style="color:#64748b;">Total bills paid</span>
              <span style="font-weight:600;">$${totalPaid.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
              <span style="color:#64748b;">One Bill service fee (${client.plan})</span>
              <span style="font-weight:600;">$${baseFee}.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid #e2e8f0;font-size:16px;">
              <span style="font-weight:700;">Your One Bill charge</span>
              <span style="font-weight:800;color:#1d4ed8;">$${oneBillFee}</span>
            </div>
          </div>

          <p style="margin:0;font-size:13px;color:#94a3b8;">
            Questions? Reply to this email or contact us at
            <a href="mailto:hello@onebill.ca" style="color:#1d4ed8;">hello@onebill.ca</a>
          </p>
        </div>
      </div>
    `,
  })

  revalidatePath('/admin')
}

export async function requestApproval(clientId: string) {
  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthLabel = now.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()
  if (!client) throw new Error('Client not found')

  const { data: payments } = await supabaseAdmin
    .from('bill_payments')
    .select('*, bills(provider, bill_type)')
    .eq('client_id', clientId)
    .gte('paid_date', monthStart)
    .lte('paid_date', monthEnd)
    .order('paid_date')

  const totalBills = payments?.reduce((s, p) => s + Number(p.amount_paid), 0) ?? 0
  const baseFee = client.plan === 'premium' ? 49 : 29
  const totalCharge = baseFee + totalBills

  const token = crypto.randomUUID()
  await supabaseAdmin.from('monthly_approvals').insert({
    client_id: clientId,
    month,
    total_bills: totalBills,
    base_fee: baseFee,
    transaction_fee: 0,
    total_charge: totalCharge,
    status: 'pending',
    token,
  })

  const approveUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/approve/${token}`

  const paymentRows = payments?.map(p => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;">${p.bills?.provider ?? '—'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;">${p.bills?.bill_type ?? '—'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">$${Number(p.amount_paid).toFixed(2)}</td>
    </tr>
  `).join('') ?? ''

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
      <div style="background:#1d4ed8;padding:28px 32px;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;font-weight:800;">One Bill</h1>
        <p style="color:#bfdbfe;margin:4px 0 0;font-size:14px;">Payment Approval — ${monthLabel}</p>
      </div>
      <div style="background:white;border:1px solid #e2e8f0;border-top:none;padding:28px 32px;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px;color:#475569;">Hi ${client.family_name},</p>
        <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">
          Here's a summary of bills we paid on your behalf this month. Please review and approve your One Bill charge to proceed.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
          <thead>
            <tr style="background:#f8fafc;">
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#94a3b8;text-transform:uppercase;">Provider</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#94a3b8;text-transform:uppercase;">Type</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;color:#94a3b8;text-transform:uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>${paymentRows}</tbody>
        </table>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
            <span style="color:#64748b;">Total bills paid</span><span style="font-weight:600;">$${totalBills.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
            <span style="color:#64748b;">One Bill base fee</span><span style="font-weight:600;">$${baseFee}.00</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:2px solid #e2e8f0;font-size:17px;">
            <span style="font-weight:700;">Total charge</span>
            <span style="font-weight:800;color:#1d4ed8;">$${totalCharge.toFixed(2)}</span>
          </div>
        </div>
        <a href="${approveUrl}" style="display:block;background:#1d4ed8;color:white;text-align:center;font-weight:800;font-size:16px;padding:16px;border-radius:12px;text-decoration:none;margin-bottom:16px;">
          Approve &amp; Authorize — $${totalCharge.toFixed(2)}
        </a>
        <p style="margin:0 0 24px;font-size:12px;color:#94a3b8;text-align:center;">
          This link is unique to your account. Do not forward it.
        </p>
        <p style="margin:0;font-size:13px;color:#94a3b8;">
          Questions? Contact us at <a href="mailto:hello@onebill.ca" style="color:#1d4ed8;">hello@onebill.ca</a>
        </p>
      </div>
    </div>
  `

  const recipients = [client.family_email]
  if (client.poa_email) recipients.push(client.poa_email)
  for (const email of recipients) {
    await resend.emails.send({
      from: 'One Bill <onboarding@resend.dev>',
      to: email,
      subject: `Action Required: Approve your One Bill charge for ${monthLabel} — $${totalCharge.toFixed(2)}`,
      html: emailHtml,
    })
  }

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    const smsNumbers: string[] = []
    if (client.family_phone) smsNumbers.push(client.family_phone)
    if (client.poa_phone) smsNumbers.push(client.poa_phone)
    const tc = twilioClient()
    for (const phone of smsNumbers) {
      await tc.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`,
        body: `One Bill: Your ${monthLabel} statement is ready. Total: $${totalCharge.toFixed(2)}. Review & approve: ${approveUrl}`,
      })
    }
  }

  revalidatePath('/admin')
}
