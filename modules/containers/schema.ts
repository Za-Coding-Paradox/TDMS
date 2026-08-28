/**
 * MODULE: Containers
 * Zod schemas for container create and update operations.
 */

import { z } from 'zod'

export const createContainerSchema = z.object({
  project_id:       z.string().uuid('Invalid project ID'),
  size:             z.enum(['20ft', '40ft', '40ft_hc', '45ft']),
  workflow_type:    z.enum(['lc', 'non_lc']),
  container_number: z.string().max(20).trim().optional(),
  seal_number:      z.string().max(20).trim().optional(),
  coo_enabled:      z.boolean().default(true),
  insurance_enabled: z.boolean().default(false),
  gsp_enabled:      z.boolean().default(false),
})

export const updateContainerSchema = z.object({
  id:               z.string().uuid('Invalid container ID'),
  container_number: z.string().max(20).trim().optional(),
  seal_number:      z.string().max(20).trim().optional(),
  coo_enabled:      z.boolean().optional(),
  insurance_enabled: z.boolean().optional(),
  gsp_enabled:      z.boolean().optional(),
  // workflow_type is intentionally excluded — cannot change after documents generated
})

export const archiveContainerSchema = z.object({
  id: z.string().uuid('Invalid container ID'),
})

export type CreateContainerInput = z.infer<typeof createContainerSchema>
export type UpdateContainerInput = z.infer<typeof updateContainerSchema>
