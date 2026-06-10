import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Bill — All Your Parent's Bills. One Payment.",
  description: "One Bill consolidates every bill your parent has into a single monthly payment. Utilities, insurance, phone, internet — all handled. Serving Durham Region, Ontario.",
  keywords: "seniors bill consolidation Durham Region, senior bill management Ontario, one bill payment seniors",
  openGraph: {
    title: "One Bill — All Your Parent's Bills. One Payment.",
    description: "One Bill consolidates every bill your parent has into a single monthly payment.",
    siteName: "One Bill",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased ${font.variable}`}>
      <body className="min-h-full flex flex-col bg-white font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-blue-950 text-slate-500 text-sm border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                <div className="bg-blue-700 text-white rounded-xl p-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                One Bill
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">All your parent&apos;s bills. One payment. One date. Serving Durham Region, Ontario.</p>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-white font-semibold text-xs uppercase tracking-widest">Product</span>
                <a href="/financial" className="hover:text-white transition-colors">How It Works</a>
                <a href="/get-started" className="hover:text-white transition-colors">Get Started</a>
                <a href="/#pricing" className="hover:text-white transition-colors">Pricing</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-white font-semibold text-xs uppercase tracking-widest">Company</span>
                <a href="/for-families" className="hover:text-white transition-colors">For Families</a>
                <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-5 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} One Bill. Durham Region, Ontario.</span>
            <div className="flex gap-4">
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/pad-agreement" className="hover:text-white transition-colors">PAD Agreement</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
