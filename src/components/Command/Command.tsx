import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CommandItem {
  id: string
  label: string
  keywords?: string[]
  icon?: ReactNode
  disabled?: boolean
}

export interface CommandProps {
  items: CommandItem[]
  placeholder?: string
  onSelect?: (item: CommandItem) => void
  className?: string
}

export function Command({
  items,
  placeholder = 'Buscar comando...',
  onSelect,
  className,
}: CommandProps) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => {
      const inLabel = item.label.toLowerCase().includes(normalized)
      const inKeywords = (item.keywords ?? []).some((key) =>
        key.toLowerCase().includes(normalized)
      )
      return inLabel || inKeywords
    })
  }, [items, query])

  return (
    <div
      className={cn(
        'w-full rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]',
        className
      )}
    >
      <div className="flex items-center gap-[var(--inkblot-spacing-2)] border-b border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-3)]">
        <Search className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full bg-transparent text-sm text-[var(--inkblot-semantic-color-text-primary)] outline-none placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]"
        />
      </div>
      <div className="max-h-[280px] overflow-y-auto p-[var(--inkblot-spacing-2)]">
        {filtered.length > 0 ? (
          <ul className="flex flex-col gap-[var(--inkblot-spacing-1)]">
            {filtered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] text-left text-sm text-[var(--inkblot-semantic-color-text-primary)] transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                    item.disabled
                      ? 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
                      : 'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] active:bg-[var(--inkblot-semantic-color-background-tertiary)]'
                  )}
                >
                  {item.icon && (
                    <span className="text-[var(--inkblot-semantic-color-text-tertiary)]">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-3)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
            Sin resultados para tu búsqueda.
          </div>
        )}
      </div>
    </div>
  )
}
