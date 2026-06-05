'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, User, MessageSquare, UserCircle } from 'lucide-react'

const tabs = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/nyheter', label: 'Nyheter', icon: Newspaper },
  { href: '/spelare', label: 'Spelare', icon: User },
  { href: '/forum', label: 'Forum', icon: MessageSquare },
  { href: '/profil', label: 'Profil', icon: UserCircle },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(186,117,23,0.18)] backdrop-blur-md bg-[rgba(10,10,8,0.92)]">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative"
            >
              <Icon
                size={20}
                className={active ? 'text-[#EF9F27]' : 'text-[#8A8070]'}
                strokeWidth={active ? 2 : 1.5}
              />
              <span
                className={`text-[10px] ${active ? 'text-[#EF9F27]' : 'text-[#8A8070]'}`}
              >
                {label}
              </span>
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#EF9F27]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
