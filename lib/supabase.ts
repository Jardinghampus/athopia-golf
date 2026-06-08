import { createClient } from '@supabase/supabase-js'

export const SPORT = 'golf' as const

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== '')
}

const _url = supabaseUrl || 'https://placeholder.supabase.co'
const _anon = supabaseAnonKey || 'placeholder-anon-key'
const _svc = supabaseServiceKey || 'placeholder-service-key'

export const supabase = createClient(_url, _anon)
export const supabaseAdmin = createClient(_url, _svc)
