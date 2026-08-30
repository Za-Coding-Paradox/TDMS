'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthCard }              from '@/components/auth/AuthCard'
import { Input }                 from '@/components/ui/Input'
import { Button }                from '@/components/ui/Button'
import { requestPasswordReset }  from '@/modules/auth/actions/reset-password'

export default function ResetPasswordPage(): React.ReactElement {
  const [email, setEmail]       = useState('')
  const [isLoading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState<string | undefined>()

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await requestPasswordReset({ email })
    if (!result.success) { setError(result.error); setLoading(false); return }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <AuthCard title="Check your email">
        <div className="flex flex-col gap-6">
          <div className="rounded-[15px] bg-[#009379]/10 border border-[#009379]/30 px-5 py-4 text-[15px] text-[#009379] leading-[26px]">
            If <strong>{email}</strong> is registered, you will receive a reset link
            within a few minutes. Check your inbox and spam folder.
          </div>
          <Link href="/auth/login" className="text-center text-[16px] text-[#BFAFF2] hover:text-[#ac99e8] transition-colors">
            ← Back to sign in
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Reset your password" subtitle="Enter your email and we will send you a reset link.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="rounded-[15px] bg-[#FF6250]/10 border border-[#FF6250]/30 px-5 py-3 text-[15px] text-[#FF6250]">
            {error}
          </div>
        )}

        <Input label="Email address" id="email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" autoComplete="email" required />

        <Button type="submit" variant="primary" size="md" isLoading={isLoading} loadingText="Sending…" className="w-full">
          Send reset link
        </Button>

        <Link href="/auth/login" className="text-center text-[16px] text-white/40 hover:text-[#BFAFF2] transition-colors">
          ← Back to sign in
        </Link>
      </form>
    </AuthCard>
  )
}
