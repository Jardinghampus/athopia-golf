'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import TournamentCard from '@/components/TournamentCard'
import type { GolfTournament } from '@/types/golf'

type StatusFilter = '' | 'upcoming' | 'active' | 'completed'

const filters: { value: StatusFilter; label: string }[] = [
  { value: '', label: 'Alla' },
  { value: 'active', label: 'Pågående' },
  { value: 'upcoming', label: 'Kommande' },
  { value: 'completed', label: 'Avslutade' },
]

export default function TurneringarPage() {
  const [tournaments, setTournaments] = useState<GolfTournament[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<StatusFilter>('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase
        .from('golf_tournaments')
        .select('*')
        .order('start_date', { ascending: false })

      if (status) q = q.eq('status', status)

      const { data } = await q
      setTournaments(data ?? [])
      setLoading(false)
    }
    load()
  }, [status])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Turneringar
      </h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatus(f.value)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              status === f.value
                ? 'bg-[#BA7517] border-[#BA7517] text-[#0A0A08]'
                : 'border-[rgba(186,117,23,0.3)] text-[#8A8070] hover:text-[#F5F0E8]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : tournaments.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">Inga turneringar hittades.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournaments.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      )}
    </div>
  )
}
