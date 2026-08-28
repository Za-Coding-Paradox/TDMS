interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps): React.ReactElement {
  return (
    <div
      className="rounded-xl border px-8 py-10 shadow-sm"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-1.5 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
