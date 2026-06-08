import { NextResponse } from 'next/server'
import { getGolfAPI, GolfAPIError } from '@/lib/golf-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tournamentId = parseInt(id)

    if (isNaN(tournamentId)) {
      return NextResponse.json({ error: 'Invalid tournament ID' }, { status: 400 })
    }

    const api = getGolfAPI()
    const leaderboard = await api.getLeaderboard(tournamentId)

    const isLive = leaderboard.Tournament.Status === 'InProgress'
    const cacheSeconds = isLive ? 60 : 3600

    return NextResponse.json(leaderboard, {
      headers: {
        'Cache-Control': `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`,
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
  console.error('[GolfAPI /leaderboard]', err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
