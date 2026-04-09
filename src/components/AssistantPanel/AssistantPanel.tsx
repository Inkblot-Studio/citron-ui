import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { GlobalAssistantChat, type GlobalAssistantChatProps } from '../GlobalAssistantChat'

export interface AssistantPanelProps extends Omit<GlobalAssistantChatProps, 'className'> {
  open: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  subtitle?: string
  className?: string
}

/**
 * Inline assistant panel that pushes layout content to the left on desktop.
 * On screens < 768px it falls back to a fixed overlay.
 *
 * Must be placed as a direct flex child alongside the main content area
 * (e.g. inside AppLayout's <main> or a custom flex wrapper).
 */
export function AssistantPanel({
  open,
  onOpenChange,
  title = 'Assistant',
  subtitle,
  className,
  ...chatProps
}: AssistantPanelProps) {
  const close = useCallback(() => onOpenChange?.(false), [onOpenChange])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, close])

  const header = (
    <div className="flex items-center justify-between border-b border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
          {title}
        </p>
        {subtitle && (
          <p className="truncate text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            {subtitle}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={close}
        className="ml-[var(--inkblot-spacing-2)] flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-text-secondary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )

  return (
    <>
      {/* ── Desktop: inline push panel ─────────────────────────────── */}
      <aside
        role="complementary"
        aria-label={title}
        className={cn(
          'hidden md:flex',
          'shrink-0 flex-col overflow-hidden border-l border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)]',
          'transition-[width] duration-300 ease-[var(--inkblot-easing-default)]',
          open ? 'w-96' : 'w-0 border-l-0',
          className,
        )}
      >
        {open && (
          <>
            {header}
            <GlobalAssistantChat {...chatProps} className="min-h-0 flex-1" />
          </>
        )}
      </aside>

      {/* ── Mobile / Tablet: overlay fallback ──────────────────────── */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <button
          type="button"
          aria-label="Close panel"
          onClick={close}
          className={cn(
            'absolute inset-0 bg-[var(--inkblot-semantic-color-background-primary)]/70 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-lg)] transition-transform duration-300 ease-[var(--inkblot-easing-default)]',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {header}
          <GlobalAssistantChat {...chatProps} className="min-h-0 flex-1" />
        </div>
      </div>
    </>
  )
}
