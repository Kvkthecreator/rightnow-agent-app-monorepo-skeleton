// web/lib/supabaseServerClient.ts
import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log("⏺ Supabase URL:", supabaseUrl);
  console.log("⏺ Service Role Key (first 8 chars):", supabaseKey.slice(0, 8) + "…");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}



