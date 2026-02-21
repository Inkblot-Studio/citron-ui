import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export type MetricComparisonVariant = 'default' | 'success' | 'warning' | 'error'

export interface MetricComparisonItem {
  label: string
  value?: string | number
  variant?: MetricComparisonVariant
}

export interface MetricComparisonListProps {
  items: MetricComparisonItem[]
  className?: string
}

const variantColors: Record<MetricComparisonVariant, string> = {
  default: 'text-[var(--inkblot-semantic-color-text-primary)]',
  success: 'text-[var(--inkblot-semantic-color-status-success)]',
  warning: 'text-[var(--inkblot-semantic-color-status-warning)]',
  error: 'text-[var(--inkblot-semantic-color-status-error)]',
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn('h-4 w-4', className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M6 4l4 4-4 4V4z"
      />
    </svg>
  )
}

export function MetricComparisonList({ items, className }: MetricComparisonListProps) {
  return (
    <ModuleErrorBoundary className={className}>
      <ul
        className={cn(
          'flex flex-col gap-4 py-2'
        )}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
              {item.label}
            </span>
            <span
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                variantColors[item.variant ?? 'default']
              )}
            >
              {item.value != null ? (
                item.value
              ) : (
                <ChevronIcon />
              )}
            </span>
          </li>
        ))}
      </ul>
    </ModuleErrorBoundary>
  )
}
