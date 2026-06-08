'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserPrefs } from '@/context/UserPrefsContext'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/nyheter', label: 'Nyheter' },
  { href: '/spelare', label: 'Spelare' },
  { href: '/turneringar', label: 'Turneringar' },
  { href: '/statistik', label: 'Statistik' },
]

export default function Header() {
  const pathname = usePathname()
  const { hasSetup, prefs } = useUserPrefs()
  const [mobileOpen, setMobileOpen] = useState(false)

  const favPlayer = prefs.favoritePlayers[0] ?? null

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,66,37,0.18)] backdrop-blur-md bg-[rgba(8,16,12,0.88)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-xl font-semibold tracking-wide text-[#4CAF7E]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Athopia
          </span>
          <span className="text-[#A5A9B5] text-sm">/</span>
          <span
            className="text-xl font-semibold tracking-wide text-[#F5F0E8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Golf
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname.startsWith(href)
                  ? 'text-[#4CAF7E]'
                  : 'text-[#A5A9B5] hover:text-[#F5F0E8]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {hasSetup ? (
            <Link
              href="/onboarding"
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-[rgba(0,66,37,0.4)] text-[#4CAF7E] hover:bg-[rgba(0,66,37,0.15)] transition-colors"
            >
              <User size={14} />
              <span className="hidden sm:inline truncate max-w-[120px]">
                {favPlayer ?? 'Min spelare'}
              </span>
            </Link>
          ) : (
            <Link
              href="/onboarding"
              className="text-sm px-4 py-1.5 rounded-full border border-[rgba(0,66,37,0.4)] text-[#4CAF7E] hover:bg-[rgba(0,66,37,0.15)] transition-colors"
            >
              Välj spelare
            </Link>
          )}
          <button
            className="md:hidden text-[#A5A9B5] hover:text-[#F5F0E8]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(0,66,37,0.15)] bg-[#08100C] px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm py-1 ${
                pathname.startsWith(href) ? 'text-[#4CAF7E]' : 'text-[#A5A9B5]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
