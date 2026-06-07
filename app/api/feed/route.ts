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
      .select('id, title, summary, source_name, sport, published_at')
      .eq('sport', sport)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    for (const a of data ?? []) {
      items.push({
        id: a.id as string,
        type: 'news',
        title: a.title as string,
        excerpt: (a.summary as string | null) ?? null,
        source: (a.source_name as string | null) ?? null,
        sport: (a.sport as string) ?? sport,
        created_at: (a.published_at as string) ?? '',
      })
    }
  }

  if (type === 'all' || type === 'forum') {
    const { data } = await supabaseAdmin
      .from('forum_threads')
      .select('id, title, content, created_at')
      .order('created_at', { ascending: false })
      .limit(limit)

    for (const t of data ?? []) {
      items.push({
        id: t.id as string,
        type: 'forum',
        title: t.title as string,
        excerpt: ((t.content as string | null) ?? '').slice(0, 160) || null,
        source: null,
        sport,
        created_at: t.created_at as string,
      })
    }
  }

  items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json(items.slice(0, limit))
}
