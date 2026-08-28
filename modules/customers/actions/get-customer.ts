/**
 * MODULE: Customers — Get Single
 * Returns full customer record by ID.
 * RLS ensures only records belonging to the logged-in company are returned.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'
import type { Customer } from '@/modules/customers/types'

export async function getCustomer(
  id: string
): Promise<ActionResult<Customer>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  if (!id) return { success: false, error: 'Customer ID is required' }

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return { success: false, error: 'Customer not found.' }
  }

  return { success: true, data: data as Customer }
}
