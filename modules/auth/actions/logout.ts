/**
 * MODULE: Auth — Logout
 * Signs the user out and clears their session cookie.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ActionResult } from '@/types'

export async function logout(): Promise<ActionResult<null>> {
  try {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Logout error:', error)
    // Sign out failure should not block the user from leaving —
    // redirect to login regardless so the UI clears
  }

  redirect('/login')
}
