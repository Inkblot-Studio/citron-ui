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
          'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-lg)] border bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-medium)] text-[var(--inkblot-semantic-color-text-primary)] shadow-[var(--inkblot-shadow-xs)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] transition-[background,border-color,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--inkblot-semantic-color-background-primary)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
          error
            ? 'border-[var(--inkblot-semantic-color-status-error)] focus-visible:ring-[var(--inkblot-semantic-color-status-error)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] hover:border-[var(--inkblot-semantic-color-border-strong)] hover:bg-[var(--inkblot-semantic-color-background-primary)]',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
