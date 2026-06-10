export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: June 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-slate-600">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. What We Collect</h2>
            <p>We collect the following personal information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Name, email address, and phone number of the family contact</li>
              <li>Name and address of the senior whose bills we manage</li>
              <li>Biller account numbers and payment details provided by you</li>
              <li>Payment method information (processed and stored securely by Stripe)</li>
              <li>Transaction and payment history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. How We Use It</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Provide bill payment coordination services</li>
              <li>Process your monthly subscription payment</li>
              <li>Communicate with you about your account</li>
              <li>Contact billers on your behalf</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Third-Party Services</h2>
            <p>We use the following trusted third-party services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Stripe</strong> — payment processing. Your card details are never stored on our servers.</li>
              <li><strong>Supabase</strong> — secure database hosting in Canada.</li>
              <li><strong>Resend</strong> — transactional email delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active and for 7 years after cancellation as required by Canadian financial record-keeping laws. You may request deletion of your data by contacting us, subject to legal retention requirements.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Your Rights (PIPEDA)</h2>
            <p>Under Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw consent (which may result in service termination)</li>
              <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Security</h2>
            <p>We use industry-standard security measures including encrypted data transmission (TLS), secure database storage, and access controls to protect your information.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Contact</h2>
            <p>Privacy questions or requests: <a href="mailto:hello@onebill.ca" className="text-blue-700 hover:underline">hello@onebill.ca</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
