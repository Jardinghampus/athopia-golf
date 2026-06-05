import Link from 'next/link'
import { MapPin, Trophy } from 'lucide-react'
import type { GolfTournament } from '@/types/golf'

const statusConfig = {
  upcoming: { label: 'Kommande', color: '#8A8070' },
  active: { label: 'Pågående', color: '#EF9F27' },
  completed: { label: 'Avslutad', color: '#5A5048' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function formatPurse(usd: number | null) {
  if (!usd) return null
  return '$' + (usd / 1_000_000).toFixed(1) + 'M'
}

export default function TournamentCard({ tournament }: { tournament: GolfTournament }) {
  const st = statusConfig[tournament.status]

  return (
    <Link href={`/turneringar/${tournament.slug}`}>
      <article className="group p-4 rounded-xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(186,117,23,0.1)] transition-all">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="font-semibold text-[#F5F0E8] leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {tournament.name}
          </h3>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: `${st.color}22`, color: st.color }}
          >
            {st.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8A8070] mb-1">
          <MapPin size={11} />
          <span>{tournament.course}, {tournament.country}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[#8A8070]">
            {formatDate(tournament.start_date)} – {formatDate(tournament.end_date)}
          </span>
          {tournament.purse_usd && (
            <div className="flex items-center gap-1 text-xs text-[#BA7517]">
              <Trophy size={11} />
              <span>{formatPurse(tournament.purse_usd)}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
