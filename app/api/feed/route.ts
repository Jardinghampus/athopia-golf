import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
import type { FeedItem } from '@/types/golf'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sport = searchParams.get('sport') ?? 'golf'
  const type = searchParams.get('type') ?? 'all'
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '40'), 100)

  const items: FeedItem[] = []

  if (type === 'all' || type === 'news') {
    const { data } = await supabaseAdmin
      .from('articles')
      .select('id, title, excerpt, source, sport, created_at')
      .eq('sport', sport)
      .order('created_at', { ascending: false })
      .limit(limit)

    for (const a of data ?? []) {
      items.push({
        id: a.id,
        type: 'news',
        title: a.title,
        excerpt: a.excerpt ?? null,
        source: a.source ?? null,
        sport: a.sport,
        created_at: a.created_at,
      })
    }
  }

  if (type === 'all' || type === 'forum') {
    const { data } = await supabaseAdmin
      .from('forum_threads')
      .select('id, title, content, sport, created_at')
      .eq('sport', sport)
      .order('created_at', { ascending: false })
      .limit(limit)

    for (const t of data ?? []) {
      items.push({
        id: t.id,
        type: 'forum',
        title: t.title,
        excerpt: t.content?.slice(0, 160) ?? null,
        source: null,
        sport: t.sport,
        created_at: t.created_at,
      })
    }
  }

  items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json(items.slice(0, limit))
}
