'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import PlayerCard from '@/components/PlayerCard'
import type { GolfPlayer } from '@/types/golf'

const tourFilters: { value: GolfPlayer['tour'] | ''; label: string }[] = [
  { value: '', label: 'Alla' },
  { value: 'pga_tour', label: 'PGA Tour' },
  { value: 'european_tour', label: 'DP World Tour' },
  { value: 'liv_golf', label: 'LIV Golf' },
  { value: 'swedish', label: 'Sverige' },
]

export default function SpelarnPage() {
  const [players, setPlayers] = useState<GolfPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState<GolfPlayer['tour'] | ''>('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase
        .from('golf_players')
        .select('*')
        .order('world_ranking', { ascending: true, nullsFirst: false })

      if (tour) q = q.eq('tour', tour)

      const { data } = await q
      setPlayers(data ?? [])
      setLoading(false)
    }
    load()
  }, [tour])

  const filtered = search
    ? players.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : players

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Spelare
      </h1>

      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8070]" />
          <input
            type="text"
            placeholder="Sök spelare..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#111109] border border-[rgba(186,117,23,0.2)] text-sm text-[#F5F0E8] placeholder-[#5A5048] focus:outline-none focus:border-[rgba(186,117,23,0.5)]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {tourFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setTour(f.value as GolfPlayer['tour'] | '')}
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
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">Inga spelare hittades.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  )
}
