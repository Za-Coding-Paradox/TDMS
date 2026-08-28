/**
 * MODULE: Customers — Set Status
 * Changes customer status between active and blacklisted.
 * Archived customers cannot be reactivated through this action —
 * archiving is permanent. Use this only for active ↔ blacklisted toggle.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { setCustomerStatusSchema } from '@/modules/customers/schema'
import type { ActionResult } from '@/types'

export async function setCustomerStatus(
  input: unknown
): Promise<ActionResult<null>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = setCustomerStatusSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  // Cannot set status to archived via this action — use archiveCustomer instead
  if (parsed.data.status === 'archived') {
    return { success: false, error: 'Use the archive action to archive a customer.' }
  }

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  const { error } = await supabase
    .from('customers')
    .update({ status: parsed.data.status })
    .eq('id', parsed.data.id)
    .eq('company_id', manager.company_id)
    // Cannot change status of an archived customer
    .is('archived_at', null)

  if (error) {
    console.error('Set customer status error:', error)
    return { success: false, error: 'Failed to update customer status.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'update',
    entity_type:      'customer',
    entity_id:        parsed.data.id,
    field_name:       'status',
    new_value:        parsed.data.status,
  })

  return { success: true, data: null }
}
