/**
 * MODULE: Projects — Get Single
 * Returns a full project with its customer and all containers.
 * Used for the project detail page and the document pipeline view.
 */

'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'
import type { ProjectWithContainers } from '@/modules/projects/types'

export async function getProject(
  id: string
): Promise<ActionResult<ProjectWithContainers>> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  if (!id) return { success: false, error: 'Project ID is required' }

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      customer:customers ( id, company_name, country, status ),
      containers ( * )
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    return { success: false, error: 'Project not found.' }
  }

  return { success: true, data: data as ProjectWithContainers }
}
