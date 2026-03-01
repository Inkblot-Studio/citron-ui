import { useState } from 'react'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  error?: boolean
  className?: string
}

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  error = false,
  className,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const value = isControlled ? checked : internalChecked

  const setValue = (next: boolean) => {
    if (!isControlled) {
      setInternalChecked(next)
    }
    onCheckedChange?.(next)
  }

  return (
    <label
      className={cn(
        'inline-flex items-start gap-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-primary)]',
        disabled && 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]',
        className
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={value}
        disabled={disabled}
        onClick={() => setValue(!value)}
        className={cn(
          'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] border transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2',
          value
            ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
          error && !value && 'border-[var(--inkblot-semantic-color-status-error)]'
        )}
      >
        {value && <Check className="h-4 w-4" />}
      </button>
      {(label || description) && (
        <span className="flex flex-col gap-[var(--inkblot-spacing-1)]">
          {label && <span className="text-sm font-medium">{label}</span>}
          {description && (
            <span
              className={cn(
                'text-xs text-[var(--inkblot-semantic-color-text-secondary)]',
                error && !value && 'text-[var(--inkblot-semantic-color-status-error)]'
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}
