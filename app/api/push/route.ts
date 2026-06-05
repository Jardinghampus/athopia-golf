import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { subscription, userId } = body

  if (!subscription || !userId) {
    return NextResponse.json({ error: 'subscription och userId krävs' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('push_subscriptions').upsert({
    user_id: userId,
    subscription: subscription,
    sport: 'golf',
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
