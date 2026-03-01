import type { ReactNode } from 'react'
import { Clock3 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export type EventStreamStatus = 'success' | 'warning' | 'error' | 'info'

export interface EventStreamEvent {
  id: string
  icon?: ReactNode
  title: string
  timestamp: string
  status?: EventStreamStatus
}

export interface EventStreamFeedProps {
  events: EventStreamEvent[]
  className?: string
}

const statusColors: Record<EventStreamStatus, string> = {
  success: 'bg-[var(--inkblot-semantic-color-status-success)]',
  warning: 'bg-[var(--inkblot-semantic-color-status-warning)]',
  error: 'bg-[var(--inkblot-semantic-color-status-error)]',
  info: 'bg-[var(--inkblot-semantic-color-status-info)]',
}

function DefaultEventIcon() {
  return (
    <Clock3
      className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]"
      aria-hidden
    />
  )
}

export function EventStreamFeed({ events, className }: EventStreamFeedProps) {
  return (
    <ModuleErrorBoundary className={className}>
      <div
        className={cn(
          'flex flex-col gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-sm)]'
        )}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]/60 bg-[var(--inkblot-semantic-color-background-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]"
          >
            <div className="mt-[var(--inkblot-spacing-1)] flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]">
              {event.icon ?? <DefaultEventIcon />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="[font:var(--inkblot-semantic-typography-body-medium)] font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                {event.title}
              </p>
              <p className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
                {event.timestamp}
              </p>
            </div>
            {event.status ? (
              <div
                className={cn(
                  'mt-[var(--inkblot-spacing-2)] h-2 w-2 shrink-0 rounded-[var(--inkblot-radius-full)]',
                  statusColors[event.status]
                )}
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </ModuleErrorBoundary>
  )
}
