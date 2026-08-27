/**
 * Supabase admin client — service role key.
 * Bypasses RLS entirely. Used only for operations where no user session
 * exists yet (registration) or where elevated access is explicitly required.
 *
 * NEVER import this file in any client component.
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 * This file must only ever be imported in server actions and API routes.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
  )
}

// Single admin client instance — no cookie handling needed since this
// client acts as the service role, not as a logged-in user.
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
