import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CollapsibleProps {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  disabled?: boolean
  className?: string
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  className,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        'w-full rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]',
        disabled && 'opacity-[var(--inkblot-opacity-disabled)]',
        className
      )}
    >
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center justify-between gap-[var(--inkblot-spacing-3)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)] text-left text-[var(--inkblot-semantic-color-text-primary)]',
          !disabled &&
            'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-[-2px]'
        )}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)] transition-transform duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="border-t border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-4)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
          {children}
        </div>
      )}
    </div>
  )
}
