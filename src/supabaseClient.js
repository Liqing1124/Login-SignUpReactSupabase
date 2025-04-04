import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and anon key from your Supabase project settings
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
