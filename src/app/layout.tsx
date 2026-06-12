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
  title: "One Bill — Every Bill. One Payment.",
  description: "One Bill consolidates every bill into a single monthly payment. Utilities, insurance, phone, internet — all handled. Ontario, Canada.",
  keywords: "bill consolidation Ontario, bill management service, one monthly payment, utility bill consolidation Canada",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "One Bill — Every Bill. One Payment.",
    description: "One Bill consolidates every bill into a single monthly payment. Utilities, insurance, phone, internet — all handled. Ontario, Canada.",
    siteName: "One Bill",
    type: "website",
    url: "https://onebill.ca",
    images: [
      {
        url: "https://onebill.ca/opengraph-image",
        width: 1200,
        height: 630,
        alt: "One Bill — Every Bill. One Payment.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Bill — Every Bill. One Payment.",
    description: "One Bill consolidates every bill into a single monthly payment. Ontario, Canada.",
    images: ["https://onebill.ca/opengraph-image"],
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
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <path d="M16 10h2M16 14h2M6 10h8M6 14h5"/>
                  </svg>
                </div>
                One Bill
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Every bill. One payment. One date. Ontario, Canada.</p>
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
