/**
 * MODULE: Customers — Create
 * Creates a new customer record scoped to the logged-in company.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createCustomerSchema } from '@/modules/customers/schema'
import type { ActionResult } from '@/types'
import type { Customer } from '@/modules/customers/types'

export async function createCustomer(
  input: unknown
): Promise<ActionResult<Customer>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = createCustomerSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  const { data: customer, error } = await supabase
    .from('customers')
    .insert({ ...parsed.data, company_id: manager.company_id })
    .select()
    .single()

  if (error || !customer) {
    console.error('Create customer error:', error)
    return { success: false, error: 'Failed to create customer. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'create',
    entity_type:      'customer',
    entity_id:        customer.id,
    new_value:        customer.company_name,
  })

  return { success: true, data: customer as Customer }
}
