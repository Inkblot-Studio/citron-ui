import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'

export interface ModuleSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function ModuleSkeleton({ className, ...props }: ModuleSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-sm)]',
        className
      )}
      {...props}
    >
      <Skeleton className="h-8 w-3/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
