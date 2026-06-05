'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface AISummaryCardProps {
  content: string
  generatedAt?: string
  title?: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Nyligen'
  if (h < 24) return `${h}h sedan`
  return `${Math.floor(h / 24)}d sedan`
}

export default function AISummaryCard({ content, generatedAt, title }: AISummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: 'linear-gradient(155deg, #091510 0%, #0D1C14 55%, #091510 100%)',
        border: '1px solid rgba(0,66,37,0.35)',
        boxShadow: '0 0 48px rgba(0,66,37,0.1) inset, 0 4px 24px rgba(0,0,0,0.2)',
        borderRadius: 18,
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,90,49,0.55) 50%, transparent 100%)',
      }} />

      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '5px 12px 5px 9px',
          borderRadius: 9999,
          background: 'rgba(0,66,37,0.2)',
          border: '1px solid rgba(0,90,49,0.35)',
        }}>
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'block', width: 6, height: 6, borderRadius: 9999, background: '#4CAF7E', flexShrink: 0 }}
          />
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
        {generatedAt && (
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: 'rgba(245,240,232,0.3)',
          }}>
            {timeAgo(generatedAt)}
          </span>
        )}
      </div>

      {/* Title */}
      {title && (
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.25,
          letterSpacing: '-0.4px',
          color: '#F5F0E8',
          margin: '0 0 12px',
        }}>
          {title}
        </h3>
      )}

      {/* Content */}
      <p style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 15,
        lineHeight: 1.65,
        color: 'rgba(245,240,232,0.55)',
        margin: 0,
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </p>
    </motion.div>
  )
}
