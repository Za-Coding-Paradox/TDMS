/**
 * Global shared types.
 * Every server action returns ActionResult<T>.
 * Domain-specific types live in their module's types.ts file.
 */

// Every server action returns one of these — no bare throws to client
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// Workflow type assigned per container at creation
export type WorkflowType = 'lc' | 'non_lc'

// Stage status used across all document pipeline stages
export type StageStatus =
  | 'not_started'
  | 'in_progress'
  | 'awaiting_scan_upload'
  | 'ai_review_pending'
  | 'completed'
  | 'discrepancy'

// Discrepancy severity levels used in LC scrutiny and document comparison
export type DiscrepancySeverity = 'critical' | 'warning' | 'informational'

// Confidence levels returned by the vision AI for each extracted field
export type AiConfidence = 'high' | 'medium' | 'low' | null

// Incoterms 2020 — the full set used in trade documents
export type Incoterm =
  | 'EXW'
  | 'FCA'
  | 'CPT'
  | 'CIP'
  | 'DAP'
  | 'DPU'
  | 'DDP'
  | 'FAS'
  | 'FOB'
  | 'CFR'
  | 'CIF'

// Container size options
export type ContainerSize = '20ft' | '40ft' | '40ft_hc' | '45ft'

// Customer status
export type CustomerStatus = 'active' | 'blacklisted' | 'archived'
