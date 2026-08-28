'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/ui/AuthCard'
import { FormField } from '@/components/ui/FormField'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { updatePassword } from '@/modules/auth/actions/reset-password'

interface FormState {
  password: string
  confirmPassword: string
}

export default function ResetPasswordConfirmPage(): React.ReactElement {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({ password: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

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

    const result = await updatePassword(form)

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    // Password updated — send to login with a clean session
    router.push('/login')
  }

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Your new password must be at least 8 characters."
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
          label="New password"
          id="password"
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={setField('password')}
          autoComplete="new-password"
          required
        />

        <FormField
          label="Confirm new password"
          id="confirmPassword"
          type="password"
          placeholder="Repeat your new password"
          value={form.confirmPassword}
          onChange={setField('confirmPassword')}
          autoComplete="new-password"
          required
        />

        <SubmitButton
          label="Update password"
          loadingLabel="Updating..."
          isLoading={isLoading}
        />
      </form>
    </AuthCard>
  )
}
