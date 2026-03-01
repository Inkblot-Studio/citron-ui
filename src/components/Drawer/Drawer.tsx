import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

type DrawerSide = 'left' | 'right'

interface DrawerContextValue {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  side: DrawerSide
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('Drawer components must be used within Drawer')
  }
  return context
}

export interface DrawerProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: DrawerSide
}

export function Drawer({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
}: DrawerProps) {
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

  const value = useMemo<DrawerContextValue>(
    () => ({
      open: currentOpen,
      setOpen,
      side,
    }),
    [currentOpen, setOpen, side]
  )

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}

export type DrawerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ className, type = 'button', onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext()
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
          className
        )}
        {...props}
      />
    )
  }
)

DrawerTrigger.displayName = 'DrawerTrigger'

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  initialFocusRef?: RefObject<HTMLElement | null>
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, initialFocusRef, ...props }, ref) => {
    const { open, setOpen, side } = useDrawerContext()
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

    const closeDrawer = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    useEffect(() => {
      if (!open) {
        return
      }
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeDrawer()
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }, [closeDrawer, open])

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
      <div className="fixed inset-0 z-50">
        <button
          type="button"
          aria-label="Close drawer"
          className="absolute inset-0 bg-[var(--inkblot-semantic-color-background-primary)]/70"
          onClick={closeDrawer}
        />
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(
            'absolute top-0 h-full w-full max-w-[calc(var(--inkblot-size-touch-target-min)*7)] border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-6)] shadow-[var(--inkblot-shadow-lg)]',
            side === 'right'
              ? 'right-0 border-l'
              : 'left-0 border-r',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    )
  }
)

DrawerContent.displayName = 'DrawerContent'

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn('mb-[var(--inkblot-spacing-4)] grid gap-[var(--inkblot-spacing-2)]', className)}
      {...props}
    />
  )
}

export type DrawerTitleProps = HTMLAttributes<HTMLHeadingElement>

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
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

export type DrawerDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function DrawerDescription({
  className,
  ...props
}: DrawerDescriptionProps) {
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

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
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

export type DrawerCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, type = 'button', onClick, children, ...props }, ref) => {
    const { setOpen } = useDrawerContext()
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
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          'border border-[var(--inkblot-semantic-color-border-default)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
          className
        )}
        {...props}
      >
        {children ?? (
          <X
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
        )}
      </button>
    )
  }
)

DrawerClose.displayName = 'DrawerClose'
