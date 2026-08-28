/**
 * MODULE: Containers — Get Single
 * Returns a single container by ID.
 * RLS ensures it belongs to the logged-in company.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'
import type { Container } from '@/modules/containers/types'

export async function getContainer(
  id: string
): Promise<ActionResult<Container>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  if (!id) return { success: false, error: 'Container ID is required' }

  const { data, error } = await supabase
    .from('containers')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return { success: false, error: 'Container not found.' }
  }

  return { success: true, data: data as Container }
}
