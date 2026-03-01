import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

interface MenubarContextValue {
  openMenuId: string | null
  setOpenMenuId: (menuId: string | null) => void
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubarContext() {
  const context = useContext(MenubarContext)
  if (!context) {
    throw new Error('Menubar components must be used within Menubar')
  }
  return context
}

interface MenubarMenuContextValue {
  menuId: string
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

function useMenubarMenuContext() {
  const context = useContext(MenubarMenuContext)
  if (!context) {
    throw new Error('Menubar menu components must be used within MenubarMenu')
  }
  return context
}

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {}

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, ...props }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const value = useMemo<MenubarContextValue>(
      () => ({
        openMenuId,
        setOpenMenuId,
      }),
      [openMenuId]
    )

    return (
      <MenubarContext.Provider value={value}>
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-2)]',
            className
          )}
          {...props}
        />
      </MenubarContext.Provider>
    )
  }
)

Menubar.displayName = 'Menubar'

export interface MenubarMenuProps extends HTMLAttributes<HTMLDivElement> {
  id: string
}

export function MenubarMenu({ id, className, ...props }: MenubarMenuProps) {
  const value = useMemo<MenubarMenuContextValue>(
    () => ({
      menuId: id,
    }),
    [id]
  )
  return (
    <MenubarMenuContext.Provider value={value}>
      <div className={cn('relative inline-flex', className)} {...props} />
    </MenubarMenuContext.Provider>
  )
}

export interface MenubarTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  showChevron?: boolean
}

export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, type = 'button', showChevron = true, onClick, children, ...props }, ref) => {
    const { openMenuId, setOpenMenuId } = useMenubarContext()
    const { menuId } = useMenubarMenuContext()
    const isOpen = openMenuId === menuId

    return (
      <button
        ref={ref}
        type={type}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            setOpenMenuId(isOpen ? null : menuId)
          }
        }}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          isOpen
            ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
            : 'text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-secondary)]',
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
  }
)

MenubarTrigger.displayName = 'MenubarTrigger'

export interface MenubarContentProps extends HTMLAttributes<HTMLDivElement> {}

export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, ...props }, ref) => {
    const { openMenuId } = useMenubarContext()
    const { menuId } = useMenubarMenuContext()

    if (openMenuId !== menuId) {
      return null
    }

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          'absolute left-0 top-[calc(100%+var(--inkblot-spacing-2))] z-40 min-w-[calc(var(--inkblot-size-touch-target-min)*4)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-2)] shadow-[var(--inkblot-shadow-md)]',
          className
        )}
        {...props}
      />
    )
  }
)

MenubarContent.displayName = 'MenubarContent'

export interface MenubarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
}

export const MenubarItem = forwardRef<HTMLButtonElement, MenubarItemProps>(
  ({ className, type = 'button', icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        role="menuitem"
        className={cn(
          'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
          'text-left text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-secondary)]',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          className
        )}
        {...props}
      >
        {icon}
        {props.children}
      </button>
    )
  }
)

MenubarItem.displayName = 'MenubarItem'

export interface MenubarSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export function MenubarSeparator({ className, ...props }: MenubarSeparatorProps) {
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

export interface MenubarCloseZoneProps extends HTMLAttributes<HTMLDivElement> {}

export const MenubarCloseZone = forwardRef<HTMLDivElement, MenubarCloseZoneProps>(
  ({ className, ...props }, ref) => {
    const { setOpenMenuId } = useMenubarContext()
    const zoneRef = useRef<HTMLDivElement | null>(null)

    return (
      <div
        ref={(element) => {
          zoneRef.current = element
          if (typeof ref === 'function') {
            ref(element)
          } else if (ref) {
            ref.current = element
          }
        }}
        onPointerDown={(event) => {
          if (zoneRef.current?.contains(event.target as Node)) {
            setOpenMenuId(null)
          }
        }}
        className={cn(className)}
        {...props}
      />
    )
  }
)

MenubarCloseZone.displayName = 'MenubarCloseZone'
