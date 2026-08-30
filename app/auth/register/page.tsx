'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { Input }    from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'
import { register } from '@/modules/auth/actions/register'

interface FormState {
  fullName:        string
  companyName:     string
  email:           string
  password:        string
  confirmPassword: string
}

const EMPTY: FormState = { fullName: '', companyName: '', email: '', password: '', confirmPassword: '' }

export default function RegisterPage(): React.ReactElement {
  const router = useRouter()
  const [form, setForm]         = useState<FormState>(EMPTY)
  const [error, setError]       = useState<string | undefined>()
  const [isLoading, setLoading] = useState(false)

  function field(key: keyof FormState) {
    return (v: string) => { setForm((p) => ({ ...p, [key]: v })); setError(undefined) }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await register(form)
    if (!result.success) { setError(result.error); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <AuthCard title="Create your account" subtitle="No verification required. Get started instantly.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="rounded-[15px] bg-[#FF6250]/10 border border-[#FF6250]/30 px-5 py-3 text-[15px] text-[#FF6250]">
            {error}
          </div>
        )}

        <Input label="Your full name"  id="fullName"        value={form.fullName}        onChange={field('fullName')}        placeholder="Ahmed Khan"              autoComplete="name"         required />
        <Input label="Company name"    id="companyName"     value={form.companyName}     onChange={field('companyName')}     placeholder="Mascot International"    autoComplete="organization" required />
        <Input label="Email address"   id="email"           type="email"   value={form.email}           onChange={field('email')}           placeholder="you@company.com"         autoComplete="email"        required />
        <Input label="Password"        id="password"        type="password" value={form.password}        onChange={field('password')}        placeholder="At least 8 characters"  autoComplete="new-password" required />
        <Input label="Confirm password" id="confirmPassword" type="password" value={form.confirmPassword} onChange={field('confirmPassword')} placeholder="Repeat your password"    autoComplete="new-password" required />

        <Button type="submit" variant="primary" size="md" isLoading={isLoading} loadingText="Creating account…" className="w-full mt-2">
          Create account
        </Button>

        <p className="text-center text-[16px] text-white/40">
          Already registered?{' '}
          <Link href="/auth/login" className="text-[#BFAFF2] hover:text-[#ac99e8] transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
