import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.ReactElement> {
  // Validate session server-side on every dashboard page load.
  // proxy.ts handles the redirect for unauthenticated users but this
  // is a second enforcement layer inside the layout itself.
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Fetch the entry manager record for display in sidebar and top bar
  const { data: manager } = await supabase
    .from('entry_managers')
    .select('full_name, email, company_id')
    .eq('auth_user_id', user.id)
    .single()

  if (!manager) redirect('/auth/login')

  // Fetch company name for the sidebar header
  const { data: company } = await supabase
    .from('companies')
    .select('name, logo_storage_path')
    .eq('id', manager.company_id)
    .single()

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar companyName={company?.name ?? 'Your Company'} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          managerName={manager.full_name}
          companyName={company?.name ?? 'Your Company'}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
