import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
  current?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-[var(--inkblot-spacing-2)]">
        {items.map((item, index) => {
          const content = item.href && !item.disabled && !item.current ? (
            <a
              href={item.href}
              onClick={item.onClick}
              className="rounded-[var(--inkblot-radius-sm)] text-sm text-[var(--inkblot-semantic-color-text-secondary)] transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
            >
              {item.label}
            </a>
          ) : (
            <span
              aria-current={item.current ? 'page' : undefined}
              className={cn(
                'text-sm',
                item.current
                  ? 'font-semibold text-[var(--inkblot-semantic-color-text-primary)]'
                  : 'text-[var(--inkblot-semantic-color-text-tertiary)]',
                item.disabled && 'opacity-[var(--inkblot-opacity-disabled)]'
              )}
            >
              {item.label}
            </span>
          )

          return (
            <li key={item.id} className="flex items-center gap-[var(--inkblot-spacing-2)]">
              {content}
              {index < items.length - 1 && (
                <ChevronRight className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
