import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Autentisering krävs' }, { status: 401 })
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Supabase ej konfigurerat' }, { status: 503 })

  const { data: existing } = await supabaseAdmin
    .from('push_subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('sport', 'golf')
  if ((existing as unknown as { count: number } | null)?.count ?? 0 >= 5) {
    return NextResponse.json({ error: 'Max prenumerationer uppnått' }, { status: 429 })
  }

  const body = await req.json()
  const { subscription } = body
  if (!subscription?.endpoint) return NextResponse.json({ error: 'Ogiltig subscription' }, { status: 400 })

  const { error } = await supabaseAdmin.from('push_subscriptions').upsert({
    user_id: userId,
    subscription,
    sport: 'golf',
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
