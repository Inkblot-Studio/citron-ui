import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  resize?: TextareaResize
}

const resizeClass: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, resize = 'vertical', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={error}
        className={cn(
          'min-h-[120px] w-full rounded-[var(--inkblot-radius-md)] border bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-3 text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] transition-[border-color,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
          resizeClass[resize],
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

Textarea.displayName = 'Textarea'
