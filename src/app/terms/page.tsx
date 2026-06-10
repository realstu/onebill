export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: June 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-slate-600">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. About One Bill</h2>
            <p>One Bill (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a bill consolidation and payment coordination service based in Durham Region, Ontario, Canada. We are not a bank, financial institution, or licensed money services business. We act as a payment coordination agent on behalf of our clients.</p>
            <p className="mt-3">By signing up for One Bill, you (&ldquo;the Client&rdquo;) agree to these Terms of Service in full.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. What We Do</h2>
            <p>One Bill consolidates your designated bills into a single monthly payment. We:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Collect a monthly service fee from you via pre-authorized payment</li>
              <li>Coordinate payments to your designated billers on your behalf</li>
              <li>Provide a family dashboard showing payment history and bill status</li>
              <li>Notify you of any changes to bill amounts or missed payments</li>
            </ul>
            <p className="mt-3">We do not take ownership of any accounts. All accounts remain in the name of the account holder at all times.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Fees</h2>
            <p>Our fees consist of:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Monthly base fee:</strong> Essential plan — $39/month. Premium plan — $69/month.</li>
              <li><strong>Transaction fee:</strong> 2.5% of each bill payment processed on your behalf.</li>
            </ul>
            <p className="mt-3">Fees are charged on the same date each month. You will receive a statement detailing all payments made on your behalf. We reserve the right to update our fees with 30 days written notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Payment Authorization</h2>
            <p>By signing up, you authorize One Bill to collect your monthly service fee via the payment method provided. You also authorize One Bill to contact your designated billers and coordinate payments on your behalf as detailed in the Pre-Authorized Debit Agreement.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Client Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure sufficient funds are available for monthly collection</li>
              <li>Notify One Bill of any changes to biller accounts or contact information</li>
              <li>Review monthly statements and report any discrepancies within 30 days</li>
              <li>Maintain accurate contact information in your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Cancellation</h2>
            <p>You may cancel your One Bill service at any time with 30 days written notice by emailing us. Upon cancellation, all bill payment coordination on your behalf will cease. No refunds are issued for partial months.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Limitation of Liability</h2>
            <p>One Bill is not liable for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Late payment fees resulting from inaccurate biller information provided by the Client</li>
              <li>Service interruptions caused by biller-side issues</li>
              <li>Losses resulting from insufficient funds at time of collection</li>
              <li>Any indirect, consequential, or incidental damages</li>
            </ul>
            <p className="mt-3">Our total liability to you shall not exceed the amount paid to us in the preceding 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">8. Privacy</h2>
            <p>We handle your personal information in accordance with our <a href="/privacy" className="text-blue-700 hover:underline">Privacy Policy</a> and applicable Canadian privacy laws including PIPEDA.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">9. Governing Law</h2>
            <p>These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">10. Contact</h2>
            <p>Questions about these Terms? Contact us at <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
