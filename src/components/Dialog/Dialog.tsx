import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  RefObject,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DialogContextValue {
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within Dialog')
  }
  return context
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const value = useMemo<DialogContextValue>(
    () => ({
      open: currentOpen,
      setOpen,
    }),
    [currentOpen, setOpen]
  )

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

export type DialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, type = 'button', onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext()

    return (
      <button
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            setOpen(true)
          }
        }}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
          'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2',
          'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none disabled:cursor-not-allowed',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          className
        )}
        {...props}
      />
    )
  }
)

DialogTrigger.displayName = 'DialogTrigger'

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean
  initialFocusRef?: RefObject<HTMLElement | null>
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, showCloseButton = true, initialFocusRef, ...props }, ref) => {
    const { open, setOpen } = useDialogContext()
    const titleId = useId()
    const descriptionId = useId()
    const contentRef = useRef<HTMLDivElement | null>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node
        if (typeof ref === 'function') {
          ref(node)
          return
        }
        if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    const closeDialog = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    useEffect(() => {
      if (!open) {
        return
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeDialog()
        }
      }

      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }, [closeDialog, open])

    useEffect(() => {
      if (!open) {
        return
      }
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      const target = initialFocusRef?.current
      const focusable = contentRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      ;(target ?? focusable ?? contentRef.current)?.focus()

      return () => {
        previousFocusRef.current?.focus()
      }
    }, [initialFocusRef, open])

    if (!open || typeof document === 'undefined') {
      return null
    }

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-[var(--inkblot-spacing-6)]'
        )}
      >
        <button
          type="button"
          aria-label="Close dialog"
          className={cn(
            'absolute inset-0 bg-[var(--inkblot-semantic-color-background-primary)]/70'
          )}
          onClick={closeDialog}
        />
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            'relative z-10 w-full max-w-[calc(var(--inkblot-size-touch-target-min)*10)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)]',
            'bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-6)]',
            'shadow-[var(--inkblot-shadow-lg)]',
            className
          )}
          {...props}
        >
          {showCloseButton ? (
            <DialogClose
              aria-label="Close dialog"
              className={cn(
                'absolute right-[var(--inkblot-spacing-4)] top-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-md)] p-[var(--inkblot-spacing-2)]'
              )}
            >
              <X
                style={{
                  width: 'var(--inkblot-spacing-4)',
                  height: 'var(--inkblot-spacing-4)',
                }}
              />
            </DialogClose>
          ) : null}
          <div id={titleId} className="sr-only" />
          <div id={descriptionId} className="sr-only" />
          {children}
        </div>
      </div>,
      document.body
    )
  }
)

DialogContent.displayName = 'DialogContent'

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('mb-[var(--inkblot-spacing-4)] grid gap-[var(--inkblot-spacing-2)]', className)}
      {...props}
    />
  )
}

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        'text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-small)]',
        className
      )}
      {...props}
    />
  )
}

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <p
      className={cn(
        'text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-medium)]',
        className
      )}
      {...props}
    />
  )
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'mt-[var(--inkblot-spacing-6)] flex flex-wrap justify-end gap-[var(--inkblot-spacing-3)]',
        className
      )}
      {...props}
    />
  )
}

export type DialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, type = 'button', onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext()

    return (
      <button
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            setOpen(false)
          }
        }}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          'border border-[var(--inkblot-semantic-color-border-default)]',
          'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          className
        )}
        {...props}
      />
    )
  }
)

DialogClose.displayName = 'DialogClose'
