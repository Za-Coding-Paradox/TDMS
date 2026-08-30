import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#2B2B2B] flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-[50px] py-[25px]">
        <Link href="/" className="text-[24px] font-semibold text-white leading-[24px] hover:text-[#BFAFF2] transition-colors">
          TDMS
        </Link>
      </nav>

      {/* Centered form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  )
}
