/**
 * MODULE: Containers — Create
 * Adds a container to an existing project.
 * Verifies the project belongs to this company before inserting.
 * Workflow type is set at creation and cannot change once documents exist.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createContainerSchema } from '@/modules/containers/schema'
import type { ActionResult } from '@/types'
import type { Container } from '@/modules/containers/types'

export async function createContainer(
  input: unknown
): Promise<ActionResult<Container>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = createContainerSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id, id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) return { success: false, error: 'Account not found' }

  // Verify project belongs to this company and is not archived
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', parsed.data.project_id)
    .eq('company_id', manager.company_id)
    .is('archived_at', null)
    .single()

  if (!project) {
    return { success: false, error: 'Project not found or is archived.' }
  }

  const { data: container, error } = await supabase
    .from('containers')
    .insert({ ...parsed.data, company_id: manager.company_id })
    .select()
    .single()

  if (error || !container) {
    console.error('Create container error:', error)
    return { success: false, error: 'Failed to create container. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'create',
    entity_type:      'container',
    entity_id:        container.id,
    new_value:        `${container.size} — ${container.workflow_type}`,
  })

  return { success: true, data: container as Container }
}
