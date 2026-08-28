/**
 * MODULE: Customers — Archive
 * Soft-deletes a customer by setting archived_at timestamp.
 * Customers with linked projects can still be archived — they simply
 * cannot be used for new projects after archiving.
 * Hard deletion is never permitted.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { archiveCustomerSchema } from '@/modules/customers/schema'
import type { ActionResult } from '@/types'

export async function archiveCustomer(
  input: unknown
): Promise<ActionResult<null>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = archiveCustomerSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  const { error } = await supabase
    .from('customers')
    .update({ archived_at: new Date().toISOString(), status: 'archived' })
    .eq('id', parsed.data.id)
    .eq('company_id', manager.company_id)
    // Cannot archive an already archived customer
    .is('archived_at', null)

  if (error) {
    console.error('Archive customer error:', error)
    return { success: false, error: 'Failed to archive customer. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'archive',
    entity_type:      'customer',
    entity_id:        parsed.data.id,
  })

  return { success: true, data: null }
}
