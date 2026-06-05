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
    <div className="rounded-xl bg-[rgba(186,117,23,0.05)] border-l-2 border-[#BA7517] border border-[rgba(186,117,23,0.2)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[rgba(186,117,23,0.15)]">
          <Sparkles size={12} className="text-[#EF9F27]" />
          <span className="text-xs font-medium text-[#EF9F27]">Echo AI</span>
        </div>
        {generatedAt && (
          <span className="text-[11px] text-[#5A5048]">{timeAgo(generatedAt)}</span>
        )}
      </div>

      {title && (
        <h3
          className="text-lg font-semibold text-[#F5F0E8] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h3>
      )}

      <p className="text-sm text-[#C8BFA8] leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  )
}
