/**
 * MODULE: Projects — Get List
 * Returns all active projects for the logged-in company.
 * Includes customer name and container count for the list view.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'
import type { ProjectListItem } from '@/modules/projects/types'

export async function getProjects(
  includeArchived = false
): Promise<ActionResult<ProjectListItem[]>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  let query = supabase
    .from('projects')
    .select(`
      id,
      name,
      reference_number,
      commodity,
      contract_date,
      archived_at,
      customer:customers ( id, company_name, country ),
      containers ( id )
    `)
    .order('created_at', { ascending: false })

  if (!includeArchived) {
    query = query.is('archived_at', null)
  }

  const { data, error } = await query

  if (error) {
    console.error('Get projects error:', error)
    return { success: false, error: 'Failed to load projects.' }
  }

  // Map container array to count
  const projects = (data ?? []).map((p: any) => ({
    ...p,
    container_count: p.containers?.length ?? 0,
    containers: undefined,
  }))

  return { success: true, data: projects as ProjectListItem[] }
}
