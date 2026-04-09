import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AdvancedDropdownOption {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  disabled?: boolean
}

export interface AdvancedDropdownProps {
  options: AdvancedDropdownOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  clearable?: boolean
  disabled?: boolean
  className?: string
}

export function AdvancedDropdown({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found',
  clearable = false,
  disabled = false,
  className,
}: AdvancedDropdownProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null)
  const selectedValue = isControlled ? controlledValue : internalValue

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectedOption = options.find((o) => o.value === selectedValue)

  const select = useCallback(
    (val: string | null) => {
      if (!isControlled) setInternalValue(val)
      onChange?.(val)
      setOpen(false)
      setSearch('')
      setHighlightIndex(-1)
    },
    [isControlled, onChange]
  )

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
        setHighlightIndex(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (open) {
      searchInputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const items = listRef.current.querySelectorAll('[data-option]')
    items[highlightIndex]?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        setHighlightIndex((prev) => {
          let next = prev + 1
          while (next < filtered.length && filtered[next].disabled) next++
          return next < filtered.length ? next : prev
        })
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        setHighlightIndex((prev) => {
          let next = prev - 1
          while (next >= 0 && filtered[next].disabled) next--
          return next >= 0 ? next : prev
        })
        break
      }
      case 'Enter': {
        e.preventDefault()
        if (highlightIndex >= 0 && highlightIndex < filtered.length && !filtered[highlightIndex].disabled) {
          select(filtered[highlightIndex].value)
        }
        break
      }
      case 'Escape': {
        e.preventDefault()
        setOpen(false)
        setSearch('')
        setHighlightIndex(-1)
        break
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev)
        }}
        className={cn(
          'flex min-h-[var(--inkblot-size-touch-target-min)] w-full items-center justify-between gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] border px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          'transition-[border-color,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
          'border-[var(--inkblot-semantic-color-border-default)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
          disabled && 'pointer-events-none cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
        )}
      >
        <span
          className={cn(
            'truncate text-left',
            !selectedOption && 'text-[var(--inkblot-semantic-color-text-tertiary)]'
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="flex shrink-0 items-center gap-[var(--inkblot-spacing-1)]">
          {clearable && selectedOption && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={(e) => {
                e.stopPropagation()
                select(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  select(null)
                }
              }}
              className={cn(
                'flex items-center justify-center rounded-[var(--inkblot-radius-sm)] p-[var(--inkblot-spacing-1)]',
                'text-[var(--inkblot-semantic-color-text-tertiary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]'
              )}
            >
              <X className="size-3.5" />
            </span>
          )}
          <ChevronDown
            aria-hidden
            className={cn(
              'size-4 text-[var(--inkblot-semantic-color-text-tertiary)] transition-transform duration-[var(--inkblot-duration-fast)]',
              open && 'rotate-180'
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          'absolute left-0 top-full z-50 mt-[var(--inkblot-spacing-1)] w-full overflow-hidden rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-md)]',
          'transition-[opacity,transform] duration-[var(--inkblot-duration-normal)] ease-[var(--inkblot-easing-default)]',
          'origin-top',
          open
            ? 'pointer-events-auto scale-y-100 opacity-100'
            : 'pointer-events-none scale-y-95 opacity-0'
        )}
      >
        <div className="border-b border-[var(--inkblot-semantic-color-border-default)] p-[var(--inkblot-spacing-2)]">
          <div className="flex items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-1)]">
            <Search className="size-3.5 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setHighlightIndex(-1)
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent py-[var(--inkblot-spacing-1)] text-sm text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] focus:outline-none"
            />
          </div>
        </div>

        <ul
          ref={listRef}
          role="listbox"
          className="max-h-60 overflow-y-auto p-[var(--inkblot-spacing-1)]"
        >
          {filtered.length === 0 ? (
            <li className="px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-4)] text-center text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((option, idx) => {
              const isSelected = option.value === selectedValue
              const isHighlighted = idx === highlightIndex
              return (
                <li
                  key={option.value}
                  role="option"
                  data-option
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) select(option.value)
                  }}
                  onMouseEnter={() => {
                    if (!option.disabled) setHighlightIndex(idx)
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-sm)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
                    'transition-colors duration-[var(--inkblot-duration-fast)]',
                    isHighlighted && !option.disabled && 'bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
                    isSelected && 'bg-[var(--inkblot-semantic-color-interactive-secondary)]',
                    option.disabled && 'pointer-events-none cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
                  )}
                >
                  {option.icon && (
                    <span className="flex size-5 shrink-0 items-center justify-center text-[var(--inkblot-semantic-color-text-secondary)]">
                      {option.icon}
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm text-[var(--inkblot-semantic-color-text-primary)]">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="truncate text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                        {option.description}
                      </span>
                    )}
                  </span>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
