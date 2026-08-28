interface TopBarProps {
  managerName: string
  companyName: string
}

export function TopBar({ managerName, companyName }: TopBarProps): React.ReactElement {
  return (
    <header
      className="flex items-center justify-between px-6 py-3 flex-shrink-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            {managerName}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {companyName}
          </p>
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: '#1a2332', color: '#C9A84C' }}
        >
          {managerName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
