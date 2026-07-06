import { createClient } from '@supabase/supabase-js'

// Supabase is OPTIONAL. If the two env vars aren't set, the app quietly falls
// back to localStorage (see lib/store.js). This lets the app run instantly —
// on your laptop and on Vercel — before any database is wired up.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
