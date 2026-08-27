/**
 * MODULE: Auth — Register
 * Creates a Supabase Auth user, then calls the DB transaction function
 * to create the company and entry_manager rows atomically.
 *
 * Sequence:
 *   1. Validate input (Zod)
 *   2. Create Auth user via supabase.auth.signUp
 *   3. Call create_company_and_manager DB function (service role)
 *   4. Return success with IDs
 *
 * If step 3 fails, the Auth user exists but has no company.
 * We handle this by deleting the orphaned Auth user before returning the error.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { registerSchema } from '@/modules/auth/schema'
import type { ActionResult } from '@/types'
import type { RegisterResult } from '@/modules/auth/types'

export async function register(
  input: unknown
): Promise<ActionResult<RegisterResult>> {
  // Step 1: Validate input
  const parsed = registerSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  const { email, password, fullName, companyName } = parsed.data

  // Step 2: Create the Supabase Auth user
  const supabase = await createSupabaseServerClient()
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    return {
      success: false,
      error: authError?.message ?? 'Registration failed. Please try again.',
    }
  }

  const authUserId = authData.user.id

  // Step 3: Create company and entry_manager in a single DB transaction.
  // Uses service role to bypass RLS — no session exists yet at this point.
  try {
    const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc(
      'create_company_and_manager',
      {
        p_auth_user_id: authUserId,
        p_full_name: fullName,
        p_email: email,
        p_company_name: companyName,
      }
    )

    if (rpcError) {
      // Clean up the orphaned Auth user before returning the error
      await supabaseAdmin.auth.admin.deleteUser(authUserId)
      return { success: false, error: resolveRpcError(rpcError.message) }
    }

    const result = rpcData as { company_id: string; manager_id: string }

    return {
      success: true,
      data: {
        companyId: result.company_id,
        managerId: result.manager_id,
        email,
      },
    }
  } catch (error) {
    // Clean up orphaned Auth user on any unexpected failure
    await supabaseAdmin.auth.admin.deleteUser(authUserId)
    console.error('Registration error:', error)
    return { success: false, error: 'Registration failed. Please try again.' }
  }
}

// Maps DB-level error codes to plain English messages for the user
function resolveRpcError(message: string): string {
  if (message.includes('COMPANY_NAME_TAKEN')) {
    return 'A company with that name is already registered.'
  }
  return 'Registration failed. Please try again.'
}
