import type { ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '../../utils/cn'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  title: ReactNode
  description?: ReactNode
  variant?: AlertVariant
  className?: string
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'border-[var(--inkblot-semantic-color-status-info)] bg-[var(--inkblot-semantic-color-status-info)]/10 text-[var(--inkblot-semantic-color-text-primary)]',
  success:
    'border-[var(--inkblot-semantic-color-status-success)] bg-[var(--inkblot-semantic-color-status-success)]/10 text-[var(--inkblot-semantic-color-text-primary)]',
  warning:
    'border-[var(--inkblot-semantic-color-status-warning)] bg-[var(--inkblot-semantic-color-status-warning)]/10 text-[var(--inkblot-semantic-color-text-primary)]',
  error:
    'border-[var(--inkblot-semantic-color-status-error)] bg-[var(--inkblot-semantic-color-status-error)]/10 text-[var(--inkblot-semantic-color-text-primary)]',
}

const iconMap: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

export function Alert({
  title,
  description,
  variant = 'info',
  className,
}: AlertProps) {
  const Icon = iconMap[variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex w-full items-start gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-lg)] border px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
        variantStyles[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex min-w-0 flex-col gap-[var(--inkblot-spacing-1)]">
        <div className="font-semibold">{title}</div>
        {description && (
          <div className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
