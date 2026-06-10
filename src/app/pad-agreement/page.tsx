export default function PADAgreementPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Pre-Authorized Debit Agreement</h1>
          <p className="text-slate-400 text-sm">Last updated: June 2026</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8 text-sm text-blue-900">
          <strong>Important:</strong> This Pre-Authorized Debit (PAD) Agreement authorizes One Bill to collect your monthly service fee and coordinate bill payments on your behalf. Please read carefully before signing up.
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-slate-600">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Authorization</h2>
            <p>By completing the One Bill sign-up process and checking the agreement box, you (the &ldquo;Payor&rdquo;) authorize One Bill (&ldquo;One Bill&rdquo;) to debit your payment method for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your monthly base subscription fee (Essential: $39/mo or Premium: $69/mo)</li>
              <li>A 2.5% transaction fee on each bill payment processed on your behalf</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Bill Payment Authorization</h2>
            <p>You also authorize One Bill to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Contact your designated billers on your behalf</li>
              <li>Set up, modify, or cancel payment arrangements with those billers</li>
              <li>Act as your authorized representative for the purpose of bill payment coordination</li>
              <li>Receive billing correspondence and statements related to the accounts you have enrolled</li>
            </ul>
            <p className="mt-3">This authorization applies only to the billers and accounts you have specifically enrolled with One Bill. You may add or remove billers at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Payment Schedule</h2>
            <p>Debits will occur on the same date each month corresponding to your sign-up date. You will receive a statement by email at least 3 business days before each debit detailing the amount to be collected.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Recourse / Cancellation</h2>
            <p>You have certain recourse rights if a debit does not comply with this agreement. For example, you have the right to receive reimbursement for any debit that is not authorized or is not consistent with this PAD Agreement.</p>
            <p className="mt-3">To cancel this agreement, provide written notice to One Bill at <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a> with 30 days notice. Cancellation of this PAD Agreement will result in termination of One Bill services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Insufficient Funds</h2>
            <p>If a debit is returned due to insufficient funds, One Bill reserves the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Charge a $25 NSF fee</li>
              <li>Suspend bill payment services until payment is resolved</li>
              <li>Retry the debit up to 2 additional times</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Changes to This Agreement</h2>
            <p>One Bill will provide at least 30 days written notice of any changes to the debit amount or schedule. Continued use of the service after notice constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Contact & Complaints</h2>
            <p>For questions, concerns, or to exercise your recourse rights, contact us at:</p>
            <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <p><strong>One Bill</strong></p>
              <p>Durham Region, Ontario, Canada</p>
              <p>Email: <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a></p>
            </div>
            <p className="mt-3">You may also contact the <strong>Payments Canada</strong> helpline for questions about your PAD rights.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
