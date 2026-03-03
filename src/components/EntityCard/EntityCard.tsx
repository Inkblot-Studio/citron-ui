import { cn } from '../../utils/cn'
import { ArrowUpRight, BadgeCheck, Building2, TrendingUp, UserRound, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type EntityType = 'Person' | 'Organization' | 'Deal'

export interface Edge {
  type: string
  target?: string
}

export interface EntityCardStat {
  label: string
  value: string
  icon?: LucideIcon
}

export interface EntityCardProps {
  name: string
  entityType: EntityType
  /** Subtitle text displayed below the name (e.g. "Enterprise · Series C · SaaS"). */
  subtitle?: string
  /** Status badge label (e.g. "Active"). Only shown in company variant. */
  statusLabel?: string
  metadata?: Record<string, string>
  edges?: Edge[]
  /** Stats grid displayed under the header. Activates the company card layout. */
  stats?: EntityCardStat[]
  /** Connections summary text (e.g. "Connected to Jane Smith, TechVentures +3 more"). */
  connections?: string
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

const defaultCompanyStats: EntityCardStat[] = [
  { label: 'Contacts', value: '12', icon: Users },
  { label: 'Open Deals', value: '3', icon: TrendingUp },
  { label: 'Touchpoints', value: '47', icon: ArrowUpRight },
]

export function EntityCard({
  name,
  entityType,
  subtitle,
  statusLabel,
  metadata,
  edges = [],
  stats,
  connections,
  className,
}: EntityCardProps) {
  const Icon = entityTypeIcon[entityType]
  const isCompanyVariant = stats !== undefined || connections !== undefined

  if (isCompanyVariant) {
    const resolvedStats = stats ?? defaultCompanyStats
    return (
      <article
        className={cn(
          'glass flex flex-col gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-xl)] p-[var(--inkblot-spacing-5)]',
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-[var(--inkblot-spacing-3)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-primary)]/10">
              <Icon className="h-5 w-5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
                {name}
              </h3>
              {subtitle ? (
                <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          {statusLabel ? (
            <span className="rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/10 px-2 py-0.5 font-mono text-xs text-[var(--inkblot-semantic-color-interactive-primary)]">
              {statusLabel}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-[var(--inkblot-spacing-3)]">
          {resolvedStats.map((stat) => {
            const StatIcon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-[var(--inkblot-spacing-3)]"
              >
                <div className="mb-1 flex items-center gap-1.5">
                  {StatIcon ? (
                    <StatIcon className="h-3 w-3 text-[var(--inkblot-semantic-color-text-tertiary)]" aria-hidden />
                  ) : null}
                  <span className="text-[10px] uppercase tracking-wider text-[var(--inkblot-semantic-color-text-tertiary)]">
                    {stat.label}
                  </span>
                </div>
                <span className="text-lg font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
                  {stat.value}
                </span>
              </div>
            )
          })}
        </div>

        {connections ? (
          <div className="flex items-center gap-2 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--inkblot-semantic-color-interactive-primary)]" />
            {connections}
          </div>
        ) : null}
      </article>
    )
  }

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
            {subtitle ? (
              <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">{subtitle}</p>
            ) : (
              <span
                className={cn(
                  'inline-flex w-fit items-center rounded-[var(--inkblot-radius-full)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-small)] font-medium uppercase tracking-wide',
                  entityTypeBadge[entityType]
                )}
              >
                {entityType}
              </span>
            )}
          </div>
        </div>
        {statusLabel ? (
          <span className="rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/10 px-2 py-0.5 font-mono text-xs text-[var(--inkblot-semantic-color-interactive-primary)]">
            {statusLabel}
          </span>
        ) : null}
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
      {connections ? (
        <div className="flex items-center gap-2 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--inkblot-semantic-color-interactive-primary)]" />
          {connections}
        </div>
      ) : null}
    </article>
  )
}
