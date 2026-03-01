import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  disabled?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
  secondary:
    'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-primary)]',
  success:
    'bg-[var(--inkblot-semantic-color-status-success)]/15 text-[var(--inkblot-semantic-color-status-success)]',
  warning:
    'bg-[var(--inkblot-semantic-color-status-warning)]/15 text-[var(--inkblot-semantic-color-status-warning)]',
  error:
    'bg-[var(--inkblot-semantic-color-status-error)]/15 text-[var(--inkblot-semantic-color-status-error)]',
  outline:
    'border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
}

export function Badge({
  children,
  variant = 'default',
  disabled = false,
  className,
}: BadgeProps) {
  return (
    <span
      aria-disabled={disabled}
      className={cn(
        'inline-flex min-h-[calc(var(--inkblot-size-touch-target-min)-1rem)] items-center justify-center rounded-[var(--inkblot-radius-full)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)] text-xs font-semibold transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
        variantStyles[variant],
        disabled && 'opacity-[var(--inkblot-opacity-disabled)]',
        className
      )}
    >
      {children}
    </span>
  )
}
