'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, SPORT } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  excerpt: string | null
  source: string | null
  tour: string | null
  created_at: string
  slug: string | null
}

const tourFilters = [
  { value: '', label: 'Alla' },
  { value: 'pga_tour', label: 'PGA Tour' },
  { value: 'european_tour', label: 'DP World Tour' },
  { value: 'liv_golf', label: 'LIV Golf' },
  { value: 'swedish', label: 'Sverige' },
]

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)} min sedan`
  if (h < 24) return `${h}h sedan`
  return `${Math.floor(h / 24)}d sedan`
}

export default function NyheterPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState('')
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 20

  useEffect(() => {
    setPage(0)
    setArticles([])
  }, [tour])

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase
        .from('articles')
        .select('id, title, excerpt, source, tour, created_at, slug')
        .eq('sport', SPORT)
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)

      if (tour) q = q.eq('tour', tour)

      const { data } = await q
      setArticles((prev) => (page === 0 ? (data ?? []) : [...prev, ...(data ?? [])]))
      setLoading(false)
    }
    load()
  }, [tour, page])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Nyheter
      </h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tourFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setTour(f.value)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              tour === f.value
                ? 'bg-[#BA7517] border-[#BA7517] text-[#0A0A08]'
                : 'border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && articles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-36 rounded-xl bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={a.slug ? `/nyheter/${a.slug}` : '#'}
                className="group p-4 rounded-xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.35)] transition-all"
              >
                <h2 className="text-sm font-medium text-[#F5F0E8] leading-snug mb-2 line-clamp-3">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="text-xs text-[#8A8070] line-clamp-2 mb-3">{a.excerpt}</p>
                )}
                <div className="flex items-center justify-between">
                  {a.source && <span className="text-[11px] text-[#5A5048]">{a.source}</span>}
                  <span className="text-[11px] text-[#5A5048]">{timeAgo(a.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="px-6 py-2 rounded-full border border-[rgba(186,117,23,0.3)] text-[#BA7517] text-sm hover:bg-[rgba(186,117,23,0.1)] transition-colors disabled:opacity-40"
            >
              {loading ? 'Laddar...' : 'Ladda fler'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
