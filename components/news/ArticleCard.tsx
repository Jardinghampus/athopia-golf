'use client'

import Link from 'next/link'
import Image from 'next/image'

const TOUR_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pga_tour:      { bg: '#fdf0db', color: '#BA7517', label: 'PGA Tour' },
  european_tour: { bg: '#e8f0ff', color: '#1a5fa8', label: 'DP World' },
  liv_golf:      { bg: '#fdf0db', color: '#BA7517', label: 'LIV Golf' },
  swedish:       { bg: '#e8f7ef', color: '#1a7a3e', label: 'Sverige' },
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
}

export default function ArticleCard({ article, size = 'standard' }: ArticleCardProps) {
  const tour = TOUR_STYLE[article.tour] ?? { bg: '#f7f5f2', color: '#8a8070', label: article.tour }

  if (size === 'compact') {
    return (
      <Link
        href={`/nyheter/${article.slug}`}
        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 20px', textDecoration: 'none', background: '#ffffff', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#fdf9f5')}
        onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <TourBadge tour={tour} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.04em', color: '#b8b0a4' }}>
              {formatTime(article.published_at)}
            </span>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.2px', color: '#0f0f0e', margin: 0 }}>
            {article.title}
          </h3>
        </div>
        {article.is_ai_summary && <AIBadge small />}
      </Link>
    )
  }

  if (size === 'featured') {
    return (
      <Link
        href={`/nyheter/${article.slug}`}
        style={{ display: 'flex', gap: '16px', padding: '20px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e8e4de', textDecoration: 'none', transition: 'all 0.18s ease', marginTop: '14px' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FAC775' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e8e4de' }}
      >
        <div style={{ flexShrink: 0, width: '120px', height: '120px', borderRadius: '12px', overflow: 'hidden', background: '#f7f5f2' }}>
          {article.image_url && (
            <Image src={article.image_url} alt="" width={120} height={120} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <TourBadge tour={tour} />
              {article.is_ai_summary && <AIBadge />}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.4px', color: '#0f0f0e', margin: '0 0 6px' }}>
              {article.title}
            </h3>
            {article.excerpt && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.5, color: '#8a8070', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                {article.excerpt}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#b8b0a4' }}>{article.source}</span>
            <span style={{ color: '#e8e4de' }}>·</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#b8b0a4' }}>{formatTime(article.published_at)}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/nyheter/${article.slug}`}
      style={{ display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: '16px', border: '1px solid #e8e4de', textDecoration: 'none', overflow: 'hidden', transition: 'all 0.18s ease' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FAC775' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e8e4de' }}
    >
      <div style={{ aspectRatio: '16/9', background: '#f7f5f2', overflow: 'hidden', position: 'relative' }}>
        {article.image_url ? (
          <Image src={article.image_url} alt="" fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f7f0e6 0%, #e8ddd0 100%)' }} />
        )}
        {article.is_ai_summary && (
          <div style={{ position: 'absolute', top: '10px', left: '10px' }}><AIBadge /></div>
        )}
      </div>
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '8px' }}><TourBadge tour={tour} /></div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.3px', color: '#0f0f0e', margin: '0 0 auto', flexGrow: 1 }}>
          {article.title}
        </h3>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#b8b0a4', marginTop: '12px', display: 'block' }}>
          {formatTime(article.published_at)}
        </span>
      </div>
    </Link>
  )
}

function TourBadge({ tour }: { tour: { bg: string; color: string; label: string } }) {
  return (
    <span style={{ padding: '3px 10px', borderRadius: '9999px', background: tour.bg, fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: tour.color }}>
      {tour.label}
    </span>
  )
}

function AIBadge({ small }: { small?: boolean }) {
  return (
    <span style={{ padding: small ? '3px 8px' : '3px 10px', borderRadius: '9999px', background: '#fdf0db', border: '1px solid #FAC775', fontFamily: "'DM Mono', monospace", fontSize: small ? '9px' : '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#BA7517', flexShrink: 0 }}>
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
