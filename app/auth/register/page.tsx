'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/ui/AuthCard'
import { FormField } from '@/components/ui/FormField'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { register } from '@/modules/auth/actions/register'

interface FormState {
  fullName: string
  companyName: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  fullName?: string
  companyName?: string
  email?: string
  password?: string
  confirmPassword?: string
  form?: string
}

const EMPTY_FORM: FormState = {
  fullName: '',
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage(): React.ReactElement {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  function setField(field: keyof FormState) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const result = await register(form)

    if (!result.success) {
      setErrors({ form: result.error })
      setIsLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <AuthCard
      title="Register your company"
      subtitle="One account per company. No verification required."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {errors.form && (
          <div
            className="rounded-md px-4 py-3 text-sm"
            style={{
              backgroundColor: 'var(--color-error-light)',
              color: 'var(--color-error)',
            }}
          >
            {errors.form}
          </div>
        )}

        <FormField
          label="Your full name"
          id="fullName"
          placeholder="Ahmed Khan"
          value={form.fullName}
          onChange={setField('fullName')}
          error={errors.fullName}
          autoComplete="name"
          required
        />

        <FormField
          label="Company name"
          id="companyName"
          placeholder="Mascot International"
          value={form.companyName}
          onChange={setField('companyName')}
          error={errors.companyName}
          autoComplete="organization"
          required
        />

        <FormField
          label="Email address"
          id="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={setField('email')}
          error={errors.email}
          autoComplete="email"
          required
        />

        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={setField('password')}
          error={errors.password}
          autoComplete="new-password"
          required
        />

        <FormField
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={setField('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />

        <SubmitButton
          label="Create account"
          loadingLabel="Creating account..."
          isLoading={isLoading}
        />

        <p
          className="text-center text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Already registered?{' '}
          <Link
            href="/auth/login"
            className="font-medium transition-colors"
            style={{ color: 'var(--color-action)' }}
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
