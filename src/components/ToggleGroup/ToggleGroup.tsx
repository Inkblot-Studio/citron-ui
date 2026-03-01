import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Toggle } from '../Toggle'

export type ToggleGroupType = 'single' | 'multiple'

export interface ToggleGroupItem {
  id: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
}

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
  type?: ToggleGroupType
  items: ToggleGroupItem[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export function ToggleGroup({
  type = 'single',
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupProps) {
  const initialValue = defaultValue ?? (type === 'single' ? '' : [])
  const [internalValue, setInternalValue] = useState<string | string[]>(initialValue)
  const resolvedValue = value ?? internalValue

  const selectedSet = useMemo(() => {
    if (type === 'single') {
      const singleValue = typeof resolvedValue === 'string' ? resolvedValue : ''
      return new Set(singleValue ? [singleValue] : [])
    }
    const multipleValue = Array.isArray(resolvedValue) ? resolvedValue : []
    return new Set(multipleValue)
  }, [resolvedValue, type])

  const updateValue = (itemId: string) => {
    if (type === 'single') {
      const next = selectedSet.has(itemId) ? '' : itemId
      if (value === undefined) setInternalValue(next)
      onValueChange?.(next)
      return
    }
    const current = Array.isArray(resolvedValue) ? resolvedValue : []
    const next = current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-1',
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Toggle
            key={item.id}
            pressed={selectedSet.has(item.id)}
            onPressedChange={() => updateValue(item.id)}
            disabled={item.disabled}
            size="sm"
          >
            {Icon ? <Icon className="mr-2 size-4" /> : null}
            {item.label}
          </Toggle>
        )
      })}
    </div>
  )
}
