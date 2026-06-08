export const dynamic = 'force-dynamic'

import { supabaseAdmin, SPORT, isSupabaseConfigured } from '@/lib/supabase'
import AISummaryCard from '@/components/AISummaryCard'

interface Report {
  id: string
  title: string | null
  content: string
  generated_at: string
  created_at: string
}

async function getReports(): Promise<Report[]> {
  if (!isSupabaseConfigured()) return []
  const { data } = await supabaseAdmin
    .from('articles')
    .select('id, title, content, created_at')
    .eq('sport', SPORT)
    .eq('source_name', 'Athopia AI')
    .order('created_at', { ascending: false })
    .limit(10)
  return (data ?? []).map(a => ({
    id: a.id,
    title: a.title,
    content: a.content ?? '',
    generated_at: a.created_at,
    created_at: a.created_at,
  }))
}

export default async function SammanfattningPage() {
  const reports = await getReports()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1
        className="text-3xl font-semibold text-[#F5F0E8] mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        AI-sammanfattning
      </h1>
      <p className="text-sm text-[#8A8070] mb-8">
        Dagens djupanalys från Echo — genererad automatiskt varje morgon.
      </p>

      {reports.length === 0 ? (
        <div className="text-center py-16 text-[#8A8070]">
          Ingen sammanfattning tillgänglig ännu.
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((r) => (
            <AISummaryCard
              key={r.id}
              title={r.title ?? undefined}
              content={r.content}
              generatedAt={r.generated_at ?? r.created_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
