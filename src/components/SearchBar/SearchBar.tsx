import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
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
        ) : null}
        <div
          className={cn(
            'flex items-center gap-2 rounded-[var(--inkblot-radius-full)]',
            'bg-[var(--inkblot-semantic-color-background-secondary)]',
            'border transition-colors duration-[var(--inkblot-duration-fast)]',
            'focus-within:ring-2 focus-within:ring-[var(--inkblot-semantic-color-border-focus)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
            error
              ? 'border-[var(--inkblot-semantic-color-status-error)]'
              : 'border-[var(--inkblot-semantic-color-border-default)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
            disabled && 'opacity-[var(--inkblot-opacity-disabled)] pointer-events-none cursor-not-allowed'
          )}
        >
          <Search
            className={cn(
              'ml-[var(--inkblot-spacing-4)] h-4 w-4 shrink-0',
              'text-[var(--inkblot-semantic-color-text-tertiary)]'
            )}
          />
          <input
            ref={ref}
            type="search"
            disabled={disabled}
            aria-invalid={error}
            aria-label={label ?? 'Search'}
            className={cn(
              'min-h-[var(--inkblot-size-touch-target-min)] w-full flex-1 bg-transparent px-2 py-[var(--inkblot-spacing-2)] pr-[var(--inkblot-spacing-4)]',
              '[font:var(--inkblot-semantic-typography-body-medium)]',
              'text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
              'focus:outline-none',
              'disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
        </div>
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
