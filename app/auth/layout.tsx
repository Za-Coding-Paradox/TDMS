import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Top bar */}
      <div
        className="border-b px-6 py-4"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              TDMS
            </span>
            <span
              className="hidden text-xs sm:block"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Trade Documentation Management System
            </span>
          </Link>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Pakistan Textile Exports
          </span>
        </div>
      </div>

      {/* Page content */}
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
