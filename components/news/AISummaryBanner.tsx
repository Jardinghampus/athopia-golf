import Link from 'next/link'
import SectionEyebrow from './SectionEyebrow'

interface AISummaryBannerProps {
  summary: {
    id: string
    title: string
    content: string
    created_at: string
  }
}

export default function AISummaryBanner({ summary }: AISummaryBannerProps) {
  const date = new Date(summary.created_at).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'long',
  })

  return (
    <div style={{
      background: '#fdf6ec',
      border: '1px solid #FAC775',
      borderLeft: '3px solid #BA7517',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '14px',
    }}>
      <SectionEyebrow label="Echo AI · Daglig analys" />
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: 1.25,
        letterSpacing: '-0.4px',
        color: '#0f0f0e',
        margin: '10px 0',
      }}>
        {summary.title}
      </h2>
      <p style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: '15px',
        lineHeight: 1.6,
        color: '#3d3a34',
        margin: '0 0 14px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      } as React.CSSProperties}>
        {summary.content}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.04em',
          color: '#b8b0a4',
        }}>
          Genererat {date}
        </span>
        <Link href="/sammanfattning" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          color: '#BA7517',
          textDecoration: 'none',
        }}>
          Läs fullständig analys →
        </Link>
      </div>
    </div>
  )
}
