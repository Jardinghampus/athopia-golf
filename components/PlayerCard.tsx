import Link from 'next/link'
import type { GolfPlayer } from '@/types/golf'

const tourLabels: Record<GolfPlayer['tour'], string> = {
  pga_tour: 'PGA Tour',
  european_tour: 'DP World Tour',
  liv_golf: 'LIV Golf',
  swedish: 'Sverige',
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function PlayerCard({ player }: { player: GolfPlayer }) {
  return (
    <Link href={`/spelare/${player.slug}`}>
      <article className="group p-4 rounded-xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(186,117,23,0.1)] transition-all">
        <div className="flex items-center gap-3 mb-3">
          {player.profile_image_url ? (
            <img
              src={player.profile_image_url}
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-[#0A0A08]"
              style={{ background: 'linear-gradient(135deg, #EF9F27, #BA7517)' }}
            >
              {initials(player.name)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div
              className="font-semibold text-[#F5F0E8] truncate"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {player.name}
            </div>
            {player.nationality && (
              <div className="text-xs text-[#8A8070]">{player.nationality}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(186,117,23,0.12)] text-[#BA7517]">
            {tourLabels[player.tour]}
          </span>
          {player.world_ranking && (
            <span className="text-xs text-[#8A8070]">
              World #{player.world_ranking}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
