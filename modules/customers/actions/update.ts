/**
 * MODULE: Customers — Update
 * Updates an existing customer record.
 * Only updates customers belonging to the logged-in company — enforced by RLS
 * and by the explicit company_id check in the query.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { updateCustomerSchema } from '@/modules/customers/schema'
import type { ActionResult } from '@/types'
import type { Customer } from '@/modules/customers/types'

export async function updateCustomer(
  input: unknown
): Promise<ActionResult<Customer>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = updateCustomerSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { id, ...fields } = parsed.data

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  const { data: customer, error } = await supabase
    .from('customers')
    .update(fields)
    .eq('id', id)
    .eq('company_id', manager.company_id)
    .select()
    .single()

  if (error || !customer) {
    console.error('Update customer error:', error)
    return { success: false, error: 'Failed to update customer. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'update',
    entity_type:      'customer',
    entity_id:        id,
  })

  return { success: true, data: customer as Customer }
}
