import { AlertTriangle, CheckCircle2, CircleX, Info, X } from 'lucide-react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastAction extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  variant?: ToastVariant
  action?: ToastAction
  onClose?: () => void
}

const variantStyles: Record<ToastVariant, string> = {
  info: 'border-[var(--inkblot-semantic-color-status-info)]',
  success: 'border-[var(--inkblot-semantic-color-status-success)]',
  warning: 'border-[var(--inkblot-semantic-color-status-warning)]',
  error: 'border-[var(--inkblot-semantic-color-status-error)]',
}

const variantIcon: Record<ToastVariant, ReactNode> = {
  info: <Info className="size-4" />,
  success: <CheckCircle2 className="size-4" />,
  warning: <AlertTriangle className="size-4" />,
  error: <CircleX className="size-4" />,
}

export function Toast({
  title,
  description,
  variant = 'info',
  action,
  onClose,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        'w-full rounded-[var(--inkblot-radius-lg)] border-l-4 border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3 text-[var(--inkblot-semantic-color-text-primary)] shadow-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-[var(--inkblot-semantic-color-text-secondary)]">{variantIcon[variant]}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description ? (
            <p className="mt-1 text-sm text-[var(--inkblot-semantic-color-text-secondary)]">{description}</p>
          ) : null}
          {action ? (
            <button
              type="button"
              {...action}
              className={cn(
                'mt-2 rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-2 py-1 text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
                action.className
              )}
            >
              {action.label}
            </button>
          ) : null}
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label="Cerrar notificación"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-[var(--inkblot-radius-md)] text-[var(--inkblot-semantic-color-text-tertiary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
    </div>
  )
}
