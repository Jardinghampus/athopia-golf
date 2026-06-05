'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface AISummaryBannerProps {
  summary: {
    id: string
    title: string
    content: string
    created_at: string
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Nyligen'
  if (h < 24) return `${h}h sedan`
  return `${Math.floor(h / 24)}d sedan`
}

function PulsingDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'block',
        flexShrink: 0,
        width: 6,
        height: 6,
        borderRadius: 9999,
        background: '#4CAF7E',
      }}
    />
  )
}

export default function AISummaryBanner({ summary }: AISummaryBannerProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: 'linear-gradient(155deg, #091510 0%, #0D1C14 55%, #091510 100%)',
        border: '1px solid rgba(0,66,37,0.35)',
        boxShadow:
          '0 0 48px rgba(0,66,37,0.1) inset, 0 4px 24px rgba(0,0,0,0.2)',
        borderRadius: 18,
        padding: '20px',
        marginTop: 14,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,90,49,0.55) 50%, transparent 100%)',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '5px 12px 5px 9px',
          borderRadius: 9999,
          background: 'rgba(0,66,37,0.2)',
          border: '1px solid rgba(0,90,49,0.35)',
        }}>
          <PulsingDot />
          <Sparkles size={11} color="#4CAF7E" />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: '#4CAF7E',
          }}>
            Echo AI
          </span>
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.03em',
          color: 'rgba(245,240,232,0.3)',
        }}>
          {timeAgo(summary.created_at)}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 1.25,
        letterSpacing: '-0.4px',
        color: '#F5F0E8',
        margin: '0 0 12px',
      }}>
        {summary.title}
      </h2>

      {/* Body with animated height */}
      <div style={{ position: 'relative' }}>
        <motion.div
          initial={false}
          animate={{ maxHeight: expanded ? 2000 : 76 }}
          transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: 'rgba(245,240,232,0.55)',
            margin: '0 0 14px',
            whiteSpace: 'pre-wrap',
          }}>
            {summary.content}
          </p>
        </motion.div>

        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 36,
                background: 'linear-gradient(to top, #091510 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'rgba(245,240,232,0.32)',
            padding: 0,
          }}
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ display: 'flex' }}
          >
            <ChevronDown size={15} />
          </motion.span>
          {expanded ? 'Visa mindre' : 'Läs mer'}
        </button>

        <Link
          href="/sammanfattning"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: '#4CAF7E',
            textDecoration: 'none',
            letterSpacing: '-0.1px',
          }}
        >
          Full analys →
        </Link>
      </div>
    </motion.div>
  )
}
