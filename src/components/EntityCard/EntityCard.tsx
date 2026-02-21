import { cn } from '../../utils/cn'

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
    'border-l-[var(--inkblot-semantic-color-status-info)] bg-[var(--inkblot-semantic-color-background-secondary)]',
  Organization:
    'border-l-[var(--inkblot-semantic-color-status-warning)] bg-[var(--inkblot-semantic-color-background-secondary)]',
  Deal:
    'border-l-[var(--inkblot-semantic-color-status-success)] bg-[var(--inkblot-semantic-color-background-secondary)]',
}

export function EntityCard({
  name,
  entityType,
  metadata,
  edges = [],
  className,
}: EntityCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] border-l-4 p-4',
        entityTypeStyles[entityType],
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
          {entityType}
        </span>
        <h3 className="text-base font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          {name}
        </h3>
      </div>
      {metadata && Object.keys(metadata).length > 0 ? (
        <dl className="flex flex-col gap-1">
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <dt className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
                {key}:
              </dt>
              <dd className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {edges.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-[var(--inkblot-semantic-color-text-secondary)]">
            Edges
          </h4>
          <ul className="flex flex-wrap gap-2">
            {edges.map((edge, i) => (
              <li
                key={i}
                className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-2 py-1 text-xs text-[var(--inkblot-semantic-color-text-secondary)]"
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
