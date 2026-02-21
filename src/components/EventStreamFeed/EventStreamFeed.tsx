import type { ReactNode } from 'react'
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
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]"
      aria-hidden
    >
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  )
}

export function EventStreamFeed({ events, className }: EventStreamFeedProps) {
  return (
    <ModuleErrorBoundary className={className}>
      <div
        className={cn(
          'flex flex-col gap-4 border-l-2 border-[var(--inkblot-semantic-color-border-default)] pl-4'
        )}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3"
          >
            <div className="flex shrink-0 items-center pt-0.5">
              {event.icon ?? <DefaultEventIcon />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                {event.title}
              </p>
              <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                {event.timestamp}
              </p>
            </div>
            {event.status ? (
              <div
                className={cn(
                  'mt-1.5 h-2 w-2 shrink-0 rounded-full',
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
