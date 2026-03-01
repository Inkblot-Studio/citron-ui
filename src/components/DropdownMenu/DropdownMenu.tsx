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
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  containerRef: RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu')
  }
  return context
}

export interface DropdownMenuProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) {
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

  const value = useMemo<DropdownMenuContextValue>(
    () => ({
      open: currentOpen,
      setOpen,
      containerRef,
    }),
    [currentOpen, setOpen]
  )

  return (
    <DropdownMenuContext.Provider value={value}>
      <div ref={containerRef} className="relative inline-flex">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  showChevron?: boolean
}

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, type = 'button', showChevron = true, onClick, children, ...props }, ref) => {
  const { open, setOpen } = useDropdownMenuContext()

  return (
    <button
      ref={ref}
      type={type}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(!open)
        }
      }}
      className={cn(
        'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
        'bg-[var(--inkblot-semantic-color-interactive-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
        'text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2',
        '[font:var(--inkblot-semantic-typography-body-medium)]',
        className
      )}
      {...props}
    >
      {children}
      {showChevron ? (
        <ChevronDown
          style={{
            width: 'var(--inkblot-spacing-4)',
            height: 'var(--inkblot-spacing-4)',
          }}
        />
      ) : null}
    </button>
  )
})

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, ...props }, ref) => {
  const { open } = useDropdownMenuContext()
  if (!open) {
    return null
  }

  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        'absolute right-0 top-[calc(100%+var(--inkblot-spacing-2))] z-40 min-w-[calc(var(--inkblot-size-touch-target-min)*4)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
        'bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-2)] shadow-[var(--inkblot-shadow-md)]',
        className
      )}
      {...props}
    />
  )
})

DropdownMenuContent.displayName = 'DropdownMenuContent'

export interface DropdownMenuItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
}

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ className, type = 'button', icon, onClick, children, ...props }, ref) => {
  const { setOpen } = useDropdownMenuContext()

  return (
    <button
      ref={ref}
      type={type}
      role="menuitem"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(false)
        }
      }}
      className={cn(
        'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
        'text-left text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-secondary)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-0',
        '[font:var(--inkblot-semantic-typography-body-medium)]',
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
})

DropdownMenuItem.displayName = 'DropdownMenuItem'

export interface DropdownMenuSeparatorProps
  extends HTMLAttributes<HTMLDivElement> {}

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <div
      className={cn(
        'my-[var(--inkblot-spacing-2)] border-b border-[var(--inkblot-semantic-color-border-default)]',
        className
      )}
      {...props}
    />
  )
}
