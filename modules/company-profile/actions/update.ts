/**
 * MODULE: Company Profile — Update Profile
 * Saves company profile fields to the companies table.
 * Profile edits do NOT retroactively update previously generated documents.
 * That is enforced by the snapshot pattern in the Sales Contract module.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { companyProfileSchema } from '@/modules/company-profile/schema'
import type { ActionResult } from '@/types'

export async function updateCompanyProfile(
  input: unknown
): Promise<ActionResult<null>> {
  const supabase = await createSupabaseServerClient()

  // Verify session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  // Validate input
  const parsed = companyProfileSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  // Get the company_id for this user
  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  // Update company profile
  const { error: updateError } = await supabase
    .from('companies')
    .update(parsed.data)
    .eq('id', manager.company_id)

  if (updateError) {
    console.error('Company profile update error:', updateError)
    return { success: false, error: 'Failed to save profile. Please try again.' }
  }

  // Write audit log entry
  await supabase.from('audit_log').insert({
    company_id: manager.company_id,
    entry_manager_id: manager.id,
    action_type: 'update',
    entity_type: 'company',
    entity_id: manager.company_id,
  })

  return { success: true, data: null }
}
