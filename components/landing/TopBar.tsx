import { Button } from '@/components/ui/Button'

export function TopBar(): React.ReactElement {
  return (
    <nav className="flex items-center justify-between bg-[#2B2B2B] px-[50px] py-[25px]">
      <span className="text-[24px] font-semibold text-white leading-[24px]">TDMS</span>
      <div className="flex items-center gap-8">
        <a href="/auth/register" className="text-[18px] text-white leading-[32px] hover:text-[#BFAFF2] transition-colors">
          Sign up
        </a>
        <Button href="/auth/login" variant="secondary" size="md">Log in</Button>
      </div>
    </nav>
  )
}
