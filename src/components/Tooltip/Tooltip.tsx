import { useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode
  side?: TooltipSide
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children: ReactNode
}

const sideClass: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
}

export function Tooltip({
  content,
  side = 'top',
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  children,
  ...props
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => !disabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => !disabled && setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      {children}
      {isOpen && !disabled ? (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-3 py-2 text-xs text-[var(--inkblot-semantic-color-text-primary)] shadow-sm',
            sideClass[side]
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
