/**
 * SportsDataIO Golf API Wrapper
 * Athopia Golf — Polythopia Group
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Tournament {
  TournamentID: number
  Name: string
  StartDate: string
  EndDate: string
  IsOver: boolean
  Covered: boolean
  Venue: string
  Location: string
  Par: number
  Yards: number
  Purse: number
  Status: 'Scheduled' | 'InProgress' | 'F' | string
  CurrentRound: number | null
  Rounds: number
  Format: string
  Country: string
  ZipCode: string | null
  Latitude: number | null
  Longitude: number | null
  TimeZone: string | null
  StartDateTime: string | null
}

export interface Player {
  PlayerID: number
  FirstName: string
  LastName: string
  Name: string
  Country: string
  Birthdate: string | null
  Height: number | null
  Weight: number | null
  PgaDebut: number | null
  PhotoUrl: string | null
  Swings: 'Right' | 'Left' | null
  Nationality: string | null
  Hometown: string | null
  College: string | null
}

export interface PlayerSeasonStats {
  PlayerID: number
  Name: string
  Season: number
  Events: number
  Wins: number
  Top10s: number
  Top5s: number
  MadeCuts: number
  AveragePoints: number
  TotalPoints: number
  Earnings: number
  WorldGolfRankings: number
  DrivingDistance: number | null
  DrivingAccuracy: number | null
  GIR: number | null
  Putts: number | null
  SandSaves: number | null
  BirdieAverage: number | null
  EagleAverage: number | null
  ScoringAverage: number | null
}

export interface Hole {
  HoleNumber: number
  Par: number
  Score: number | null
  ToPar: number | null
  Type: 'Eagle' | 'Birdie' | 'Par' | 'Bogey' | 'Double Bogey' | 'Triple Bogey' | string | null
}

export interface PlayerRound {
  RoundNumber: number
  TeeTime: string | null
  Score: number | null
  TotalStrokes: number | null
  IsWithdrawn: boolean
  Holes: Hole[]
}

export interface LeaderboardPlayer {
  PlayerTournamentID: number
  PlayerID: number
  Name: string
  Rank: number | null
  IsWithdrawn: boolean
  MadeCut: number
  TotalScore: number | null
  TotalThrough: number | null
  TotalStrokes: number | null
  Win: number
  Earnings: number | null
  FedExPoints: number | null
  Country: string | null
  Rounds: PlayerRound[]
}

export interface Leaderboard {
  Tournament: Tournament
  Players: LeaderboardPlayer[]
}

export interface Standing {
  PlayerID: number
  Name: string
  Points: number
  PointsLost: number | null
  PointsGained: number | null
  Rank: number
  PreviousRank: number | null
  Earnings: number | null
  Events: number
}

export interface CourseHole {
  HoleNumber: number
  Par: number
  Yards: number | null
  Handicap: number | null
}

export interface Course {
  CourseID: number
  Name: string
  Location: string | null
  Par: number
  Yards: number | null
  Holes: CourseHole[]
}

export interface GolfNews {
  NewsID: number
  Title: string
  Content: string | null
  Source: string | null
  Updated: string
  PlayerID: number | null
  TournamentID: number | null
}

// ─── Client ──────────────────────────────────────────────────────────────────

export class GolfAPI {
  private readonly baseUrl = 'https://api.sportsdata.io/golf/v2/json'
  private readonly key: string

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('SPORTSDATA_GOLF_API_KEY is required')
    this.key = apiKey
  }

  private async fetch<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}/${path}`
    const res = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': this.key,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      throw new GolfAPIError(
        `SportsDataIO Golf API error: ${res.status} ${res.statusText}`,
        res.status,
        path
      )
    }

    return res.json() as Promise<T>
  }

  // ─── Schedule & Events ───────────────────────────────────────────────

  async getSchedule(season: number | 'current' = 'current'): Promise<Tournament[]> {
    const s = season === 'current' ? new Date().getFullYear() : season
    return this.fetch<Tournament[]>(`Schedule/${s}`)
  }

  async getLeaderboard(tournamentId: number): Promise<Leaderboard> {
    return this.fetch<Leaderboard>(`Leaderboard/${tournamentId}`)
  }

  // ─── Players ─────────────────────────────────────────────────────────

  async getPlayers(): Promise<Player[]> {
    return this.fetch<Player[]>('Players')
  }

  async getPlayer(playerId: number): Promise<Player> {
    return this.fetch<Player>(`Player/${playerId}`)
  }

  async getPlayerSeasonStats(season: number | 'current' = 'current'): Promise<PlayerSeasonStats[]> {
    const s = season === 'current' ? new Date().getFullYear() : season
    return this.fetch<PlayerSeasonStats[]>(`PlayerSeasonStats/${s}`)
  }

  async getPlayerTournamentStats(season: number, playerId: number): Promise<PlayerSeasonStats[]> {
    return this.fetch<PlayerSeasonStats[]>(
      `PlayerTournamentStatsByPlayer/${season}/${playerId}`
    )
  }

  async getPlayerProjections(tournamentId: number): Promise<LeaderboardPlayer[]> {
    return this.fetch<LeaderboardPlayer[]>(
      `PlayerTournamentProjections/${tournamentId}`
    )
  }

  // ─── Rankings ────────────────────────────────────────────────────────

  async getStandings(season: number | 'current' = 'current'): Promise<Standing[]> {
    const s = season === 'current' ? new Date().getFullYear() : season
    return this.fetch<Standing[]>(`Standings/${s}`)
  }

  // ─── Scorecards ──────────────────────────────────────────────────────

  async getRoundScores(tournamentId: number, round: 1 | 2 | 3 | 4): Promise<PlayerRound[]> {
    return this.fetch<PlayerRound[]>(`PlayerRoundScores/${tournamentId}/${round}`)
  }

  // ─── Courses ─────────────────────────────────────────────────────────

  async getCourses(): Promise<Course[]> {
    return this.fetch<Course[]>('Courses')
  }

  // ─── News ────────────────────────────────────────────────────────────

  async getNews(): Promise<GolfNews[]> {
    return this.fetch<GolfNews[]>('News')
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  async getNextTournament(): Promise<Tournament | null> {
    const schedule = await this.getSchedule()
    const now = new Date()
    const upcoming = schedule
      .filter((t) => !t.IsOver && new Date(t.StartDate) >= now)
      .sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime())
    return upcoming[0] ?? null
  }

  async getActiveTournament(): Promise<Tournament | null> {
    const schedule = await this.getSchedule()
    return schedule.find((t) => t.Status === 'InProgress') ?? null
  }

  async getTopPlayers(tournamentId: number, limit = 10): Promise<LeaderboardPlayer[]> {
    const lb = await this.getLeaderboard(tournamentId)
    return lb.Players.filter((p) => !p.IsWithdrawn && p.MadeCut !== 0)
      .sort((a, b) => (a.Rank ?? 999) - (b.Rank ?? 999))
      .slice(0, limit)
  }
}

// ─── Error class ─────────────────────────────────────────────────────────────

export class GolfAPIError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly path: string
  ) {
    super(message)
    this.name = 'GolfAPIError'
  }

  get isRateLimit() { return this.status === 429 }
  get isUnauthorized() { return this.status === 401 }
  get isNotFound() { return this.status === 404 }
}

// ─── Singleton ───────────────────────────────────────────────────────────────

let _instance: GolfAPI | null = null

export function getGolfAPI(): GolfAPI {
  if (!_instance) {
    const key = process.env.SPORTSDATA_GOLF_API_KEY
    if (!key) throw new Error('SPORTSDATA_GOLF_API_KEY env var not set')
    _instance = new GolfAPI(key)
  }
  return _instance
}
