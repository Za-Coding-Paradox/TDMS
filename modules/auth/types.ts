/**
 * MODULE: Auth
 * Types for auth server action return values and session data.
 */

// Returned by the register action on success
export interface RegisterResult {
  companyId: string
  managerId: string
  email: string
}

// Returned by the login action on success
export interface LoginResult {
  companyId: string
  managerId: string
  email: string
  fullName: string
}

// Shape of the user identity we store and read throughout the app.
// Derived from the Supabase session + entry_managers join.
export interface AppSession {
  authUserId: string
  companyId: string
  managerId: string
  email: string
  fullName: string
}
