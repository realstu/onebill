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
  title: "One Bill — Seniors Financial Care, Durham Region",
  description: "One payment. One visit. Total peace of mind. One Bill handles all your parent's bills, sends a Mobile Teller to their door, and connects them with trusted care workers — all from one simple monthly plan.",
  keywords: "seniors bill management Durham Region, dementia care Ontario, senior care pods, mobile teller, one bill seniors",
  openGraph: {
    title: "One Bill — Seniors Financial Care",
    description: "One payment. One visit. Total peace of mind.",
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
        <footer className="bg-slate-900 text-slate-500 text-sm border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                <div className="bg-teal-500 text-white rounded-xl p-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                One Bill
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Keeping seniors independent, comfortable, and close to family — in Durham Region and beyond.</p>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-white font-semibold text-xs uppercase tracking-widest">Services</span>
                <a href="/financial" className="hover:text-white transition-colors">One Bill Financial</a>
                <a href="/mobile-teller" className="hover:text-white transition-colors">Mobile Teller</a>
                <a href="/pods" className="hover:text-white transition-colors">Senior Pods</a>
                <a href="/care-network" className="hover:text-white transition-colors">Care Network</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-white font-semibold text-xs uppercase tracking-widest">Company</span>
                <a href="/about" className="hover:text-white transition-colors">About Us</a>
                <a href="/for-families" className="hover:text-white transition-colors">For Families</a>
                <a href="/for-caregivers" className="hover:text-white transition-colors">For Caregivers</a>
                <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-5 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} One Bill. Durham Region, Ontario.</span>
            <span>Not a licensed financial institution. Care coordination services only.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
