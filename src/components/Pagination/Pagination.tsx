import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center gap-[var(--inkblot-spacing-2)]', className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-3)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none'
        )}
      >
        <ChevronLeft
          style={{
            width: 'var(--inkblot-spacing-4)',
            height: 'var(--inkblot-spacing-4)',
          }}
        />
      </button>
      {pages.map((item) => {
        const isActive = item === page
        return (
          <button
            key={`page-${item}`}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-[var(--inkblot-size-touch-target-min)] min-w-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)]',
              '[font:var(--inkblot-semantic-typography-body-medium)]',
              isActive
                ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
                : 'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]'
            )}
          >
            {item}
          </button>
        )
      })}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-3)]',
          'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
          'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none'
        )}
      >
        <ChevronRight
          style={{
            width: 'var(--inkblot-spacing-4)',
            height: 'var(--inkblot-spacing-4)',
          }}
        />
      </button>
    </nav>
  )
}
