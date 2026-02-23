import { Mail, FileText, Zap, Phone, Link2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'
import type { CitronEvent } from '../EventRow'
import type { GraphNode } from '../../types'

export interface ActivityStreamProps {
  events: CitronEvent[]
  onEntitySelect?: (entity: GraphNode) => void
  findEntity?: (name: string) => GraphNode | null
  emptyMessage?: string
  className?: string
}

function getStatusColor(score: number): string {
  if (score >= 0.8) return 'bg-[var(--inkblot-semantic-color-status-success)]'
  if (score >= 0.5) return 'bg-[var(--inkblot-semantic-color-status-info)]'
  if (score >= 0.2) return 'bg-[var(--inkblot-semantic-color-status-warning)]'
  return 'bg-[var(--inkblot-semantic-color-status-error)]'
}

const ICON_MAP: Record<string, typeof Mail> = {
  EMAIL_OPENED: Mail,
  EMAIL_SENT: Mail,
  INVOICE_PAID: FileText,
  INVOICE_OVERDUE: FileText,
  CONTRACT_SIGNED: FileText,
  STAGE_CHANGED: Zap,
  CALL_COMPLETED: Phone,
  PHONE_CALL: Phone,
  RELATIONSHIP_DETECTED: Link2,
}

function getIcon(eventType: string) {
  return ICON_MAP[eventType] ?? FileText
}

function getDescription(evt: CitronEvent): string {
  const meta = evt.metadata as { description?: string } | undefined
  return meta?.description ?? evt.event_type.replace(/_/g, ' ').toLowerCase()
}

function getDetails(evt: CitronEvent): string {
  const meta = evt.metadata as { details?: string } | undefined
  return meta?.details ?? `${evt.actor} - ${evt.subject}`
}

export function ActivityStream({
  events,
  onEntitySelect,
  findEntity,
  emptyMessage = 'No hay actividad reciente',
  className,
}: ActivityStreamProps) {
  const handleClick = onEntitySelect
    ? (evt: CitronEvent) => {
        const entity = findEntity?.(evt.subject) ?? findEntity?.(evt.actor)
        if (entity) onEntitySelect(entity)
      }
    : undefined

  return (
    <ModuleErrorBoundary>
      <div className={cn('space-y-2', className)}>
        {events.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
            {emptyMessage}
          </p>
        ) : (
          events.map((evt) => {
            const entity = findEntity?.(evt.subject) ?? findEntity?.(evt.actor)
            const isClickable = !!entity && !!handleClick
            const Icon = getIcon(evt.event_type)
            const content = (
              <div className="flex flex-1 items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-[var(--inkblot-semantic-color-text-secondary)]" aria-hidden />
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${getStatusColor(evt.confidence_score)}`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                    {getDescription(evt)}
                  </p>
                  <p className="text-xs text-[var(--inkblot-semantic-color-text-secondary)]">
                    {getDetails(evt)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                  {evt.timestamp}
                </span>
              </div>
            )
            const eventKey = evt.id ?? `${evt.actor}-${evt.subject}-${evt.timestamp}`
            return (
              <div key={eventKey}>
                {isClickable ? (
                  <button
                    type="button"
                    onClick={() => handleClick(evt)}
                    className="flex w-full items-center gap-3 rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3 text-left transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]"
                  >
                    {content}
                  </button>
                ) : (
                  <div className="flex w-full items-center gap-3 rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3">
                    {content}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </ModuleErrorBoundary>
  )
}
