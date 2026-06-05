'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase, SPORT } from '@/lib/supabase'
import AISummaryCard from '@/components/AISummaryCard'
import type { GolfPlayer, GolfResult } from '@/types/golf'

type Tab = 'oversikt' | 'statistik' | 'nyheter' | 'analys'

const tabs: { value: Tab; label: string }[] = [
  { value: 'oversikt', label: 'Översikt' },
  { value: 'statistik', label: 'Statistik' },
  { value: 'nyheter', label: 'Nyheter' },
  { value: 'analys', label: 'AI-analys' },
]

const tourLabels: Record<GolfPlayer['tour'], string> = {
  pga_tour: 'PGA Tour',
  european_tour: 'DP World Tour',
  liv_golf: 'LIV Golf',
  swedish: 'Sverige',
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function SpelarePage() {
  const { slug } = useParams<{ slug: string }>()
  const [player, setPlayer] = useState<GolfPlayer | null>(null)
  const [results, setResults] = useState<GolfResult[]>([])
  const [articles, setArticles] = useState<{ id: string; title: string; created_at: string }[]>([])
  const [tab, setTab] = useState<Tab>('oversikt')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: r }, { data: a }] = await Promise.all([
        supabase.from('golf_players').select('*').eq('slug', slug).single(),
        supabase.from('golf_results').select('*').eq('player_slug', slug).order('created_at', { ascending: false }).limit(10),
        supabase.from('articles').select('id, title, created_at').eq('sport', SPORT).eq('player_slug', slug).order('created_at', { ascending: false }).limit(10),
      ])
      setPlayer(p)
      setResults(r ?? [])
      setArticles(a ?? [])
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="h-32 rounded-xl bg-[#111109] animate-pulse mb-6" />
        <div className="h-8 rounded bg-[#111109] animate-pulse w-64 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-[#111109] animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!player) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-[#8A8070]">
        Spelare hittades inte.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/spelare" className="inline-flex items-center gap-1.5 text-sm text-[#8A8070] hover:text-[#F5F0E8] mb-6">
        <ArrowLeft size={14} /> Alla spelare
      </Link>

      <div className="flex items-center gap-4 mb-8">
        {player.profile_image_url ? (
          <img src={player.profile_image_url} alt={player.name} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-semibold text-[#0A0A08]"
            style={{ background: 'linear-gradient(135deg, #EF9F27, #BA7517)' }}
          >
            {initials(player.name)}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-semibold text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {player.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            {player.nationality && <span className="text-sm text-[#8A8070]">{player.nationality}</span>}
            <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(186,117,23,0.12)] text-[#BA7517]">
              {tourLabels[player.tour]}
            </span>
            {player.world_ranking && (
              <span className="text-sm text-[#8A8070]">World #{player.world_ranking}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-[rgba(186,117,23,0.1)]">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
              tab === t.value
                ? 'border-[#BA7517] text-[#EF9F27]'
                : 'border-transparent text-[#8A8070] hover:text-[#F5F0E8]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'oversikt' && (
        <div className="space-y-4">
          {player.bio && <p className="text-sm text-[#C8BFA8] leading-relaxed">{player.bio}</p>}
          <h2 className="text-lg font-semibold text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Senaste resultat
          </h2>
          {results.length === 0 ? (
            <p className="text-sm text-[#8A8070]">Inga resultat ännu.</p>
          ) : (
            <div className="space-y-2">
              {results.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-[#111109] border border-[rgba(186,117,23,0.1)]">
                  <span className="text-sm text-[#F5F0E8]">{r.tournament_slug}</span>
                  <div className="flex items-center gap-4">
                    {r.score !== null && <span className="text-sm text-[#8A8070]">{r.score > 0 ? `+${r.score}` : r.score}</span>}
                    {r.position !== null && <span className="text-sm font-medium text-[#BA7517]">T{r.position}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'statistik' && (
        <div className="text-sm text-[#8A8070] py-8 text-center">Detaljerad statistik kommer snart.</div>
      )}

      {tab === 'nyheter' && (
        <div className="space-y-3">
          {articles.length === 0 ? (
            <p className="text-sm text-[#8A8070]">Inga nyheter om {player.name} ännu.</p>
          ) : (
            articles.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-[#111109] border border-[rgba(186,117,23,0.1)]">
                <p className="text-sm text-[#F5F0E8]">{a.title}</p>
                <p className="text-[11px] text-[#5A5048] mt-1">{new Date(a.created_at).toLocaleDateString('sv-SE')}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'analys' && (
        <AISummaryCard
          content={`Vår analys av ${player.name} baseras på de senaste prestationerna och världsrankingen. Mer detaljerad AI-analys kommer att genereras automatiskt när data finns tillgänglig.`}
          generatedAt={new Date().toISOString()}
          title={`Analys: ${player.name}`}
        />
      )}
    </div>
  )
}
