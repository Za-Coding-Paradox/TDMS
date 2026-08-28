/**
 * MODULE: Customers — Get List
 * Returns a filtered list of customers for the logged-in company.
 * Supports search by name, filter by category, status, and tag.
 * Archived customers are excluded by default unless status filter
 * explicitly requests them.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'
import type { CustomerListItem, CustomerFilters } from '@/modules/customers/types'

export async function getCustomers(
  filters: CustomerFilters = {}
): Promise<ActionResult<CustomerListItem[]>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  let query = supabase
    .from('customers')
    .select('id, company_name, country, category, tags, status, created_at')
    .order('company_name', { ascending: true })

  // Exclude archived unless explicitly filtering for them
  if (filters.status) {
    query = query.eq('status', filters.status)
  } else {
    query = query.neq('status', 'archived')
  }

  if (filters.search) {
    query = query.ilike('company_name', `%${filters.search}%`)
  }

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  // Tag filter — array contains
  if (filters.tag) {
    query = query.contains('tags', [filters.tag])
  }

  const { data, error } = await query

  if (error) {
    console.error('Get customers error:', error)
    return { success: false, error: 'Failed to load customers.' }
  }

  return { success: true, data: (data ?? []) as CustomerListItem[] }
}
