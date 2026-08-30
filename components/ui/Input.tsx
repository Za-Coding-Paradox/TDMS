'use client'

interface InputProps {
  label?:       string
  id:           string
  type?:        string
  placeholder?: string
  value:        string
  onChange:     (v: string) => void
  error?:       string
  autoComplete?: string
  required?:    boolean
}

export function Input({
  label, id, type = 'text', placeholder, value, onChange,
  error, autoComplete, required = false,
}: InputProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-[14px] font-semibold text-white">
          {label}{required && <span className="ml-1 text-[#FF6250]">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="h-[50px] w-full rounded-[15px] bg-[#2B2B2B] px-[30px] text-[18px] text-white placeholder:text-white/40 border-2 border-white/10 outline-none transition-colors focus:border-[#BFAFF2]"
        style={{ borderColor: error ? '#FF6250' : undefined }}
      />
      {error && <p className="text-[13px] text-[#FF6250]">{error}</p>}
    </div>
  )
}
