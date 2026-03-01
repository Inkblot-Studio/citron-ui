import { cn } from '../../utils/cn'
import { BadgeCheck, Building2, UserRound } from 'lucide-react'

export type EntityType = 'Person' | 'Organization' | 'Deal'

export interface Edge {
  type: string
  target?: string
}

export interface EntityCardProps {
  name: string
  entityType: EntityType
  metadata?: Record<string, string>
  edges?: Edge[]
  className?: string
}

const entityTypeStyles: Record<EntityType, string> = {
  Person:
    'border-l-[var(--inkblot-semantic-color-status-info)]',
  Organization:
    'border-l-[var(--inkblot-semantic-color-status-warning)]',
  Deal:
    'border-l-[var(--inkblot-semantic-color-status-success)]',
}

const entityTypeIcon = {
  Person: UserRound,
  Organization: Building2,
  Deal: BadgeCheck,
} as const

const entityTypeBadge = {
  Person:
    'bg-[var(--inkblot-semantic-color-status-info)]/15 text-[var(--inkblot-semantic-color-status-info)]',
  Organization:
    'bg-[var(--inkblot-semantic-color-status-warning)]/15 text-[var(--inkblot-semantic-color-status-warning)]',
  Deal:
    'bg-[var(--inkblot-semantic-color-status-success)]/15 text-[var(--inkblot-semantic-color-status-success)]',
} as const

export function EntityCard({
  name,
  entityType,
  metadata,
  edges = [],
  className,
}: EntityCardProps) {
  const Icon = entityTypeIcon[entityType]

  return (
    <article
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] border-l-4 bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-sm)]',
        entityTypeStyles[entityType],
        className
      )}
    >
      <div className="flex items-start justify-between gap-[var(--inkblot-spacing-3)]">
        <div className="flex items-center gap-[var(--inkblot-spacing-3)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-text-secondary)]">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="flex flex-col gap-[var(--inkblot-spacing-1)]">
            <h3 className="[font:var(--inkblot-semantic-typography-body-medium)] font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              {name}
            </h3>
            <span
              className={cn(
                'inline-flex w-fit items-center rounded-[var(--inkblot-radius-full)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-small)] font-medium uppercase tracking-wide',
                entityTypeBadge[entityType]
              )}
            >
              {entityType}
            </span>
          </div>
        </div>
      </div>
      {metadata && Object.keys(metadata).length > 0 ? (
        <dl className="grid grid-cols-1 gap-[var(--inkblot-spacing-2)] sm:grid-cols-2">
          {Object.entries(metadata).map(([key, value]) => (
            <div
              key={key}
              className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]"
            >
              <dt className="[font:var(--inkblot-semantic-typography-body-small)] uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
                {key}
              </dt>
              <dd className="[font:var(--inkblot-semantic-typography-body-medium)] text-[var(--inkblot-semantic-color-text-secondary)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {edges.length > 0 ? (
        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <h4 className="[font:var(--inkblot-semantic-typography-body-small)] font-medium uppercase tracking-wide text-[var(--inkblot-semantic-color-text-secondary)]">
            Edges
          </h4>
          <ul className="flex flex-wrap gap-[var(--inkblot-spacing-2)]">
            {edges.map((edge, i) => (
              <li
                key={i}
                className="rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-secondary)]"
              >
                {edge.type}
                {edge.target ? ` → ${edge.target}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}
