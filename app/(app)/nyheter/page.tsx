export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { supabase, SPORT } from '@/lib/supabase'
import TopCarousel, { type CarouselItem } from '@/components/news/TopCarousel'
import ArticleCard, { type NormalizedArticle } from '@/components/news/ArticleCard'
import AISummaryBanner from '@/components/news/AISummaryBanner'
import FilterPills from '@/components/news/FilterPills'
import SectionEyebrow from '@/components/news/SectionEyebrow'
import AnimatedSection from '@/components/news/AnimatedSection'

export const revalidate = 60

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(a: any): NormalizedArticle {
  return {
    id: a.id,
    title: a.title ?? '',
    excerpt: a.excerpt ?? null,
    image_url: a.image_url ?? null,
    tour: a.tour ?? 'pga_tour',
    source: a.source ?? 'Athopia',
    published_at: a.published_at ?? a.created_at,
    slug: a.slug ?? a.id,
    is_ai_summary: a.is_ai_summary ?? false,
  }
}

async function getTopArticles(): Promise<CarouselItem[]> {
  const { data: featured } = await supabase
    .from('articles')
    .select('*')
    .eq('sport', SPORT)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(5)

  if (featured && featured.length > 0) return featured.map(normalize)

  const { data: latest } = await supabase
    .from('articles')
    .select('*')
    .eq('sport', SPORT)
    .order('created_at', { ascending: false })
    .limit(5)

  return (latest ?? []).map(normalize)
}

async function getArticles(tour?: string): Promise<NormalizedArticle[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('sport', SPORT)
    .order('created_at', { ascending: false })
    .limit(20)

  if (tour && tour !== 'all' && tour !== 'ai') query = query.eq('tour', tour)
  if (tour === 'ai') query = query.eq('is_ai_summary', true)

  const { data } = await query
  return (data ?? []).map(normalize)
}

async function getLatestSummary() {
  try {
    const { data } = await supabase
      .from('agent_reports')
      .select('id, title, content, created_at')
      .eq('sport', SPORT)
      .eq('report_type', 'daily_summary')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function NyheterPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>
}) {
  const { tour } = await searchParams

  const [topArticles, articles, summary] = await Promise.all([
    getTopArticles(),
    getArticles(tour),
    getLatestSummary(),
  ])

  const featuredArticle = articles[0] ?? null
  const gridArticles = articles.slice(1, 5)
  const listArticles = articles.slice(5, 13)

  return (
    <div className="nyheter-page">
      <div className="dot-grid-bg" aria-hidden="true" />

      <header className="page-header">
        <SectionEyebrow label="Senaste nyheter" />
        <h1 className="page-title">
          <span className="title-dark">Golf på högsta nivå.</span>
          <br />
          <span className="title-muted">Vad som händer nu.</span>
        </h1>
      </header>

      {topArticles.length > 0 && (
        <section className="carousel-section">
          <TopCarousel items={topArticles} />
        </section>
      )}

      <Suspense fallback={<div style={{ height: '54px' }} />}>
        <FilterPills />
      </Suspense>

      {summary && (
        <AnimatedSection className="section-padding" delay={0.05}>
          <AISummaryBanner summary={summary} />
        </AnimatedSection>
      )}

      {featuredArticle && (
        <AnimatedSection className="section-padding" delay={0.1}>
          <SectionEyebrow label="Featured" />
          <ArticleCard article={featuredArticle} size="featured" />
        </AnimatedSection>
      )}

      {gridArticles.length > 0 && (
        <AnimatedSection className="section-padding" delay={0.15}>
          <div className="article-grid">
            {gridArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} size="standard" index={i} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {listArticles.length > 0 && (
        <AnimatedSection className="section-padding" delay={0.2}>
          <SectionEyebrow label="Senaste från tour" />
          <div className="compact-list">
            {listArticles.map((article, i) => (
              <div key={article.id}>
                <ArticleCard article={article} size="compact" index={i} />
                {i < listArticles.length - 1 && <div className="list-divider" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      <div className="load-more-wrap">
        <button className="load-more-btn">Ladda fler nyheter</button>
      </div>
    </div>
  )
}
