import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={error}
          className={cn(
            'min-h-[var(--inkblot-size-touch-target-min)] w-full appearance-none rounded-[var(--inkblot-radius-md)] border bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-2 pr-10 text-[var(--inkblot-semantic-color-text-primary)] transition-[border-color,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
            error
              ? 'border-[var(--inkblot-semantic-color-status-error)] focus-visible:ring-[var(--inkblot-semantic-color-status-error)]'
              : 'border-[var(--inkblot-semantic-color-border-default)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
            className
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--inkblot-semantic-color-text-tertiary)]"
        />
      </div>
    )
  }
)

Select.displayName = 'Select'
