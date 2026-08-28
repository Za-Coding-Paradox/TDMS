/**
 * Company Profile Page
 * Loads existing profile from DB, renders editable form.
 * Changes here do NOT update previously generated documents.
 */

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { CompanyProfileForm } from '@/components/company-profile/CompanyProfileForm'
import type { CompanyProfile } from '@/modules/company-profile/types'

export default async function CompanyProfilePage(): Promise<React.ReactElement> {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: manager } = await supabase
    .from('entry_managers')
    .select('company_id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) redirect('/auth/login')

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', manager.company_id)
    .single()

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
          }}
        >
          Company Profile
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          This information is auto-populated into every document you generate.
          Changes here do not update previously generated documents.
        </p>
      </div>

      <CompanyProfileForm profile={company as CompanyProfile} />
    </div>
  )
}
