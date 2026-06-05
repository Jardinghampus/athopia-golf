'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const TOUR_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pga_tour:      { bg: 'rgba(0,66,37,0.08)', color: '#004225', label: 'PGA Tour' },
  european_tour: { bg: '#EBECEF',            color: '#5B6478', label: 'DP World' },
  liv_golf:      { bg: '#E6E6DD',            color: '#4A524A', label: 'LIV Golf' },
  swedish:       { bg: 'rgba(0,66,37,0.08)', color: '#004225', label: 'Sverige'  },
}

export interface NormalizedArticle {
  id: string
  title: string
  excerpt: string | null
  image_url: string | null
  tour: string
  source: string
  published_at: string
  slug: string
  is_ai_summary?: boolean
}

interface ArticleCardProps {
  article: NormalizedArticle
  size?: 'featured' | 'standard' | 'compact'
  index?: number
}

const springPress = { type: 'spring', stiffness: 500, damping: 38 } as const
const springHover = { type: 'spring', stiffness: 380, damping: 32 } as const

export default function ArticleCard({ article, size = 'standard', index = 0 }: ArticleCardProps) {
  const tour = TOUR_STYLE[article.tour] ?? { bg: '#EBECEF', color: '#6B707C', label: article.tour }

  if (size === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }}
        whileTap={{ scale: 0.985, transition: springPress }}
      >
        <Link
          href={`/nyheter/${article.slug}`}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '16px 20px',
            textDecoration: 'none',
            background: '#ffffff',
            transition: 'background 0.15s',
            outline: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F7F8F8')}
          onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <TourBadge tour={tour} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.04em',
                color: '#6B707C',
              }}>
                {formatTime(article.published_at)}
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17,
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.2px',
              color: '#0A1410',
              margin: 0,
            }}>
              {article.title}
            </h3>
          </div>
          {article.is_ai_summary && <AIBadge small />}
        </Link>
      </motion.div>
    )
  }

  if (size === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -3, transition: springHover }}
        whileTap={{ scale: 0.98, transition: springPress }}
        style={{ marginTop: 14 }}
      >
        <Link
          href={`/nyheter/${article.slug}`}
          style={{
            display: 'flex', gap: 16,
            padding: 20,
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #D4D6DA',
            textDecoration: 'none',
            transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#004225'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,66,37,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#D4D6DA'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{
            flexShrink: 0,
            width: 120, height: 120,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#EBECEF',
          }}>
            {article.image_url && (
              <Image
                src={article.image_url}
                alt=""
                width={120} height={120}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <TourBadge tour={tour} />
                {article.is_ai_summary && <AIBadge />}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 500,
                lineHeight: 1.25, letterSpacing: '-0.4px',
                color: '#0A1410', margin: '0 0 6px',
              }}>
                {article.title}
              </h3>
              {article.excerpt && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, lineHeight: 1.5, color: '#6B707C', margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                } as React.CSSProperties}>
                  {article.excerpt}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#6B707C' }}>{article.source}</span>
              <span style={{ color: '#D4D6DA' }}>·</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#6B707C' }}>{formatTime(article.published_at)}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // standard
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: index * 0.07 }}
      whileHover={{ y: -3, transition: springHover }}
      whileTap={{ scale: 0.97, transition: springPress }}
    >
      <Link
        href={`/nyheter/${article.slug}`}
        style={{
          display: 'flex', flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #D4D6DA',
          textDecoration: 'none',
          overflow: 'hidden',
          transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
          height: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#004225'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,66,37,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#D4D6DA'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ aspectRatio: '16/9', background: '#EBECEF', overflow: 'hidden', position: 'relative' }}>
          {article.image_url ? (
            <Image src={article.image_url} alt="" fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #E6E6DD 0%, #D4D6DA 100%)' }} />
          )}
          {article.is_ai_summary && (
            <div style={{ position: 'absolute', top: 10, left: 10 }}><AIBadge /></div>
          )}
        </div>
        <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 8 }}><TourBadge tour={tour} /></div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20, fontWeight: 500,
            lineHeight: 1.25, letterSpacing: '-0.3px',
            color: '#0A1410', margin: '0 0 auto', flexGrow: 1,
          }}>
            {article.title}
          </h3>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, color: '#6B707C',
            marginTop: 12, display: 'block',
          }}>
            {formatTime(article.published_at)}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function TourBadge({ tour }: { tour: { bg: string; color: string; label: string } }) {
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 9999,
      background: tour.bg,
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: tour.color,
    }}>
      {tour.label}
    </span>
  )
}

function AIBadge({ small }: { small?: boolean }) {
  return (
    <span style={{
      padding: small ? '3px 8px' : '3px 10px',
      borderRadius: 9999,
      background: 'rgba(0,66,37,0.08)',
      border: '1px solid rgba(0,66,37,0.2)',
      fontFamily: "'DM Mono', monospace",
      fontSize: small ? 9 : 10,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#004225',
      flexShrink: 0,
    }}>
      Echo AI
    </span>
  )
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr)
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000)
  if (diffMin < 60) return `${diffMin} min sedan`
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)} tim sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}
