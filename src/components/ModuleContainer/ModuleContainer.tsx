import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'
import { ModuleSkeleton } from '../Skeleton'

export interface ModuleContainerProps {
  children: ReactNode
  loading?: boolean
  title?: string
  className?: string
  onRetry?: () => void
}

export function ModuleContainer({
  children,
  loading = false,
  title,
  className,
  onRetry,
}: ModuleContainerProps) {
  return (
    <ModuleErrorBoundary className={className} onRetry={onRetry}>
      {loading ? (
        <div className={cn('flex flex-col gap-4', className)}>
          {title ? (
            <h2 className="text-lg font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              {title}
            </h2>
          ) : null}
          <ModuleSkeleton />
        </div>
      ) : (
        <div className={cn('flex flex-col gap-4', className)}>
          {title ? (
            <h2 className="text-lg font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              {title}
            </h2>
          ) : null}
          {children}
        </div>
      )}
    </ModuleErrorBoundary>
  )
}
