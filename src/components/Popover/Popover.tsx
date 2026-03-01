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
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  RefObject,
  ReactNode,
} from 'react'
import { cn } from '../../utils/cn'

interface PopoverContextValue {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  containerRef: RefObject<HTMLDivElement | null>
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('Popover components must be used within Popover')
  }
  return context
}

export interface PopoverProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const containerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (!currentOpen) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (target && containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [currentOpen, setOpen])

  const value = useMemo<PopoverContextValue>(
    () => ({
      open: currentOpen,
      setOpen,
      containerRef,
    }),
    [currentOpen, setOpen]
  )

  return (
    <PopoverContext.Provider value={value}>
      <div ref={containerRef} className="relative inline-flex">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

export type PopoverTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, type = 'button', onClick, ...props }, ref) => {
    const { open, setOpen } = usePopoverContext()
    return (
      <button
        ref={ref}
        type={type}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            setOpen(!open)
          }
        }}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-primary)]',
          'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          className
        )}
        {...props}
      />
    )
  }
)

PopoverTrigger.displayName = 'PopoverTrigger'

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, ...props }, ref) => {
    const { open } = usePopoverContext()
    if (!open) {
      return null
    }
    return (
      <div
        ref={ref}
        role="dialog"
        className={cn(
          'absolute left-0 top-[calc(100%+var(--inkblot-spacing-2))] z-40 min-w-[calc(var(--inkblot-size-touch-target-min)*4)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-md)]',
          className
        )}
        {...props}
      />
    )
  }
)

PopoverContent.displayName = 'PopoverContent'

export type PopoverCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, type = 'button', onClick, ...props }, ref) => {
    const { setOpen } = usePopoverContext()
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
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          className
        )}
        {...props}
      />
    )
  }
)

PopoverClose.displayName = 'PopoverClose'
