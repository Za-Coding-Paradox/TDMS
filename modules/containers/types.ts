/**
 * MODULE: Containers
 * Types for container records.
 */

import type { WorkflowType, StageStatus, ContainerSize } from '@/types'

export interface Container {
  id:                      string
  company_id:              string
  project_id:              string
  size:                    ContainerSize
  container_number:        string | null
  seal_number:             string | null
  workflow_type:           WorkflowType
  has_generated_documents: boolean
  completion_percentage:   number
  coo_enabled:             boolean
  insurance_enabled:       boolean
  gsp_enabled:             boolean
  created_at:              string
  updated_at:              string
  archived_at:             string | null
}

export interface ContainerStageStatus {
  stage:  string
  status: StageStatus
}
