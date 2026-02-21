import { cn } from '../../utils/cn'

export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info'

export interface StatusBadgeProps {
  label: string
  variant?: StatusBadgeVariant
  className?: string
}

const variantStyles: Record<StatusBadgeVariant, string> = {
  success:
    'border-[var(--inkblot-semantic-color-status-success)] bg-[var(--inkblot-semantic-color-status-success)]/10 text-[var(--inkblot-semantic-color-status-success)]',
  warning:
    'border-[var(--inkblot-semantic-color-status-warning)] bg-[var(--inkblot-semantic-color-status-warning)]/10 text-[var(--inkblot-semantic-color-status-warning)]',
  error:
    'border-[var(--inkblot-semantic-color-status-error)] bg-[var(--inkblot-semantic-color-status-error)]/10 text-[var(--inkblot-semantic-color-status-error)]',
  info:
    'border-[var(--inkblot-semantic-color-status-info)] bg-[var(--inkblot-semantic-color-status-info)]/10 text-[var(--inkblot-semantic-color-status-info)]',
}

export function StatusBadge({
  label,
  variant = 'info',
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--inkblot-radius-md)] border px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
