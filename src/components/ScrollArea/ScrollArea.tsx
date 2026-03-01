import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: string
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, maxHeight = 'var(--inkblot-size-touch-target-min)', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-auto rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-3)]',
          className
        )}
        style={{
          maxHeight,
          ...props.style,
        }}
        {...props}
      />
    )
  }
)

ScrollArea.displayName = 'ScrollArea'
