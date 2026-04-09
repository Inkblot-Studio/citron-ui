import { useEffect, useRef } from 'react'
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

export function AssistantPanel({
  open,
  onOpenChange,
  title = 'Assistant',
  subtitle,
  className,
  ...chatProps
}: AssistantPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange?.(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onOpenChange])

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: open ? 'auto' : 'none' }}>
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close panel"
        onClick={() => onOpenChange?.(false)}
        className={cn(
          'absolute inset-0 bg-[var(--inkblot-semantic-color-background-primary)]/70 transition-opacity duration-[var(--inkblot-duration-normal)]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-lg)] transition-transform duration-[var(--inkblot-duration-normal)] ease-[var(--inkblot-easing-default)]',
          open ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
      >
        {/* header */}
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
            onClick={() => onOpenChange?.(false)}
            className="ml-[var(--inkblot-spacing-2)] flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-text-secondary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* chat fills rest */}
        <GlobalAssistantChat {...chatProps} className="min-h-0 flex-1" />
      </div>
    </div>
  )
}
