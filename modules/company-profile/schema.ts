/**
 * MODULE: Company Profile
 * Zod schema for the company profile form.
 * All fields optional — system is usable before profile is fully complete.
 */

import { z } from 'zod'

export const companyProfileSchema = z.object({
  name:                   z.string().min(1, 'Company name is required').max(200).trim(),
  address:                z.string().max(500).trim().optional(),
  country:                z.string().max(100).trim().optional(),
  ntn:                    z.string().max(50).trim().optional(),
  bank_name:              z.string().max(200).trim().optional(),
  bank_branch:            z.string().max(200).trim().optional(),
  account_number:         z.string().max(100).trim().optional(),
  bank_address:           z.string().max(500).trim().optional(),
  swift_code:             z.string().max(20).trim().optional(),
  iban:                   z.string().max(50).trim().optional(),
  signatory_name:         z.string().max(200).trim().optional(),
  signatory_designation:  z.string().max(200).trim().optional(),
})

export type CompanyProfileInput = z.infer<typeof companyProfileSchema>
