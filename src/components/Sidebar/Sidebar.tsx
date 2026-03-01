import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface SidebarItem {
  id: string
  label: string
  icon?: LucideIcon
  active?: boolean
  disabled?: boolean
  badge?: ReactNode
  onClick?: () => void
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  header?: ReactNode
  footer?: ReactNode
}

export function Sidebar({
  items,
  collapsed = false,
  onCollapsedChange,
  header,
  footer,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3 transition-[width] duration-[var(--inkblot-duration-fast)]',
        collapsed ? 'w-[76px]' : 'w-[260px]',
        className
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className={cn('truncate text-sm font-semibold', collapsed && 'sr-only')}>{header}</div>
        <button
          type="button"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          onClick={() => onCollapsedChange?.(!collapsed)}
          className="inline-flex size-9 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-text-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={cn(
                'flex min-h-[var(--inkblot-size-touch-target-min)] items-center gap-3 rounded-[var(--inkblot-radius-md)] px-3 py-2 text-sm transition-colors',
                item.active
                  ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
                  : 'text-[var(--inkblot-semantic-color-text-secondary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
                item.disabled && 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
              )}
            >
              {Icon ? <Icon className="size-4 shrink-0" /> : null}
              {!collapsed ? (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge ? <span className="ml-auto">{item.badge}</span> : null}
                </>
              ) : null}
            </button>
          )
        })}
      </nav>

      {footer ? (
        <div className={cn('mt-3 border-t border-[var(--inkblot-semantic-color-border-default)] pt-3', collapsed && 'sr-only')}>
          {footer}
        </div>
      ) : null}
    </aside>
  )
}
