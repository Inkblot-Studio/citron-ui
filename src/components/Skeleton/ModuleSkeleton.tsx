import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'

export interface ModuleSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function ModuleSkeleton({ className, ...props }: ModuleSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4',
        className
      )}
      {...props}
    >
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
