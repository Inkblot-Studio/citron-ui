import { CircularScore } from '../CircularScore'
import { cn } from '../../utils/cn'

export interface IntelligenceScoreItem {
  label: string
  value: number
  tone?: 'success' | 'warning' | 'error' | 'info' | 'primary'
}

export interface IntelligenceCardProps {
  title?: string
  items?: IntelligenceScoreItem[]
  className?: string
}

const defaultItems: IntelligenceScoreItem[] = [
  { label: 'Revenue Confidence', value: 82, tone: 'success' },
  { label: 'Churn Risk', value: 23, tone: 'warning' },
  { label: 'Momentum', value: 67, tone: 'primary' },
]

export function IntelligenceCard({
  title = 'Intelligence Scores',
  items = defaultItems,
  className,
}: IntelligenceCardProps) {
  return (
    <article
      className={cn(
        'rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-5',
        className
      )}
    >
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <CircularScore
            key={item.label}
            label={item.label}
            value={item.value}
            tone={item.tone}
          />
        ))}
      </div>
    </article>
  )
}
