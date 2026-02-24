import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between',
        'pb-[var(--inkblot-spacing-2)]',
        className
      )}
    >
      <div className="flex items-start gap-[var(--inkblot-spacing-3)]">
        {icon ? (
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)]',
              'bg-[var(--inkblot-semantic-color-background-secondary)]',
              '[color:var(--inkblot-semantic-color-status-warning)]'
            )}
          >
            {icon}
          </div>
        ) : null}
        <div className="min-w-0">
          <h1
            className={cn(
              'text-[var(--inkblot-semantic-color-text-primary)]',
              '[font:var(--inkblot-semantic-typography-heading-medium)]'
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={cn(
                'mt-0.5 text-[var(--inkblot-semantic-color-text-secondary)]',
                '[font:var(--inkblot-semantic-typography-body-small)]'
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {action ? (
        <div className="mt-[var(--inkblot-spacing-4)] shrink-0 sm:mt-0">{action}</div>
      ) : null}
    </header>
  )
}

export interface PageHeaderActionButtonProps {
  label: string
  onClick?: () => void
  icon?: ReactNode
  className?: string
}

export function PageHeaderActionButton({
  label,
  onClick,
  icon,
  className,
}: PageHeaderActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
        'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
        '[font:var(--inkblot-semantic-typography-body-medium)] font-semibold',
        'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
        'transition-colors duration-[var(--inkblot-duration-fast)]',
        className
      )}
    >
      {icon ?? <Plus className="h-4 w-4" />}
      {label}
    </button>
  )
}
