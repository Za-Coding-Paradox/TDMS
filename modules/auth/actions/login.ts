/**
 * MODULE: Auth — Login
 * Authenticates the user via Supabase Auth, then fetches their
 * entry_manager record to confirm the account is fully set up.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { loginSchema } from '@/modules/auth/schema'
import type { ActionResult } from '@/types'
import type { LoginResult } from '@/modules/auth/types'

export async function login(
  input: unknown
): Promise<ActionResult<LoginResult>> {
  // Step 1: Validate input
  const parsed = loginSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  const { email, password } = parsed.data
  const supabase = await createSupabaseServerClient()

  // Step 2: Sign in via Supabase Auth
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password })

  if (authError || !authData.user) {
    // Keep error vague — do not confirm whether the email exists
    return { success: false, error: 'Incorrect email or password.' }
  }

  // Step 3: Fetch entry_manager record to confirm account is complete
  // RLS ensures we only get back a record belonging to this auth user
  const { data: manager, error: managerError } = await supabase
    .from('entry_managers')
    .select('id, company_id, full_name, email')
    .eq('auth_user_id', authData.user.id)
    .single()

  if (managerError || !manager) {
    // Auth succeeded but no manager record exists — corrupted account state
    console.error('Login: no entry_manager found for auth user', authData.user.id)
    await supabase.auth.signOut()
    return {
      success: false,
      error: 'Account setup incomplete. Please contact support.',
    }
  }

  return {
    success: true,
    data: {
      companyId: manager.company_id,
      managerId: manager.id,
      email: manager.email,
      fullName: manager.full_name,
    },
  }
}
