/**
 * MODULE: Containers — Update
 * Updates container fields that are allowed to change at any time:
 * container_number, seal_number, and optional module toggles.
 *
 * Workflow type is deliberately excluded from this action.
 * It cannot change after any document has been generated — enforced here
 * by not accepting it as input at all, not just by checking a flag.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { updateContainerSchema } from '@/modules/containers/schema'
import type { ActionResult } from '@/types'
import type { Container } from '@/modules/containers/types'

export async function updateContainer(
  input: unknown
): Promise<ActionResult<Container>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const parsed = updateContainerSchema.safeParse(input)
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

  const { data: container, error } = await supabase
    .from('containers')
    .update(fields)
    .eq('id', id)
    .eq('company_id', manager.company_id)
    .is('archived_at', null)
    .select()
    .single()

  if (error || !container) {
    console.error('Update container error:', error)
    return { success: false, error: 'Failed to update container. Please try again.' }
  }

  await supabase.from('audit_log').insert({
    company_id:       manager.company_id,
    entry_manager_id: manager.id,
    action_type:      'update',
    entity_type:      'container',
    entity_id:        id,
  })

  return { success: true, data: container as Container }
}
