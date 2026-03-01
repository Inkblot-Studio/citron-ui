import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ContextMenuItem {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  onSelect?: () => void
}

export interface ContextMenuProps {
  trigger: ReactNode
  items: ContextMenuItem[]
  className?: string
}

interface Position {
  x: number
  y: number
}

export function ContextMenu({ trigger, items, className }: ContextMenuProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    document.addEventListener('contextmenu', close)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('contextmenu', close)
    }
  }, [open])

  const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const bounds = containerRef.current?.getBoundingClientRect()
    const offsetX = bounds?.left ?? 0
    const offsetY = bounds?.top ?? 0
    setPosition({
      x: event.clientX - offsetX,
      y: event.clientY - offsetY,
    })
    setOpen(true)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} onContextMenu={onContextMenu}>
      {trigger}
      {open && (
        <div
          role="menu"
          className="absolute z-40 min-w-[220px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-1)] shadow-lg"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.()
                setOpen(false)
              }}
              className={cn(
                'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center justify-between gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] text-sm transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                item.disabled
                  ? 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
                  : 'hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
                item.danger
                  ? 'text-[var(--inkblot-semantic-color-status-error)]'
                  : 'text-[var(--inkblot-semantic-color-text-primary)]'
              )}
            >
              <span className="flex items-center gap-[var(--inkblot-spacing-2)]">
                {item.icon && (
                  <span className="text-[var(--inkblot-semantic-color-text-tertiary)]">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </span>
              {item.shortcut && (
                <span className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
