import Link from 'next/link'

export default function LandingPage(): React.ReactElement {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <nav
        className="border-b px-6 py-4"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span
            className="text-lg font-semibold"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            TDMS
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-md px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: 'var(--color-action)',
                color: 'var(--color-action-text)',
              }}
            >
              Register company
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-4 text-xs font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-action)' }}
        >
          For Pakistani Textile Exporters
        </p>

        <h1
          className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
          }}
        >
          Every document.
          <br />
          Every shipment.
          <br />
          <span style={{ color: 'var(--color-action)' }}>Nothing missed.</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          TDMS automates the complete documentation pipeline — from Sales
          Contract to bank submission package. One entry point. Every document
          generated, verified, and print-ready.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/auth/register"
            className="rounded-md px-8 py-3 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--color-action)',
              color: 'var(--color-action-text)',
            }}
          >
            Register your company — it&apos;s free
          </Link>
          <Link
            href="/auth/login"
            className="text-sm transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Already registered? Sign in →
          </Link>
        </div>
      </main>

      <footer
        className="border-t px-6 py-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            TDMS
          </span>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Trade Documentation Management System
          </p>
        </div>
      </footer>
    </div>
  )
}
