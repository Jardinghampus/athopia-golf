import SectionEyebrow from '@/components/news/SectionEyebrow'

export const revalidate = 0

export default function FeedPage() {
  return (
    <div style={{ background: '#EBECEF', minHeight: '100vh', position: 'relative' }}>
      <div className="dot-grid-bg" aria-hidden="true" />

      {/* ── Page header ── */}
      <header className="page-header">
        <SectionEyebrow label="Din feed" />
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 8vw, 52px)',
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: '-0.8px',
          marginTop: 12,
        }}>
          <span className="title-dark">Allt på ett ställe.</span>
          <br />
          <span className="title-muted">Anpassat för dig.</span>
        </h1>
      </header>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── AI Summary skeleton ── */}
        <section className="section-padding">
          <AISummarySkeleton />
        </section>

        {/* ── Top News carousel skeleton ── */}
        <section className="carousel-section">
          <CarouselSkeleton />
        </section>

        {/* ── Filter pills skeleton ── */}
        <FilterSkeleton />

        {/* ── Featured article skeleton ── */}
        <section className="section-padding">
          <SectionEyebrow label="Featured" />
          <FeaturedSkeleton />
        </section>

        {/* ── Article grid skeleton (2×2) ── */}
        <section className="section-padding">
          <div className="article-grid">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton delay="0.07s" />
            <ArticleCardSkeleton delay="0.14s" />
            <ArticleCardSkeleton delay="0.21s" />
          </div>
        </section>

        {/* ── Compact list skeleton ── */}
        <section className="section-padding">
          <SectionEyebrow label="Senaste nyheter" />
          <CompactListSkeleton />
        </section>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Skeleton components
   ───────────────────────────────────────── */

function AISummarySkeleton() {
  return (
    <div style={{
      background: 'linear-gradient(155deg, #091510 0%, #0D1C14 55%, #091510 100%)',
      border: '1px solid rgba(0,66,37,0.28)',
      boxShadow: '0 0 48px rgba(0,66,37,0.07) inset, 0 4px 24px rgba(0,0,0,0.2)',
      borderRadius: 18,
      padding: 20,
      marginTop: 14,
    }}>
      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div className="shimmer-dark" style={{ width: 130, height: 28, borderRadius: 9999 }} />
        <div className="shimmer-dark" style={{ width: 60, height: 14, borderRadius: 4 }} />
      </div>
      {/* Title */}
      <div className="shimmer-dark" style={{ width: '72%', height: 22, borderRadius: 6, marginBottom: 8 }} />
      <div className="shimmer-dark" style={{ width: '48%', height: 22, borderRadius: 6, marginBottom: 18 }} />
      {/* Body lines */}
      <div className="shimmer-dark" style={{ width: '100%', height: 14, borderRadius: 4, marginBottom: 7 }} />
      <div className="shimmer-dark" style={{ width: '93%', height: 14, borderRadius: 4, marginBottom: 7 }} />
      <div className="shimmer-dark" style={{ width: '65%', height: 14, borderRadius: 4, marginBottom: 18 }} />
      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="shimmer-dark" style={{ width: 70, height: 14, borderRadius: 4 }} />
        <div className="shimmer-dark" style={{ width: 90, height: 14, borderRadius: 4 }} />
      </div>
    </div>
  )
}

function CarouselSkeleton() {
  return (
    <div>
      {/* Slide */}
      <div className="shimmer-warm" style={{ aspectRatio: '3/2', borderRadius: 16 }} />
      {/* Dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 0 4px' }}>
        {[22, 6, 6, 6, 6].map((w, i) => (
          <div
            key={i}
            className="shimmer"
            style={{ width: w, height: 6, borderRadius: 9999 }}
          />
        ))}
      </div>
    </div>
  )
}

function FilterSkeleton() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px', overflowX: 'hidden' }}>
      {[52, 76, 70, 58, 62, 78].map((w, i) => (
        <div key={i} className="shimmer-warm" style={{ width: w, height: 44, borderRadius: 9999, flexShrink: 0 }} />
      ))}
    </div>
  )
}

function FeaturedSkeleton() {
  return (
    <div style={{
      display: 'flex', gap: 16,
      padding: 20,
      background: '#ffffff',
      borderRadius: 16,
      border: '1px solid #D4D6DA',
      marginTop: 14,
    }}>
      {/* Thumbnail */}
      <div className="shimmer" style={{ flexShrink: 0, width: 120, height: 120, borderRadius: 12 }} />
      {/* Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
        <div className="shimmer" style={{ width: 64, height: 18, borderRadius: 9999 }} />
        <div className="shimmer" style={{ width: '90%', height: 18, borderRadius: 5 }} />
        <div className="shimmer" style={{ width: '75%', height: 18, borderRadius: 5 }} />
        <div className="shimmer" style={{ width: '55%', height: 14, borderRadius: 5 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div className="shimmer" style={{ width: 50, height: 12, borderRadius: 4 }} />
          <div className="shimmer" style={{ width: 50, height: 12, borderRadius: 4 }} />
        </div>
      </div>
    </div>
  )
}

function ArticleCardSkeleton({ delay = '0s' }: { delay?: string }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      border: '1px solid #D4D6DA',
      overflow: 'hidden',
      animationDelay: delay,
    }}>
      {/* Image */}
      <div className="shimmer" style={{ aspectRatio: '16/9' }} />
      {/* Text */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div className="shimmer" style={{ width: 58, height: 18, borderRadius: 9999, marginBottom: 10 }} />
        <div className="shimmer" style={{ width: '95%', height: 16, borderRadius: 5, marginBottom: 6 }} />
        <div className="shimmer" style={{ width: '80%', height: 16, borderRadius: 5, marginBottom: 6 }} />
        <div className="shimmer" style={{ width: '55%', height: 16, borderRadius: 5, marginBottom: 14 }} />
        <div className="shimmer" style={{ width: 48, height: 11, borderRadius: 4 }} />
      </div>
    </div>
  )
}

function CompactListSkeleton() {
  return (
    <div className="compact-list" style={{ marginTop: 14 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <div className="shimmer" style={{ width: 58, height: 17, borderRadius: 9999 }} />
                <div className="shimmer" style={{ width: 42, height: 11, borderRadius: 4 }} />
              </div>
              <div className="shimmer" style={{ width: `${75 + (i % 3) * 8}%`, height: 17, borderRadius: 5 }} />
            </div>
          </div>
          {i < 7 && <div className="list-divider" />}
        </div>
      ))}
    </div>
  )
}
