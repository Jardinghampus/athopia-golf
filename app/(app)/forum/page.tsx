'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Plus } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { supabase, SPORT } from '@/lib/supabase'

interface Thread {
  id: string
  title: string
  content: string
  author_name: string
  reply_count: number
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)} min sedan`
  if (h < 24) return `${h}h sedan`
  return `${Math.floor(h / 24)}d sedan`
}

export default function ForumPage() {
  const { isSignedIn } = useUser()
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('forum_threads')
        .select('id, title, content, author_name, reply_count, created_at')
        .eq('sport', SPORT)
        .order('created_at', { ascending: false })
        .limit(30)
      setThreads(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-3xl font-semibold text-[#F5F0E8]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Forum
        </h1>
        {isSignedIn && (
          <Link
            href="/forum/ny"
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-[#BA7517] text-[#0A0A08] hover:bg-[#EF9F27] transition-colors font-medium"
          >
            <Plus size={14} /> Ny tråd
          </Link>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-[#111109] animate-pulse" />
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p>Inga trådar ännu. Var den första att starta en diskussion!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.id}`}
              className="block p-4 rounded-xl bg-[#111109] border border-[rgba(186,117,23,0.1)] hover:border-[rgba(186,117,23,0.3)] transition-all"
            >
              <h2 className="text-sm font-medium text-[#F5F0E8] mb-1">{thread.title}</h2>
              <p className="text-xs text-[#8A8070] line-clamp-1 mb-2">{thread.content}</p>
              <div className="flex items-center gap-3 text-[11px] text-[#5A5048]">
                <span>{thread.author_name}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={10} />{thread.reply_count}
                </span>
                <span>·</span>
                <span>{timeAgo(thread.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
