import { useCallback, useEffect, useId, useRef, type RefObject } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AlertDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  confirmDisabled?: boolean
  closeOnConfirm?: boolean
  initialFocusRef?: RefObject<HTMLElement | null>
  onOpenChange?: (open: boolean) => void
  onConfirm?: () => void
  onCancel?: () => void
  className?: string
}

export function AlertDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  confirmDisabled = false,
  closeOnConfirm = true,
  initialFocusRef,
  onOpenChange,
  onConfirm,
  onCancel,
  className,
}: AlertDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()

  const closeDialog = useCallback(() => {
    onCancel?.()
    onOpenChange?.(false)
  }, [onCancel, onOpenChange])

  const confirmDialog = useCallback(() => {
    onConfirm?.()
    if (closeOnConfirm) {
      onOpenChange?.(false)
    }
  }, [closeOnConfirm, onConfirm, onOpenChange])

  useEffect(() => {
    if (!open) {
      return
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const target = initialFocusRef?.current
    ;(target ?? cancelButtonRef.current ?? dialogRef.current)?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDialog()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [closeDialog, initialFocusRef, open])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--inkblot-semantic-color-background-primary)]/70 px-[var(--inkblot-spacing-4)]"
      onClick={closeDialog}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          'w-full max-w-[520px] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-6)] text-[var(--inkblot-semantic-color-text-primary)] shadow-lg',
          className
        )}
      >
        <div className="mb-[var(--inkblot-spacing-4)] flex items-start gap-[var(--inkblot-spacing-3)]">
          <div
            className={cn(
              'mt-0.5 rounded-[var(--inkblot-radius-full)] p-[var(--inkblot-spacing-2)]',
              destructive
                ? 'bg-[var(--inkblot-semantic-color-status-error)]/15 text-[var(--inkblot-semantic-color-status-error)]'
                : 'bg-[var(--inkblot-semantic-color-status-warning)]/15 text-[var(--inkblot-semantic-color-status-warning)]'
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-[var(--inkblot-spacing-2)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]"
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-[var(--inkblot-spacing-2)]">
          <button
            type="button"
            ref={cancelButtonRef}
            onClick={closeDialog}
            className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] font-medium text-[var(--inkblot-semantic-color-text-primary)] transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={confirmDisabled}
            onClick={confirmDialog}
            className={cn(
              'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] font-medium text-[var(--inkblot-semantic-color-text-inverse)] transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
              destructive
                ? 'bg-[var(--inkblot-semantic-color-status-error)] hover:bg-[var(--inkblot-semantic-color-status-error)]/85 active:bg-[var(--inkblot-semantic-color-status-error)]/80'
                : 'bg-[var(--inkblot-semantic-color-interactive-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
