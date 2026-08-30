interface AuthCardProps {
  title:     string
  subtitle?: string
  children:  React.ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps): React.ReactElement {
  return (
    <div className="bg-[#333] rounded-[20px] px-[50px] py-[60px] w-full max-w-[500px]">
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-white leading-[32px]">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-[16px] text-white/40 leading-[28px]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}
