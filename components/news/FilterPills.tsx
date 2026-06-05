'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const FILTERS = [
  { id: 'all',           label: 'Alla' },
  { id: 'pga_tour',      label: 'PGA Tour' },
  { id: 'european_tour', label: 'DP World' },
  { id: 'liv_golf',      label: 'LIV Golf' },
  { id: 'swedish',       label: 'Sverige' },
  { id: 'ai',            label: 'AI-analys' },
]

export default function FilterPills() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('tour') ?? 'all'

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      padding: '0 20px 14px',
      WebkitOverflowScrolling: 'touch',
    } as React.CSSProperties}>
      {FILTERS.map(f => {
        const isActive = active === f.id
        return (
          <button
            key={f.id}
            onClick={() => router.push(f.id === 'all' ? '/nyheter' : `/nyheter?tour=${f.id}`)}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '9999px',
              border: `1px solid ${isActive ? '#BA7517' : '#e8e4de'}`,
              background: isActive ? '#BA7517' : 'transparent',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? '#ffffff' : '#3d3a34',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
