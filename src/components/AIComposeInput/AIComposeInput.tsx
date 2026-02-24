import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AIComposeInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string
  loading?: boolean
  onWriteWithAI?: () => void | Promise<void>
  className?: string
}

export const AIComposeInput = forwardRef<HTMLTextAreaElement, AIComposeInputProps>(
  ({ label, loading = false, onWriteWithAI, disabled, className, ...props }, ref) => {
    const isDisabled = disabled || loading

    return (
      <div className={cn('flex flex-col gap-[var(--inkblot-spacing-2)]', className)}>
        <div className="flex items-center justify-between">
          {label ? (
            <label
              htmlFor={props.id}
              className={cn(
                'uppercase tracking-wider',
                '[font:var(--inkblot-semantic-typography-body-small)]',
                'text-[var(--inkblot-semantic-color-text-primary)]'
              )}
            >
              {label}
            </label>
          ) : (
            <span />
          )}
          {onWriteWithAI ? (
            <button
              type="button"
              onClick={onWriteWithAI}
              disabled={loading}
              className={cn(
                'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)]',
                'border border-[var(--inkblot-semantic-color-border-default)]',
                'bg-[var(--inkblot-semantic-color-interactive-secondary)]',
                'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
                '[font:var(--inkblot-semantic-typography-body-medium)] font-medium',
                'text-[var(--inkblot-semantic-color-text-primary)]',
                'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]',
                'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:cursor-not-allowed disabled:pointer-events-none'
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <Sparkles
                  className="h-4 w-4 shrink-0"
                  style={{ color: 'var(--inkblot-semantic-color-status-warning)' }}
                />
              )}
              {loading ? 'Generating...' : 'Write with AI'}
            </button>
          ) : null}
        </div>
        <div className="relative">
          <textarea
            ref={ref}
            disabled={isDisabled}
            className={cn(
              'min-h-[12rem] w-full rounded-[var(--inkblot-radius-lg)]',
              'border border-[var(--inkblot-semantic-color-border-default)]',
              'bg-[var(--inkblot-semantic-color-background-secondary)]',
              'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
              '[font:var(--inkblot-semantic-typography-body-medium)]',
              'text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
              'transition-colors duration-[var(--inkblot-duration-fast)]',
              'hover:border-[var(--inkblot-semantic-color-border-strong)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
              'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:cursor-not-allowed disabled:pointer-events-none'
            )}
            {...props}
          />
        </div>
      </div>
    )
  }
)

AIComposeInput.displayName = 'AIComposeInput'
