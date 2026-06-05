import type { FeedItem } from '@/types/golf'

const typeConfig = {
  news: { color: '#EF9F27', label: 'Nyhet' },
  forum: { color: '#7F77DD', label: 'Forum' },
  summary: { color: '#E8CC74', label: 'AI' },
  podcast: { color: '#378ADD', label: 'Podcast' },
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)} min sedan`
  if (h < 24) return `${h}h sedan`
  return `${Math.floor(h / 24)}d sedan`
}

export default function FeedItemCard({ item }: { item: FeedItem }) {
  const cfg = typeConfig[item.type]

  return (
    <article
      className="group relative pl-4 py-4 pr-4 rounded-lg bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.3)] transition-all hover:shadow-[0_0_16px_rgba(186,117,23,0.08)] cursor-pointer"
      style={{ borderLeft: `3px solid ${cfg.color}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
              style={{ backgroundColor: `${cfg.color}22`, color: cfg.color }}
            >
              {cfg.label}
            </span>
            {item.source && (
              <span className="text-[11px] text-[#8A8070] truncate">{item.source}</span>
            )}
          </div>
          <h3 className="text-sm font-medium text-[#F5F0E8] line-clamp-2 leading-snug">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-1 text-xs text-[#8A8070] line-clamp-2 leading-relaxed">
              {item.excerpt}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 text-[11px] text-[#5A5048]">{timeAgo(item.created_at)}</div>
    </article>
  )
}
