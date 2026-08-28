/**
 * MODULE: Projects — Update
 * Updates project fields.
 * Reference number changes are allowed only if no documents have been generated
 * for any container in this project — enforced by checking has_generated_documents.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { updateProjectSchema } from '@/modules/projects/schema'
import type { ActionResult } from '@/types'
import type { Project } from '@/modules/projects/types'

export async function updateProject(
  input: unknown
): Promise<ActionResult<Project>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = updateProjectSchema.safeParse(input)
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

  const { data: project, error } = await supabase
    .from('projects')
    .update(fields)
    .eq('id', id)
    .eq('company_id', manager.company_id)
    .is('archived_at', null)
    .select()
    .single()

  if (error || !project) {
    console.error('Update project error:', error)
    return { success: false, error: 'Failed to update project. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'update',
    entity_type:      'project',
    entity_id:        id,
  })

  return { success: true, data: project as Project }
}
