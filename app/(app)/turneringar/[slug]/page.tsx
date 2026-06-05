'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Trophy } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import AISummaryCard from '@/components/AISummaryCard'
import type { GolfTournament, GolfResult } from '@/types/golf'

interface LeaderboardEntry extends GolfResult {
  player_name: string
}

export default function TurneringPage() {
  const { slug } = useParams<{ slug: string }>()
  const [tournament, setTournament] = useState<GolfTournament | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: t }, { data: r }] = await Promise.all([
        supabase.from('golf_tournaments').select('*').eq('slug', slug).single(),
        supabase.from('golf_results').select('*, golf_players(name)').eq('tournament_slug', slug).order('position', { ascending: true }).limit(20),
      ])
      setTournament(t)
      setLeaderboard(
        (r ?? []).map((row: Record<string, unknown>) => ({
          ...(row as unknown as GolfResult),
          player_name: (row.golf_players as { name: string } | null)?.name ?? row.player_slug as string,
        }))
      )
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="h-40 rounded-xl bg-[#111109] animate-pulse" />
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-[#8A8070]">
        Turnering hittades inte.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/turneringar" className="inline-flex items-center gap-1.5 text-sm text-[#8A8070] hover:text-[#F5F0E8] mb-6">
        <ArrowLeft size={14} /> Alla turneringar
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#F5F0E8] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {tournament.name}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-[#8A8070]">
          <span className="flex items-center gap-1.5"><MapPin size={13} />{tournament.course}, {tournament.country}</span>
          {tournament.purse_usd && (
            <span className="flex items-center gap-1.5 text-[#BA7517]">
              <Trophy size={13} />${(tournament.purse_usd / 1_000_000).toFixed(1)}M
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#F5F0E8] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Leaderboard
        </h2>
        {leaderboard.length === 0 ? (
          <p className="text-sm text-[#8A8070]">Inga resultat tillgängliga ännu.</p>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-[#111109] border border-[rgba(186,117,23,0.1)]">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium w-6 text-center ${idx < 3 ? 'text-[#EF9F27]' : 'text-[#5A5048]'}`}>
                    {entry.position ?? idx + 1}
                  </span>
                  <span className="text-sm text-[#F5F0E8]">{entry.player_name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {entry.score !== null && (
                    <span className={`text-sm font-medium ${entry.score < 0 ? 'text-[#EF9F27]' : entry.score > 0 ? 'text-[#8A8070]' : 'text-[#F5F0E8]'}`}>
                      {entry.score === 0 ? 'E' : entry.score > 0 ? `+${entry.score}` : entry.score}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AISummaryCard
        content={`Vår analys av ${tournament.name}: Turneringen på ${tournament.course} i ${tournament.country} erbjuder spelet en premiumscen. AI-genererad matchförhandsgranskning och spelarinsikter publiceras löpande under turneringens gång.`}
        generatedAt={new Date().toISOString()}
        title="AI-preview"
      />
    </div>
  )
}
