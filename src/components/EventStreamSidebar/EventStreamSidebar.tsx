import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'
import { ActivityStream } from '../ActivityStream'
import type { CitronEvent } from '../EventRow'

export interface EventStreamSidebarProps {
  events: CitronEvent[]
  title?: string
  showLive?: boolean
  className?: string
}

export function EventStreamSidebar({
  events,
  title = 'Event Stream',
  showLive = true,
  className,
}: EventStreamSidebarProps) {
  return (
    <ModuleErrorBoundary>
      <div
        className={cn(
          'flex h-full flex-col bg-[var(--inkblot-semantic-color-background-secondary)]',
          className
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--inkblot-semantic-color-border-default)] px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--inkblot-semantic-color-text-secondary)]">
            {title}
          </span>
          {showLive && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[var(--inkblot-semantic-color-status-success)]" />
              <span className="text-xs text-[var(--inkblot-semantic-color-status-success)]">Live</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <ActivityStream events={events} />
        </div>
      </div>
    </ModuleErrorBoundary>
  )
}
