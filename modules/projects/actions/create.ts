/**
 * MODULE: Projects — Create
 * Creates a new project linked to a customer.
 * Validates that the customer belongs to the same company and is not blacklisted.
 * Blacklisted customers require explicit acknowledgement — blocked here by default.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createProjectSchema } from '@/modules/projects/schema'
import type { ActionResult } from '@/types'
import type { Project } from '@/modules/projects/types'

export async function createProject(
  input: unknown,
  acknowledgeBlacklisted = false
): Promise<ActionResult<Project>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = createProjectSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  // Verify customer belongs to this company and check blacklist status
  const { data: customer } = await supabase
    .from('customers')
    .select('id, status')
    .eq('id', parsed.data.customer_id)
    .eq('company_id', manager.company_id)
    .single()

  if (!customer) return { success: false, error: 'Customer not found.' }

  if (customer.status === 'archived') {
    return { success: false, error: 'Cannot create a project for an archived customer.' }
  }

  // Blacklisted customer — block unless Entry Manager explicitly acknowledged
  if (customer.status === 'blacklisted' && !acknowledgeBlacklisted) {
    return {
      success: false,
      error: 'BLACKLISTED_CUSTOMER',
    }
  }

  // Check reference number is unique for this company
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('company_id', manager.company_id)
    .eq('reference_number', parsed.data.reference_number)
    .single()

  if (existing) {
    return { success: false, error: 'A project with this reference number already exists.' }
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert({ ...parsed.data, company_id: manager.company_id })
    .select()
    .single()

  if (error || !project) {
    console.error('Create project error:', error)
    return { success: false, error: 'Failed to create project. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'create',
    entity_type:      'project',
    entity_id:        project.id,
    new_value:        project.name,
  })

  return { success: true, data: project as Project }
}
