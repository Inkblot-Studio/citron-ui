import { cn } from '../../utils/cn'
import { StatusBadge, type StatusBadgeVariant } from '../StatusBadge'

export interface CitronEvent {
  id?: string
  actor: string
  subject: string
  event_type: string
  timestamp: string
  confidence_score: number
  metadata?: Record<string, unknown>
}

export interface EventRowProps {
  event: CitronEvent
  className?: string
}

function confidenceToVariant(score: number): StatusBadgeVariant {
  if (score >= 0.8) return 'success'
  if (score >= 0.5) return 'info'
  if (score >= 0.2) return 'warning'
  return 'error'
}

export function EventRow({ event, className }: EventRowProps) {
  const variant = confidenceToVariant(event.confidence_score)
  const confidenceLabel = `${Math.round(event.confidence_score * 100)}%`

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4',
        className
      )}
    >
      <span className="text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
        {event.actor}
      </span>
      <span className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
        →
      </span>
      <span className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        {event.subject}
      </span>
      <span className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-2 py-0.5 text-xs text-[var(--inkblot-semantic-color-text-secondary)]">
        {event.event_type}
      </span>
      <span className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
        {event.timestamp}
      </span>
      <StatusBadge label={confidenceLabel} variant={variant} />
    </div>
  )
}
