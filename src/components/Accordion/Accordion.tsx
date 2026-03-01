import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultValue?: string[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({
  items,
  defaultValue,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const initial = useMemo(() => new Set(defaultValue ?? []), [defaultValue])
  const [openItems, setOpenItems] = useState<Set<string>>(initial)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        return next
      }
      if (!allowMultiple) {
        return new Set([id])
      }
      next.add(id)
      return next
    })
  }

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]',
        className
      )}
    >
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id)
        return (
          <div
            key={item.id}
            className={cn(
              index !== 0 && 'border-t border-[var(--inkblot-semantic-color-border-default)]'
            )}
          >
            <button
              type="button"
              disabled={item.disabled}
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id)}
              className={cn(
                'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center justify-between gap-[var(--inkblot-spacing-3)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)] text-left text-[var(--inkblot-semantic-color-text-primary)] transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                item.disabled
                  ? 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
                  : 'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-[-2px]'
              )}
            >
              <span className="font-medium">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)] transition-transform duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="px-[var(--inkblot-spacing-4)] pb-[var(--inkblot-spacing-4)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
