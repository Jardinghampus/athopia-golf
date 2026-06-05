'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { GolfPlayer } from '@/types/golf'

type TourFilter = GolfPlayer['tour'] | ''
type SortKey = 'world_ranking' | 'name'

const tourFilters: { value: TourFilter; label: string }[] = [
  { value: '', label: 'Alla' },
  { value: 'pga_tour', label: 'PGA Tour' },
  { value: 'european_tour', label: 'DP World Tour' },
  { value: 'liv_golf', label: 'LIV Golf' },
  { value: 'swedish', label: 'Sverige' },
]

const tourLabels: Record<GolfPlayer['tour'], string> = {
  pga_tour: 'PGA',
  european_tour: 'DP World',
  liv_golf: 'LIV',
  swedish: 'Sverige',
}

export default function StatistikPage() {
  const [players, setPlayers] = useState<GolfPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState<TourFilter>('')
  const [sortKey, setSortKey] = useState<SortKey>('world_ranking')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('golf_players').select('*')
      if (tour) q = q.eq('tour', tour)
      const { data } = await q
      setPlayers(data ?? [])
      setLoading(false)
    }
    load()
  }, [tour])

  const sorted = [...players].sort((a, b) => {
    if (sortKey === 'world_ranking') {
      if (a.world_ranking === null) return 1
      if (b.world_ranking === null) return -1
      return a.world_ranking - b.world_ranking
    }
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Statistik & Ranking
      </h1>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
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

        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#8A8070]">Sortera:</span>
          <button
            onClick={() => setSortKey('world_ranking')}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${sortKey === 'world_ranking' ? 'border-[#BA7517] text-[#BA7517]' : 'border-[rgba(186,117,23,0.2)] text-[#8A8070]'}`}
          >
            World Ranking
          </button>
          <button
            onClick={() => setSortKey('name')}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${sortKey === 'name' ? 'border-[#BA7517] text-[#BA7517]' : 'border-[rgba(186,117,23,0.2)] text-[#8A8070]'}`}
          >
            Namn
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[rgba(186,117,23,0.12)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(186,117,23,0.12)] bg-[rgba(186,117,23,0.05)]">
                <th className="text-left px-4 py-3 text-xs text-[#8A8070] font-medium">Rank</th>
                <th className="text-left px-4 py-3 text-xs text-[#8A8070] font-medium">Spelare</th>
                <th className="hidden md:table-cell text-left px-4 py-3 text-xs text-[#8A8070] font-medium">Land</th>
                <th className="text-left px-4 py-3 text-xs text-[#8A8070] font-medium">Tour</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((player, idx) => (
                <tr key={player.id} className="border-b border-[rgba(186,117,23,0.06)] hover:bg-[rgba(186,117,23,0.04)] transition-colors">
                  <td className="px-4 py-3 text-sm text-[#8A8070]">
                    {player.world_ranking ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/spelare/${player.slug}`} className="text-sm text-[#F5F0E8] hover:text-[#EF9F27] transition-colors">
                      {player.name}
                    </a>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-[#8A8070]">
                    {player.nationality ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(186,117,23,0.1)] text-[#BA7517]">
                      {tourLabels[player.tour]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sorted.length === 0 && (
            <div className="text-center py-10 text-[#8A8070] text-sm">Ingen data tillgänglig.</div>
          )}
        </div>
      )}
    </div>
  )
}
