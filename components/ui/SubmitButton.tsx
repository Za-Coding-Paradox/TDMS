'use client'

interface SubmitButtonProps {
  label: string
  loadingLabel?: string
  isLoading: boolean
}

export function SubmitButton({
  label,
  loadingLabel = 'Please wait...',
  isLoading,
}: SubmitButtonProps): React.ReactElement {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      style={{
        backgroundColor: isLoading ? 'var(--color-border-strong)' : 'var(--color-action)',
        color: 'var(--color-action-text)',
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          (e.target as HTMLButtonElement).style.backgroundColor =
            'var(--color-action-hover)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          (e.target as HTMLButtonElement).style.backgroundColor =
            'var(--color-action)'
        }
      }}
    >
      {isLoading ? loadingLabel : label}
    </button>
  )
}
