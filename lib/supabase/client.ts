/**
 * Supabase browser client — anon key, no cookie management.
 * Use this in client components for reading data.
 * All writes must go through server actions, never directly from client.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
