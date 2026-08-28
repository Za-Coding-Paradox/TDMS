/**
 * MODULE: Customers
 * Zod schemas for customer create and update operations.
 */

import { z } from 'zod'

export const createCustomerSchema = z.object({
  company_name:     z.string().min(1, 'Company name is required').max(200).trim(),
  address:          z.string().max(500).trim().optional(),
  country:          z.string().max(100).trim().optional(),
  contact_person:   z.string().max(200).trim().optional(),
  email:            z.string().email('Invalid email').optional().or(z.literal('')),
  phone:            z.string().max(50).trim().optional(),
  buyer_bank_name:  z.string().max(200).trim().optional(),
  buyer_bank_swift: z.string().max(20).trim().optional(),
  category:         z.string().max(100).trim().optional(),
  tags:             z.array(z.string().max(50).trim()).default([]),
})

export const updateCustomerSchema = createCustomerSchema.extend({
  id: z.string().uuid('Invalid customer ID'),
})

export const archiveCustomerSchema = z.object({
  id: z.string().uuid('Invalid customer ID'),
})

export const setCustomerStatusSchema = z.object({
  id:     z.string().uuid('Invalid customer ID'),
  status: z.enum(['active', 'blacklisted', 'archived']),
})

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
