import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { HTMLAttributes, ReactNode, RefObject } from 'react'
import { cn } from '../../utils/cn'

interface HoverCardContextValue {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  openDelay: number
  closeDelay: number
  timeoutRef: RefObject<number | null>
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const context = useContext(HoverCardContext)
  if (!context) {
    throw new Error('HoverCard components must be used within HoverCard')
  }
  return context
}

export interface HoverCardProps {
  children: ReactNode
  openDelay?: number
  closeDelay?: number
}

export function HoverCard({
  children,
  openDelay = 120,
  closeDelay = 120,
}: HoverCardProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const value = useMemo<HoverCardContextValue>(
    () => ({
      open,
      setOpen,
      openDelay,
      closeDelay,
      timeoutRef,
    }),
    [open, openDelay, closeDelay]
  )

  return (
    <HoverCardContext.Provider value={value}>
      <div className="relative inline-flex">{children}</div>
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps extends HTMLAttributes<HTMLDivElement> {}

export const HoverCardTrigger = forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ className, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { setOpen, openDelay, closeDelay, timeoutRef } = useHoverCardContext()

    return (
      <div
        ref={ref}
        tabIndex={0}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = window.setTimeout(() => setOpen(true), openDelay)
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event)
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = window.setTimeout(() => setOpen(false), closeDelay)
        }}
        onFocus={(event) => {
          onFocus?.(event)
          setOpen(true)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setOpen(false)
        }}
        className={cn(className)}
        {...props}
      />
    )
  }
)

HoverCardTrigger.displayName = 'HoverCardTrigger'

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { open, setOpen, closeDelay, timeoutRef } = useHoverCardContext()
    if (!open) {
      return null
    }

    return (
      <div
        ref={ref}
        role="dialog"
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
          }
          setOpen(true)
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event)
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = window.setTimeout(() => setOpen(false), closeDelay)
        }}
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

HoverCardContent.displayName = 'HoverCardContent'
