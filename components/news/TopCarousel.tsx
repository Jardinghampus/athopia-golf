'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export interface CarouselItem {
  id: string
  title: string
  image_url: string | null
  tour: string
  published_at: string
  slug: string
}

const TOUR_LABELS: Record<string, string> = {
  pga_tour:      'PGA Tour',
  european_tour: 'DP World',
  liv_golf:      'LIV Golf',
  swedish:       'Sverige',
}

export default function TopCarousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[i] as HTMLElement
    if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    setActive(i)
  }, [])

  const next = useCallback(() => {
    setActive(prev => {
      const nextIdx = (prev + 1) % items.length
      const track = trackRef.current
      if (track) {
        const slide = track.children[nextIdx] as HTMLElement
        if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
      return nextIdx
    })
  }, [items.length])

  const startAutoplay = useCallback(() => {
    intervalRef.current = setInterval(next, 5000)
  }, [next])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo((active + 1) % items.length)
      if (e.key === 'ArrowLeft') goTo((active - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, items.length, goTo])

  // Scroll-sync dots via IntersectionObserver
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 }
    )
    Array.from(track.children).forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={stopAutoplay}
      onTouchEnd={startAutoplay}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          gap: 0,
          borderRadius: '16px',
        } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={`/nyheter/${item.slug}`}
            style={{
              flexShrink: 0,
              width: '100%',
              scrollSnapAlign: 'start',
              position: 'relative',
              display: 'block',
              aspectRatio: '16/9',
              background: '#f7f5f2',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
            aria-label={item.title}
          >
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                priority={i === 0}
              />
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #f7f0e6 0%, #e8ddd0 100%)',
              }} />
            )}

            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,15,14,0.88) 0%, rgba(15,15,14,0.25) 55%, transparent 100%)',
            }} />

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 16px' }}>
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(186,117,23,0.85)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '8px',
              }}>
                {TOUR_LABELS[item.tour] ?? item.tour}
              </span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.5px',
                color: '#ffffff',
                margin: '0 0 8px',
              }}>
                {item.title}
              </h3>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.55)',
              }}>
                {formatTime(item.published_at)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', padding: '12px 0 4px' }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Gå till slide ${i + 1}`}
            style={{
              width: active === i ? '20px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              background: active === i ? '#BA7517' : '#c8c0b4',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr)
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000)
  if (diffMin < 60) return `${diffMin} min sedan`
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)} tim sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}
