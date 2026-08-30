'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard }        from '@/components/auth/AuthCard'
import { Input }           from '@/components/ui/Input'
import { Button }          from '@/components/ui/Button'
import { updatePassword }  from '@/modules/auth/actions/reset-password'

export default function ResetPasswordConfirmPage(): React.ReactElement {
  const router = useRouter()
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setLoading]               = useState(false)
  const [error, setError]                     = useState<string | undefined>()

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await updatePassword({ password, confirmPassword })
    if (!result.success) { setError(result.error); setLoading(false); return }
    router.push('/auth/login')
  }

  return (
    <AuthCard title="Set a new password" subtitle="Your new password must be at least 8 characters.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="rounded-[15px] bg-[#FF6250]/10 border border-[#FF6250]/30 px-5 py-3 text-[15px] text-[#FF6250]">
            {error}
          </div>
        )}

        <Input label="New password"      id="password"        type="password" value={password}        onChange={setPassword}        placeholder="At least 8 characters" autoComplete="new-password" required />
        <Input label="Confirm password"  id="confirmPassword" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat your password"    autoComplete="new-password" required />

        <Button type="submit" variant="primary" size="md" isLoading={isLoading} loadingText="Updating…" className="w-full">
          Update password
        </Button>
      </form>
    </AuthCard>
  )
}
