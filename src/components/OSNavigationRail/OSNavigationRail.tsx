import { useCallback, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export interface OSNavigationRailItem {
  id: string
  icon: ReactNode
  label?: string
  active?: boolean
  disabled?: boolean
  onClick?: (id: string) => void
}

export interface OSNavigationRailProps {
  items: OSNavigationRailItem[]
  activeItemId?: string
  defaultActiveItemId?: string
  onActiveItemChange?: (id: string, item: OSNavigationRailItem) => void
  onItemClick?: (id: string, item: OSNavigationRailItem) => void
  className?: string
}

export function OSNavigationRail({
  items,
  activeItemId,
  defaultActiveItemId,
  onActiveItemChange,
  onItemClick,
  className,
}: OSNavigationRailProps) {
  const initialUncontrolledId = useMemo(() => {
    if (defaultActiveItemId !== undefined) {
      return defaultActiveItemId
    }
    return items.find((item) => item.active)?.id
  }, [defaultActiveItemId, items])

  const [internalActiveItemId, setInternalActiveItemId] = useState<string | undefined>(
    initialUncontrolledId
  )
  const isControlled = activeItemId !== undefined
  const currentActiveItemId = isControlled ? activeItemId : internalActiveItemId

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, item: OSNavigationRailItem) => {
      if (item.disabled) {
        event.preventDefault()
        return
      }
      if (!isControlled) {
        setInternalActiveItemId(item.id)
      }
      onItemClick?.(item.id, item)
      item.onClick?.(item.id)
      onActiveItemChange?.(item.id, item)
    },
    [isControlled, onActiveItemChange, onItemClick]
  )

  return (
    <ModuleErrorBoundary className={className}>
      <nav
        className={cn(
          'flex w-16 flex-col items-center gap-[var(--inkblot-spacing-2)] border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-4)]'
        )}
        aria-label="Navigation"
      >
        {items.map((item) => {
          const isActive = currentActiveItemId ? item.id === currentActiveItemId : Boolean(item.active)
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={(event) => handleItemClick(event, item)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex w-full flex-col items-center gap-[var(--inkblot-spacing-1)] rounded-[var(--inkblot-radius-lg)] border border-transparent px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-2)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                isActive
                  ? 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-interactive-primary)]'
                  : 'text-[var(--inkblot-semantic-color-text-tertiary)] hover:bg-[var(--inkblot-semantic-color-background-primary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                'disabled:pointer-events-none disabled:opacity-[var(--inkblot-opacity-disabled)]'
              )}
            >
              {isActive ? (
                <span
                  className="absolute left-[-0.5rem] top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)]"
                  aria-hidden
                />
              ) : null}
              <div className="flex h-8 w-8 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
                {item.icon}
              </div>
              {item.label ? (
                <span className="[font:var(--inkblot-semantic-typography-body-small)] font-medium">
                  {item.label}
                </span>
              ) : null}
            </button>
          )
        })}
      </nav>
    </ModuleErrorBoundary>
  )
}
