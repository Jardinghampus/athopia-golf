'use client'

import { useEffect, useState } from 'react'
import { supabase, SPORT } from '@/lib/supabase'
import FeedItemCard from '@/components/FeedItem'
import type { FeedItem } from '@/types/golf'

type FilterType = 'all' | 'news' | 'summary' | 'forum' | 'podcast'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Alla' },
  { value: 'news', label: 'Nyheter' },
  { value: 'summary', label: 'AI' },
  { value: 'forum', label: 'Forum' },
  { value: 'podcast', label: 'Podcast' },
]

export default function FeedPage() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('articles')
        .select('id, title, excerpt, source, sport, created_at')
        .eq('sport', SPORT)
        .order('created_at', { ascending: false })
        .limit(40)

      const feed: FeedItem[] = (data ?? []).map((a: Record<string, unknown>) => ({
        id: a.id as string,
        type: 'news' as const,
        title: a.title as string,
        excerpt: (a.excerpt as string) ?? null,
        source: (a.source as string) ?? null,
        sport: a.sport as string,
        created_at: a.created_at as string,
      }))
      setItems(feed)
      setLoading(false)
    }
    load()
  }, [])

  const displayed = filter === 'all' ? items : items.filter((i) => i.type === filter)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Din feed
      </h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === f.value
                ? 'bg-[#BA7517] border-[#BA7517] text-[#0A0A08]'
                : 'border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">Inget innehåll ännu.</div>
      ) : (
        <div className="space-y-3">
          {displayed.map((item) => (
            <FeedItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
