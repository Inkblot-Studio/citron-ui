import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface StatCardGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function StatCardGrid({
  children,
  columns = 4,
  className,
}: StatCardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      className={cn(
        'grid gap-[var(--inkblot-spacing-4)]',
        gridCols[columns],
        className
      )}
    >
      {children}
    </div>
  )
}
