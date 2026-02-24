import { Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { TemplateCard } from '../TemplateCard'

export interface EmailTemplateItem {
  id: string
  category: string
  title: string
  uses: string
}

export interface EmailTemplatesSectionProps {
  title?: string
  onGenerateWithAI?: () => void
  templates: EmailTemplateItem[]
  onTemplateClick?: (template: EmailTemplateItem) => void
  className?: string
}

export function EmailTemplatesSection({
  title = 'EMAIL TEMPLATES',
  onGenerateWithAI,
  templates,
  onTemplateClick,
  className,
}: EmailTemplatesSectionProps) {
  return (
    <section
      className={cn('flex flex-col gap-[var(--inkblot-spacing-6)]', className)}
    >
      <div className="flex flex-col gap-[var(--inkblot-spacing-4)] sm:flex-row sm:items-center sm:justify-between">
        <h2
          className={cn(
            'uppercase tracking-wider',
            '[font:var(--inkblot-semantic-typography-body-medium)]',
            'text-[var(--inkblot-semantic-color-text-secondary)]'
          )}
        >
          {title}
        </h2>
        {onGenerateWithAI ? (
          <button
            type="button"
            onClick={onGenerateWithAI}
            className={cn(
              'inline-flex min-h-[var(--inkblot-size-touch-target-min)] w-fit items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)]',
              'border border-[var(--inkblot-semantic-color-border-default)]',
              'bg-[var(--inkblot-semantic-color-interactive-secondary)]',
              'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
              '[font:var(--inkblot-semantic-typography-body-medium)] font-medium',
              'text-[var(--inkblot-semantic-color-text-primary)]',
              'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
              'transition-colors duration-[var(--inkblot-duration-fast)]'
            )}
          >
            <Sparkles
              className="h-4 w-4 shrink-0"
              style={{ color: 'var(--inkblot-semantic-color-status-warning)' }}
            />
            Generate with AI
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-[var(--inkblot-spacing-6)] sm:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            category={template.category}
            title={template.title}
            uses={template.uses}
            onClick={() => onTemplateClick?.(template)}
          />
        ))}
      </div>
    </section>
  )
}
