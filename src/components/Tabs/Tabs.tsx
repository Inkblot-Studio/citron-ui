import { useMemo, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface TabsItem {
  id: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabsItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  fullWidth?: boolean
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  fullWidth = false,
  className,
  ...props
}: TabsProps) {
  const fallback = defaultValue ?? items.find((item) => !item.disabled)?.id ?? ''
  const [internalValue, setInternalValue] = useState(fallback)
  const activeId = value ?? internalValue

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items.find((item) => !item.disabled),
    [activeId, items]
  )

  const setValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        role="tablist"
        className="inline-flex rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-1"
      >
        {items.map((item) => {
          const isActive = item.id === activeItem?.id

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => setValue(item.id)}
              className={cn(
                'min-h-[var(--inkblot-size-touch-target-min)] rounded-[var(--inkblot-radius-md)] px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
                fullWidth && 'flex-1',
                isActive
                  ? 'bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-primary)]'
                  : 'text-[var(--inkblot-semantic-color-text-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="mt-3 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4 text-[var(--inkblot-semantic-color-text-primary)]">
        {activeItem?.content}
      </div>
    </div>
  )
}
