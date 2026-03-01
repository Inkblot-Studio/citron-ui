import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showValueLabel?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showValueLabel = false, ...props }, ref) => {
    const ratio = Math.max(0, Math.min(value / max, 1))
    const percent = `${Math.round(ratio * 100)}%`

    return (
      <div ref={ref} className={cn('grid gap-[var(--inkblot-spacing-2)]', className)} {...props}>
        <div className="h-[var(--inkblot-spacing-2)] overflow-hidden rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-background-secondary)]">
          <div
            className="h-full rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] transition-[width] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]"
            style={{ width: percent }}
          />
        </div>
        {showValueLabel ? (
          <p className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
            {percent}
          </p>
        ) : null}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
