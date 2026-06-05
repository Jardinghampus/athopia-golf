'use client'

import { useEffect, useState } from 'react'
import { Play, Headphones } from 'lucide-react'
import { supabase, SPORT } from '@/lib/supabase'

interface Podcast {
  id: string
  title: string
  description: string | null
  source: string | null
  duration: number | null
  published_at: string | null
  audio_url: string | null
  created_at: string
}

function formatDuration(seconds: number | null) {
  if (!seconds) return null
  const m = Math.floor(seconds / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}min`
  return `${m}min`
}

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('id, title, excerpt, source, duration, published_at, audio_url, created_at')
        .eq('sport', SPORT)
        .eq('content_type', 'podcast')
        .order('created_at', { ascending: false })
        .limit(30)
      setPodcasts(
        (data ?? []).map((d: Record<string, unknown>) => ({
          id: d.id as string,
          title: d.title as string,
          description: (d.excerpt as string) ?? null,
          source: (d.source as string) ?? null,
          duration: (d.duration as number) ?? null,
          published_at: (d.published_at as string) ?? null,
          audio_url: (d.audio_url as string) ?? null,
          created_at: d.created_at as string,
        }))
      )
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Podcast
      </h1>
      <p className="text-sm text-[#8A8070] mb-8">Golfpoddar — senaste avsnitten samlade på ett ställe.</p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : podcasts.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">
          <Headphones size={40} className="mx-auto mb-3 opacity-30" />
          <p>Inga podcast-avsnitt ännu.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {podcasts.map((p) => (
            <div
              key={p.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.3)] transition-all"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[rgba(55,138,221,0.15)] flex items-center justify-center">
                <Play size={16} className="text-[#378ADD]" fill="#378ADD" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-[#F5F0E8] line-clamp-2 mb-1">{p.title}</h2>
                {p.description && (
                  <p className="text-xs text-[#8A8070] line-clamp-1 mb-2">{p.description}</p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-[#5A5048]">
                  {p.source && <span>{p.source}</span>}
                  {formatDuration(p.duration) && <span>{formatDuration(p.duration)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
