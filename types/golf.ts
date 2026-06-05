export interface GolfPlayer {
  id: string
  slug: string
  name: string
  nationality: string | null
  world_ranking: number | null
  tour: 'pga_tour' | 'european_tour' | 'liv_golf' | 'swedish'
  profile_image_url: string | null
  bio: string | null
  created_at: string
}

export interface GolfTournament {
  id: string
  slug: string
  name: string
  tour: string
  start_date: string
  end_date: string
  course: string
  country: string
  purse_usd: number | null
  status: 'upcoming' | 'active' | 'completed'
  created_at: string
}

export interface GolfResult {
  id: string
  player_slug: string
  tournament_slug: string
  position: number | null
  score: number | null
  rounds: { round: number; score: number }[]
  earnings_usd: number | null
  created_at: string
}

export interface FeedItem {
  id: string
  type: 'news' | 'forum' | 'summary' | 'podcast'
  title: string
  excerpt: string | null
  source: string | null
  sport: string
  created_at: string
}
