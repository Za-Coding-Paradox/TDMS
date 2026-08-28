'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthCard } from '@/components/ui/AuthCard'
import { FormField } from '@/components/ui/FormField'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { login } from '@/modules/auth/actions/login'

interface FormState {
  email: string
  password: string
}

// Separated into its own component because useSearchParams() must be
// inside a Suspense boundary — Next.js requirement for static builds.
function LoginForm(): React.ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'

  const [form, setForm] = useState<FormState>({ email: '', password: '' })
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  function setField(field: keyof FormState) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setError(undefined)
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const result = await login(form)

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    router.push(redirectTo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div
          className="rounded-md px-4 py-3 text-sm"
          style={{
            backgroundColor: 'var(--color-error-light)',
            color: 'var(--color-error)',
          }}
        >
          {error}
        </div>
      )}

      <FormField
        label="Email address"
        id="email"
        type="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={setField('email')}
        autoComplete="email"
        required
      />

      <FormField
        label="Password"
        id="password"
        type="password"
        placeholder="Your password"
        value={form.password}
        onChange={setField('password')}
        autoComplete="current-password"
        required
      />

      <div className="flex justify-end">
        <Link
          href="/auth/reset-password"
          className="text-xs transition-colors"
          style={{ color: 'var(--color-action)' }}
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        label="Sign in"
        loadingLabel="Signing in..."
        isLoading={isLoading}
      />

      <p
        className="text-center text-sm"
        style={{ color: 'var(--color-text-muted)' }}
      >
        No account yet?{' '}
        <Link
          href="/auth/register"
          className="font-medium transition-colors"
          style={{ color: 'var(--color-action)' }}
        >
          Register your company
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage(): React.ReactElement {
  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back. Enter your credentials to continue."
    >
      <Suspense fallback={<div style={{ color: 'var(--color-text-muted)' }} className="text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}
