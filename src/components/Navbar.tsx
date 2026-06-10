'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home } from 'lucide-react'

const NAV_LINKS = [
  { href: '/financial', label: 'How It Works' },
  { href: '/for-families', label: 'For Families' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="bg-blue-700 text-white rounded-xl p-1.5">
            <Home size={17} />
          </div>
          <span>One Bill</span>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
            Durham Region
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="max-md:hidden flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 flex flex-col gap-3 pt-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-slate-600 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-blue-700 text-white font-semibold text-center py-2.5 rounded-xl"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
