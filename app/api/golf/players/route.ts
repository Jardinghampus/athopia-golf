import { NextResponse } from 'next/server'
import { getGolfAPI, GolfAPIError } from '@/lib/golf-api'

export async function GET() {
  try {
    const api = getGolfAPI()
    const players = await api.getPlayers()

    return NextResponse.json(players, {
      headers: {
        'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400',
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
  console.error('[GolfAPI /players]', err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
