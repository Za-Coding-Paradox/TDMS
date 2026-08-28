'use client'

interface FormFieldProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
  required?: boolean
}

export function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  required = false,
}: FormFieldProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: 'var(--color-error)' }}>*</span>
        )}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-md border px-3.5 py-2.5 text-sm transition-colors"
        style={{
          borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
          backgroundColor: error ? 'var(--color-error-light)' : 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error
            ? 'var(--color-error)'
            : 'var(--color-border-focus)'
          e.target.style.backgroundColor = error
            ? 'var(--color-error-light)'
            : 'var(--color-action-light)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error
            ? 'var(--color-error)'
            : 'var(--color-border)'
          e.target.style.backgroundColor = error
            ? 'var(--color-error-light)'
            : 'var(--color-surface)'
        }}
      />

      {error && (
        <p className="text-xs" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
