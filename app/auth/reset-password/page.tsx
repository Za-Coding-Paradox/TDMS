'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/ui/AuthCard'
import { FormField } from '@/components/ui/FormField'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { requestPasswordReset } from '@/modules/auth/actions/reset-password'

export default function ResetPasswordPage(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const result = await requestPasswordReset({ email })

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setSubmitted(true)
    setIsLoading(false)
  }

  if (submitted) {
    return (
      <AuthCard title="Check your email">
        <div className="flex flex-col gap-6">
          <div
            className="rounded-md px-4 py-4 text-sm leading-relaxed"
            style={{
              backgroundColor: 'var(--color-success-light)',
              color: 'var(--color-success)',
            }}
          >
            If <strong>{email}</strong> is registered, you will receive a
            password reset link within a few minutes. Check your inbox and
            spam folder.
          </div>
          <Link
            href="/auth/login"
            className="text-center text-sm font-medium transition-colors"
            style={{ color: 'var(--color-action)' }}
          >
            ← Back to sign in
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we will send you a reset link."
    >
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
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />

        <SubmitButton
          label="Send reset link"
          loadingLabel="Sending..."
          isLoading={isLoading}
        />

        <Link
          href="/auth/login"
          className="text-center text-sm transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ← Back to sign in
        </Link>
      </form>
    </AuthCard>
  )
}
