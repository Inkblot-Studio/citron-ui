import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export interface OSNavigationRailItem {
  id: string
  icon: ReactNode
  label?: string
  active?: boolean
}

export interface OSNavigationRailProps {
  items: OSNavigationRailItem[]
  className?: string
}

export function OSNavigationRail({ items, className }: OSNavigationRailProps) {
  return (
    <ModuleErrorBoundary className={className}>
      <nav
        className={cn(
          'flex w-14 flex-col items-center gap-1 border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] py-4'
        )}
        aria-label="Navigation"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'relative flex w-full flex-col items-center gap-1 rounded-[var(--inkblot-radius-md)] px-2 py-2 transition-colors hover:text-[var(--inkblot-semantic-color-text-secondary)]',
              item.active
                ? 'text-[var(--inkblot-semantic-color-interactive-primary)]'
                : 'text-[var(--inkblot-semantic-color-text-tertiary)]'
            )}
          >
            {item.active ? (
              <span
                className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-[var(--inkblot-semantic-color-interactive-primary)]"
                aria-hidden
              />
            ) : null}
            <div className="flex h-8 w-8 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
              {item.icon}
            </div>
            {item.label ? (
              <span className="text-[10px] font-medium">{item.label}</span>
            ) : null}
          </div>
        ))}
      </nav>
    </ModuleErrorBoundary>
  )
}
