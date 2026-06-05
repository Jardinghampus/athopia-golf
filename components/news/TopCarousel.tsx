'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo((active + 1) % items.length)
      if (e.key === 'ArrowLeft') goTo((active - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, items.length, goTo])

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
          borderRadius: 16,
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
              aspectRatio: '3/2',
              background: '#E6E6DD',
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
                background: 'linear-gradient(135deg, #E6E6DD 0%, #EBECEF 100%)',
              }} />
            )}

            {/* Gradient scrim */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(8,16,12,0.92) 0%, rgba(8,16,12,0.3) 50%, rgba(8,16,12,0.04) 100%)',
            }} />

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 18px' }}>
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: 9999,
                background: 'rgba(0,66,37,0.85)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: 10,
              }}>
                {TOUR_LABELS[item.tour] ?? item.tour}
              </span>

              {/* Title animates when this slide becomes active */}
              <AnimatePresence mode="wait" initial={false}>
                {active === i && (
                  <motion.h3
                    key={`title-${item.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(20px, 5.5vw, 30px)',
                      fontWeight: 500,
                      lineHeight: 1.15,
                      letterSpacing: '-0.5px',
                      color: '#ffffff',
                      margin: '0 0 10px',
                    }}
                  >
                    {item.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.42)',
              }}>
                {formatTime(item.published_at)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 0 4px' }}>
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Gå till slide ${i + 1}`}
            animate={{
              width: active === i ? 22 : 6,
              background: active === i ? '#004225' : '#A5A9B5',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            style={{
              height: 6,
              borderRadius: 9999,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
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
