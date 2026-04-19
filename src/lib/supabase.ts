import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// Fall back to a valid placeholder if env var is not a real URL (e.g., during build without credentials)
const supabaseUrl = rawUrl?.startsWith('http') ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
