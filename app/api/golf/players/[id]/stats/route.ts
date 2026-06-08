import { NextResponse } from 'next/server'
import { getGolfAPI, GolfAPIError } from '@/lib/golf-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const playerId = parseInt(id)

    if (isNaN(playerId)) {
      return NextResponse.json({ error: 'Invalid player ID' }, { status: 400 })
    }

    const api = getGolfAPI()
    const season = new Date().getFullYear()
    const stats = await api.getPlayerTournamentStats(season, playerId)

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
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
  console.error('[GolfAPI /players/stats]', err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
