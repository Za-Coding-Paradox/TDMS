import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size    = 'sm' | 'md'

interface BaseProps {
  variant?:   Variant
  size?:      Size
  disabled?:  boolean
  className?: string
  children:   React.ReactNode
}
interface AsButton extends BaseProps {
  href?:        undefined
  type?:        'button' | 'submit'
  onClick?:     () => void
  isLoading?:   boolean
  loadingText?: string
}
interface AsLink extends BaseProps {
  href:         string
  type?:        undefined
  onClick?:     undefined
  isLoading?:   undefined
  loadingText?: undefined
}
type ButtonProps = AsButton | AsLink

const VARIANT: Record<Variant, string> = {
  primary:   'bg-[#F8D57E] text-[#333] hover:bg-[#f5cc60]',
  secondary: 'bg-[#BFAFF2] text-[#333] hover:bg-[#ac99e8]',
  ghost:     'bg-transparent text-white hover:text-[#BFAFF2]',
}
const SIZE: Record<Size, string> = {
  sm: 'h-[38px] px-5 text-[14px]',
  md: 'h-[50px] px-7 text-[18px]',
}

export function Button(props: ButtonProps): React.ReactElement {
  const { variant = 'primary', size = 'md', disabled = false, className = '', children } = props
  const base = 'inline-flex items-center justify-center font-normal rounded-[15px] transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
  const cls  = `${base} ${VARIANT[variant]} ${SIZE[size]} ${className}`
  if (props.href !== undefined) {
    return <Link href={props.href} className={cls}>{children}</Link>
  }
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={disabled || !!props.isLoading}
      className={cls}
    >
      {props.isLoading ? (props.loadingText ?? 'Please wait…') : children}
    </button>
  )
}
