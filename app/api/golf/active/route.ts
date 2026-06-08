import { NextResponse } from 'next/server'
import { getGolfAPI, GolfAPIError } from '@/lib/golf-api'

export async function GET() {
  try {
    const api = getGolfAPI()
    const active = await api.getActiveTournament()

    if (!active) {
      const next = await api.getNextTournament()
      return NextResponse.json({ active: null, next })
    }

    const top10 = active.Covered ? await api.getTopPlayers(active.TournamentID, 10) : []

    return NextResponse.json(
      { active, top10 },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (err) {
    return handleError(err)
  }
}

function handleError(err: unknown) {
  if (err instanceof GolfAPIError) {
    if (err.isRateLimit) return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })
    if (err.isUnauthorized) return NextResponse.json({ error: 'API key invalid.' }, { status: 401 })
    if (err.isNotFound) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }
  console.error('[GolfAPI /active]', err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
