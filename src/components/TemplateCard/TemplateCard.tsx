import { File } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface TemplateCardProps {
  category: string
  title: string
  uses: string
  onClick?: () => void
  className?: string
}

export function TemplateCard({
  category,
  title,
  uses,
  onClick,
  className,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-lg)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'border border-[var(--inkblot-semantic-color-border-subtle)]',
        'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-5)]',
        'text-left transition-colors duration-[var(--inkblot-duration-fast)]',
        'hover:border-[var(--inkblot-semantic-color-border-default)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            'rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
            'bg-[var(--inkblot-semantic-color-background-tertiary)]',
            '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
            'text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          {category}
        </span>
        <span
          className={cn(
            '[font:var(--inkblot-semantic-typography-body-small)]',
            'text-[var(--inkblot-semantic-color-text-secondary)]'
          )}
        >
          {uses}
        </span>
      </div>
      <h3
        className={cn(
          '[font:var(--inkblot-semantic-typography-body-large-bold)]',
          'text-[var(--inkblot-semantic-color-text-primary)]'
        )}
      >
        {title}
      </h3>
      <div className="flex flex-1 items-end justify-center pt-[var(--inkblot-spacing-4)]">
        <File
          className={cn(
            'h-10 w-10',
            'text-[var(--inkblot-semantic-color-text-tertiary)]'
          )}
        />
      </div>
    </button>
  )
}
