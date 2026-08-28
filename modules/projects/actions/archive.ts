/**
 * MODULE: Projects — Archive
 * Soft-deletes a project by setting archived_at.
 * Hard deletion is never permitted if any document has been generated.
 * We always archive regardless — simpler and safer than checking.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { archiveProjectSchema } from '@/modules/projects/schema'
import type { ActionResult } from '@/types'

export async function archiveProject(
  input: unknown
): Promise<ActionResult<null>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = archiveProjectSchema.safeParse(input)
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
    .from('projects')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', parsed.data.id)
    .eq('company_id', manager.company_id)
    .is('archived_at', null)

  if (error) {
    console.error('Archive project error:', error)
    return { success: false, error: 'Failed to archive project. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'archive',
    entity_type:      'project',
    entity_id:        parsed.data.id,
  })

  return { success: true, data: null }
}
