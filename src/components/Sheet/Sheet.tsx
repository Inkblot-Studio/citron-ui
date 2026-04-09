import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean
  onOpenChange?: (open: boolean) => void
  side?: SheetSide
  title?: ReactNode
  description?: ReactNode
  showCloseButton?: boolean
  overlayClassName?: string
}

const sideClasses: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b rounded-b-[var(--inkblot-radius-lg)]',
  right: 'inset-y-0 right-0 h-full w-full max-w-[420px] border-l',
  bottom: 'inset-x-0 bottom-0 border-t rounded-t-[var(--inkblot-radius-lg)]',
  left: 'inset-y-0 left-0 h-full w-full max-w-[420px] border-r',
}

export function Sheet({
  open,
  onOpenChange,
  side = 'right',
  title,
  description,
  showCloseButton = true,
  className,
  overlayClassName,
  children,
  ...props
}: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close panel"
        onClick={() => onOpenChange?.(false)}
        className={cn(
          'absolute inset-0 bg-[var(--inkblot-semantic-color-background-primary)]/70',
          overlayClassName
        )}
      />
      <section
        role="dialog"
        aria-modal="true"
        className={cn(
          'absolute bg-[var(--inkblot-semantic-color-background-secondary)] p-5 text-[var(--inkblot-semantic-color-text-primary)] shadow-lg border-[var(--inkblot-semantic-color-border-default)]',
          sideClasses[side],
          className
        )}
        {...props}
      >
        {(title || description || showCloseButton) && (
          <header className="mb-4 flex items-start justify-between gap-4">
            <div>
              {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
              {description ? (
                <p className="mt-1 text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
                  {description}
                </p>
              ) : null}
            </div>
            {showCloseButton ? (
              <button
                type="button"
                aria-label="Close"
                onClick={() => onOpenChange?.(false)}
                className="inline-flex size-9 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-text-secondary)] transition-colors hover:text-[var(--inkblot-semantic-color-text-primary)]"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </header>
        )}
        <div>{children}</div>
      </section>
    </div>
  )
}
