export default function DashboardPage(): React.ReactElement {
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
          Overview
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Welcome to TDMS. Select a section from the sidebar to get started.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Projects',
            description: 'Manage your trade shipments and document pipelines.',
            href: '/dashboard/projects',
          },
          {
            title: 'Customers',
            description: 'Create and manage your buyer records.',
            href: '/dashboard/customers',
          },
          {
            title: 'Company Profile',
            description: 'Fill in your company details and bank information.',
            href: '/dashboard/company',
          },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="block rounded-lg border p-5 transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <h2
              className="mb-1 text-base font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {card.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {card.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
