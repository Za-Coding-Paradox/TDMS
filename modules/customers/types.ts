/**
 * MODULE: Customers
 * Types for customer records and list queries.
 */

import type { CustomerStatus } from '@/types'

export interface Customer {
  id:               string
  company_id:       string
  company_name:     string
  address:          string | null
  country:          string | null
  contact_person:   string | null
  email:            string | null
  phone:            string | null
  buyer_bank_name:  string | null
  buyer_bank_swift: string | null
  category:         string | null
  tags:             string[]
  status:           CustomerStatus
  created_at:       string
  updated_at:       string
  archived_at:      string | null
}

export interface CustomerListItem {
  id:           string
  company_name: string
  country:      string | null
  category:     string | null
  tags:         string[]
  status:       CustomerStatus
  created_at:   string
}

export interface CustomerFilters {
  search?:   string
  category?: string
  status?:   CustomerStatus
  tag?:      string
}
