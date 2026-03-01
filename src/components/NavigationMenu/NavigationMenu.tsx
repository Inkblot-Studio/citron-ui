import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface NavigationMenuItem {
  id: string
  label: string
  href?: string
  active?: boolean
  disabled?: boolean
  icon?: ReactNode
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[]
  className?: string
  onItemSelect?: (item: NavigationMenuItem) => void
}

export function NavigationMenu({
  items,
  className,
  onItemSelect,
}: NavigationMenuProps) {
  return (
    <nav
      aria-label="Navigation menu"
      className={cn(
        'flex flex-wrap items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-2)]',
        className
      )}
    >
      {items.map((item) => (
        <NavigationMenuLink
          key={item.id}
          item={item}
          onSelect={() => onItemSelect?.(item)}
        />
      ))}
    </nav>
  )
}

interface NavigationMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  item: NavigationMenuItem
  onSelect?: () => void
}

function NavigationMenuLink({
  item,
  onSelect,
  className,
  ...props
}: NavigationMenuLinkProps) {
  const commonClassName = cn(
    'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
    '[font:var(--inkblot-semantic-typography-body-medium)]',
    item.active
      ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
      : 'text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-secondary)]',
    item.disabled && 'pointer-events-none opacity-[var(--inkblot-opacity-disabled)]',
    className
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        aria-current={item.active ? 'page' : undefined}
        className={commonClassName}
        onClick={() => onSelect?.()}
        {...props}
      >
        {item.icon}
        {item.label}
        {item.active ? null : (
          <ChevronRight
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
        )}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-current={item.active ? 'page' : undefined}
      disabled={item.disabled}
      className={commonClassName}
      onClick={() => onSelect?.()}
    >
      {item.icon}
      {item.label}
      {item.active ? null : (
        <ChevronRight
          style={{
            width: 'var(--inkblot-spacing-4)',
            height: 'var(--inkblot-spacing-4)',
          }}
        />
      )}
    </button>
  )
}
