import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-[var(--inkblot-radius-md)] bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--inkblot-semantic-color-background-secondary)_0%,var(--inkblot-semantic-color-background-tertiary)_50%,var(--inkblot-semantic-color-background-secondary)_100%)]',
        className
      )}
      {...props}
    />
  )
}
