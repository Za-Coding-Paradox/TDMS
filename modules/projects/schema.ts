/**
 * MODULE: Projects
 * Zod schemas for project create, update, and archive operations.
 */

import { z } from 'zod'

export const createProjectSchema = z.object({
  name:            z.string().min(1, 'Project name is required').max(200).trim(),
  customer_id:     z.string().uuid('Invalid customer ID'),
  commodity:       z.string().min(1, 'Commodity is required').max(500).trim(),
  contract_date:   z.string().min(1, 'Contract date is required'),
  reference_number: z.string().min(1, 'Reference number is required').max(100).trim(),
})

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().uuid('Invalid project ID'),
})

export const archiveProjectSchema = z.object({
  id: z.string().uuid('Invalid project ID'),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
