interface EyebrowProps {
  label: string
  dotColor?: string
}

export default function SectionEyebrow({ label, dotColor = '#BA7517' }: EyebrowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor, flexShrink: 0 }}
        aria-hidden="true"
      />
      <span style={{
        fontFamily: "'DM Mono', 'JetBrains Mono', monospace",
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#0f0f0e',
      }}>
        {label}
      </span>
    </div>
  )
}
