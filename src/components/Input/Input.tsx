import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error}
        aria-disabled={disabled}
        className={cn(
          'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-md)] border bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-2 text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] transition-[border-color,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none disabled:cursor-not-allowed',
          error
            ? 'border-[var(--inkblot-semantic-color-status-error)] focus-visible:ring-[var(--inkblot-semantic-color-status-error)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
