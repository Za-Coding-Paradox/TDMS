/**
 * MODULE: Containers — Archive
 * Soft-deletes a container. Never hard-deletes.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { archiveContainerSchema } from '@/modules/containers/schema'
import type { ActionResult } from '@/types'

export async function archiveContainer(
  input: unknown
): Promise<ActionResult<null>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = archiveContainerSchema.safeParse(input)
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
    .from('containers')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', parsed.data.id)
    .eq('company_id', manager.company_id)
    .is('archived_at', null)

  if (error) {
    console.error('Archive container error:', error)
    return { success: false, error: 'Failed to archive container. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'archive',
    entity_type:      'container',
    entity_id:        parsed.data.id,
  })

  return { success: true, data: null }
}
