import type { LucideIcon } from 'lucide-react'
import { CreditCard, FileText, GitBranch, Mail, Phone, Zap } from 'lucide-react'
import { cn } from '../../utils/cn'

export type EventStatus = 'success' | 'warning' | 'error' | 'danger' | 'info'

export interface EventFeedItem {
  id: string | number
  icon: LucideIcon
  title: string
  meta: string
  time: string
  status: EventStatus
}

export interface EventFeedProps {
  title?: string
  liveLabel?: string
  events?: EventFeedItem[]
  onItemClick?: (event: EventFeedItem) => void
  className?: string
}

const defaultEvents: EventFeedItem[] = [
  {
    id: 1,
    icon: Mail,
    title: 'Email opened',
    meta: 'Jane Smith · Acme Corp',
    time: '2m ago',
    status: 'info',
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Invoice #1042 paid',
    meta: '$24,500 · TechVentures',
    time: '8m ago',
    status: 'success',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Pipeline stage changed',
    meta: 'Negotiation → Closing',
    time: '14m ago',
    status: 'warning',
  },
  {
    id: 4,
    icon: Phone,
    title: 'Call completed',
    meta: '12 min · Mark Johnson',
    time: '23m ago',
    status: 'info',
  },
  {
    id: 5,
    icon: FileText,
    title: 'Contract signed',
    meta: 'NDA · GlobalTech Inc',
    time: '1h ago',
    status: 'success',
  },
  {
    id: 6,
    icon: GitBranch,
    title: 'New relationship detected',
    meta: 'Acme ↔ DataFlow Labs',
    time: '2h ago',
    status: 'info',
  },
  {
    id: 7,
    icon: CreditCard,
    title: 'Invoice overdue',
    meta: '$8,200 · StartupXYZ',
    time: '3h ago',
    status: 'danger',
  },
]

const statusDotClassMap: Record<EventStatus, string> = {
  success: 'bg-[var(--inkblot-semantic-color-status-success)]',
  warning: 'bg-[var(--inkblot-semantic-color-status-warning)]',
  error: 'bg-[var(--inkblot-semantic-color-status-error)]',
  danger: 'bg-[var(--inkblot-semantic-color-status-error)]',
  info: 'bg-[var(--inkblot-semantic-color-status-info)]',
}

export function EventFeed({
  title = 'Event Stream',
  liveLabel = 'Live',
  events = defaultEvents,
  onItemClick,
  className,
}: EventFeedProps) {
  return (
    <section className={cn('p-4', className)}>
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
          {title}
        </h3>
        <span className="text-[10px] font-medium text-[var(--inkblot-semantic-color-text-tertiary)]">
          {liveLabel}
        </span>
      </header>
      <ul className="space-y-1">
        {events.map((event) => {
          const Icon = event.icon
          return (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => onItemClick?.(event)}
                className="group flex w-full items-start gap-3 rounded-[var(--inkblot-radius-md)] px-2.5 py-2.5 text-left transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-background-tertiary)]">
                  <Icon
                    className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-text-tertiary)] group-hover:text-[var(--inkblot-semantic-color-text-secondary)]"
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', statusDotClassMap[event.status])} />
                    <span className="truncate text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                      {event.title}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]">
                    {event.meta}
                  </span>
                </span>
                <span className="mt-0.5 shrink-0 text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]">
                  {event.time}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
