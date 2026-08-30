'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { Input }    from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'
import { login }    from '@/modules/auth/actions/login'

function LoginForm(): React.ReactElement {
  const router      = useRouter()
  const params      = useSearchParams()
  const redirectTo  = params.get('redirectTo') ?? '/dashboard'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | undefined>()
  const [isLoading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await login({ email, password })
    if (!result.success) { setError(result.error); setLoading(false); return }
    router.push(redirectTo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="rounded-[15px] bg-[#FF6250]/10 border border-[#FF6250]/30 px-5 py-3 text-[15px] text-[#FF6250]">
          {error}
        </div>
      )}

      <Input label="Email address" id="email"    type="email"    value={email}    onChange={setEmail}    placeholder="you@company.com"  autoComplete="email"            required />
      <Input label="Password"      id="password" type="password" value={password} onChange={setPassword} placeholder="Your password"     autoComplete="current-password" required />

      <div className="flex justify-end">
        <Link href="/auth/reset-password" className="text-[14px] text-white/40 hover:text-[#BFAFF2] transition-colors">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="primary" size="md" isLoading={isLoading} loadingText="Signing in…" className="w-full">
        Sign in
      </Button>

      <p className="text-center text-[16px] text-white/40">
        No account yet?{' '}
        <Link href="/auth/register" className="text-[#BFAFF2] hover:text-[#ac99e8] transition-colors">
          Register your company
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage(): React.ReactElement {
  return (
    <AuthCard title="Sign in" subtitle="Welcome back. Enter your credentials to continue.">
      <Suspense fallback={<div className="text-white/40 text-[16px]">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}
