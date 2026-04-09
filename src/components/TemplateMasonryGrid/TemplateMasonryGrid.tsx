import { Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface TemplateMasonryItem {
  id: string
  title: string
  description?: string
  category?: string
  thumbnail?: string
}

export interface TemplateMasonryGridProps {
  items: TemplateMasonryItem[]
  columns?: number
  onSelect?: (item: TemplateMasonryItem) => void
  onGenerateWithAI?: (item: TemplateMasonryItem) => void
  className?: string
}

function MasonryCard({
  item,
  onSelect,
  onGenerateWithAI,
}: {
  item: TemplateMasonryItem
  onSelect?: (item: TemplateMasonryItem) => void
  onGenerateWithAI?: (item: TemplateMasonryItem) => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(item)
        }
      }}
      className={cn(
        'group mb-[var(--inkblot-spacing-4)] break-inside-avoid rounded-[var(--inkblot-radius-lg)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)] shadow-[var(--inkblot-shadow-sm)]',
        'cursor-pointer transition-shadow duration-[var(--inkblot-duration-fast)]',
        'hover:shadow-[var(--inkblot-shadow-md)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)]'
      )}
    >
      {item.thumbnail ? (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full rounded-t-[var(--inkblot-radius-lg)] object-cover"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-t-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-background-tertiary)]">
          <span className="text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
            No preview
          </span>
        </div>
      )}

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)] p-[var(--inkblot-spacing-4)]">
        {item.category && (
          <span
            className={cn(
              'inline-flex w-fit items-center rounded-[var(--inkblot-radius-sm)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
              'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-secondary)]',
              '[font:var(--inkblot-semantic-typography-body-small)]'
            )}
          >
            {item.category}
          </span>
        )}

        <h3 className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-4)]">
          {item.title}
        </h3>

        {item.description && (
          <p className="line-clamp-2 text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
            {item.description}
          </p>
        )}

        {onGenerateWithAI && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onGenerateWithAI(item)
            }}
            className={cn(
              'mt-[var(--inkblot-spacing-1)] inline-flex w-full items-center justify-center gap-[var(--inkblot-spacing-2)]',
              'rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
              'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
              '[font:var(--inkblot-semantic-typography-body-small)]',
              'opacity-0 transition-opacity duration-[var(--inkblot-duration-fast)] group-hover:opacity-100',
              'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
              'active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
              'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)]'
            )}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Generate with AI
          </button>
        )}
      </div>
    </div>
  )
}

export function TemplateMasonryGrid({
  items,
  columns = 3,
  onSelect,
  onGenerateWithAI,
  className,
}: TemplateMasonryGridProps) {
  return (
    <div
      className={cn('gap-[var(--inkblot-spacing-4)]', className)}
      style={{ columns, columnGap: 'var(--inkblot-spacing-4)' }}
    >
      {items.map((item) => (
        <MasonryCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onGenerateWithAI={onGenerateWithAI}
        />
      ))}
    </div>
  )
}
