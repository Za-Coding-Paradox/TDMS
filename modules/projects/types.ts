/**
 * MODULE: Projects
 * Types for project records and list queries.
 */

export interface Project {
  id:               string
  company_id:       string
  customer_id:      string
  name:             string
  reference_number: string
  commodity:        string
  contract_date:    string
  created_at:       string
  updated_at:       string
  archived_at:      string | null
}

export interface ProjectListItem {
  id:               string
  name:             string
  reference_number: string
  commodity:        string
  contract_date:    string
  archived_at:      string | null
  customer: {
    id:           string
    company_name: string
    country:      string | null
  }
  container_count: number
}

export interface ProjectWithContainers extends Project {
  customer: {
    id:           string
    company_name: string
    country:      string | null
    status:       string
  }
  containers: import('@/modules/containers/types').Container[]
}
