/**
 * MODULE: Auth — Password Reset
 * Two actions:
 *   requestPasswordReset — sends reset email via Supabase Auth
 *   updatePassword       — sets a new password after the user clicks the link
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { resetPasswordSchema, updatePasswordSchema } from '@/modules/auth/schema'
import type { ActionResult } from '@/types'

// Sends a password reset email. The link in the email points to /reset-password/confirm
// where the user enters their new password.
export async function requestPasswordReset(
  input: unknown
): Promise<ActionResult<null>> {
  const parsed = resetPasswordSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    // After clicking the link, user lands here to enter new password
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/confirm`,
  })

  if (error) {
    console.error('Password reset request error:', error)
    // Do not reveal whether the email exists — always return success message
  }

  // Always return success to avoid email enumeration attacks.
  // If the email is not in the system, Supabase silently does nothing.
  return { success: true, data: null }
}

// Called after the user clicks the reset link in their email and enters
// a new password. Supabase Auth handles token verification automatically
// via the session established when the user arrives from the email link.
export async function updatePassword(
  input: unknown
): Promise<ActionResult<null>> {
  const parsed = updatePasswordSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    console.error('Password update error:', error)
    return { success: false, error: 'Failed to update password. Please try again.' }
  }

  return { success: true, data: null }
}
