import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  Zap,
  FileText,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../utils/cn'

export type CampaignStatus = 'sent' | 'active' | 'draft' | 'scheduled'

export interface CampaignTableRow {
  id: string
  campaignName: string
  recipients: string
  status: CampaignStatus
  statusSubtext?: string
  opens: string
  clicks: string
  date: string
}

export interface CampaignTableProps {
  columns: { key: string; label: string }[]
  rows: CampaignTableRow[]
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  defaultSortKey?: string
  defaultSortDirection?: 'asc' | 'desc'
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void
  sortableColumns?: string[]
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

const statusConfig: Record<
  CampaignStatus,
  { icon: LucideIcon; label: string; colorClass: string }
> = {
  sent: {
    icon: CheckCircle,
    label: 'Sent',
    colorClass: 'text-[var(--inkblot-semantic-color-status-success)]',
  },
  active: {
    icon: Zap,
    label: 'Active',
    colorClass: 'text-[var(--inkblot-semantic-color-status-warning)]',
  },
  draft: {
    icon: FileText,
    label: 'Draft',
    colorClass: 'text-[var(--inkblot-semantic-color-text-secondary)]',
  },
  scheduled: {
    icon: Clock,
    label: 'Scheduled',
    colorClass: 'text-[var(--inkblot-semantic-color-status-info)]',
  },
}

export function CampaignTable({
  columns,
  rows,
  sortKey,
  sortDirection,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onSortChange,
  sortableColumns,
  emptyTitle = 'No campaigns found',
  emptyDescription = 'Create a campaign or adjust filters to see results.',
  className,
}: CampaignTableProps) {
  const [internalSortKey, setInternalSortKey] = useState<string | undefined>(defaultSortKey)
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection)

  const isSortControlled = sortKey !== undefined && sortDirection !== undefined
  const activeSortKey = isSortControlled ? sortKey : internalSortKey
  const activeSortDirection = isSortControlled ? sortDirection : internalSortDirection

  const isColumnSortable = (key: string) => {
    if (!sortableColumns || sortableColumns.length === 0) {
      return true
    }
    return sortableColumns.includes(key)
  }

  const getSortValue = (row: CampaignTableRow, key: string): string | number => {
    if (key === 'campaign') {
      return row.campaignName.toLowerCase()
    }
    if (key === 'status') {
      return row.status
    }
    if (key === 'opens') {
      return Number.parseFloat(row.opens.replace('%', '').trim()) || 0
    }
    if (key === 'clicks') {
      return Number.parseFloat(row.clicks.replace('%', '').trim()) || 0
    }
    if (key === 'date') {
      return new Date(row.date).getTime() || 0
    }
    const fallback = row[key as keyof CampaignTableRow]
    if (typeof fallback === 'number') {
      return fallback
    }
    return String(fallback ?? '').toLowerCase()
  }

  const sortedRows = useMemo(() => {
    if (!activeSortKey) {
      return rows
    }
    const sorted = [...rows].sort((a, b) => {
      const aValue = getSortValue(a, activeSortKey)
      const bValue = getSortValue(b, activeSortKey)
      if (aValue < bValue) {
        return activeSortDirection === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return activeSortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
    return sorted
  }, [activeSortDirection, activeSortKey, rows])

  const handleSort = (key: string) => {
    const nextDirection: 'asc' | 'desc' =
      activeSortKey === key && activeSortDirection === 'asc' ? 'desc' : 'asc'

    if (!isSortControlled) {
      setInternalSortKey(key)
      setInternalSortDirection(nextDirection)
    }
    onSortChange?.(key, nextDirection)
  }

  return (
    <div
      className={cn(
        'overflow-x-auto rounded-[var(--inkblot-radius-lg)]',
        'border border-[var(--inkblot-semantic-color-border-subtle)]',
        'bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-[var(--inkblot-semantic-color-background-secondary)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)] text-left',
                  'uppercase tracking-wider',
                  '[font:var(--inkblot-semantic-typography-body-small)]',
                  'text-[var(--inkblot-semantic-color-text-secondary)]',
                  'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                )}
              >
                {isColumnSortable(col.key) ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-[var(--inkblot-spacing-1)] rounded-[var(--inkblot-radius-sm)] transition-colors duration-[var(--inkblot-duration-fast)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
                  >
                    {col.label}
                    {activeSortKey !== col.key ? (
                      <ArrowUpDown className="h-3.5 w-3.5" aria-hidden />
                    ) : activeSortDirection === 'asc' ? (
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-10)] text-center"
              >
                <div className="mx-auto flex max-w-[420px] flex-col gap-[var(--inkblot-spacing-1)]">
                  <span className="[font:var(--inkblot-semantic-typography-body-large-bold)] text-[var(--inkblot-semantic-color-text-primary)]">
                    {emptyTitle}
                  </span>
                  <span className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-secondary)]">
                    {emptyDescription}
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            sortedRows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'border-b border-[var(--inkblot-semantic-color-border-subtle)] last:border-b-0',
                  'transition-colors duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-background-secondary)]/50'
                )}
              >
                <td
                  className={cn(
                    'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                    'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        '[font:var(--inkblot-semantic-typography-body-large-bold)]',
                        'text-[var(--inkblot-semantic-color-text-primary)]'
                      )}
                    >
                      {row.campaignName}
                    </span>
                    <span
                      className={cn(
                        '[font:var(--inkblot-semantic-typography-body-small)]',
                        'text-[var(--inkblot-semantic-color-text-secondary)]'
                      )}
                    >
                      {row.recipients}
                    </span>
                  </div>
                </td>
                <td
                  className={cn(
                    'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                    'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                  )}
                >
                  <CampaignStatusCell
                    status={row.status}
                    subtext={row.statusSubtext}
                  />
                </td>
                <td
                  className={cn(
                    'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                    '[font:var(--inkblot-semantic-typography-body-medium)]',
                    'text-[var(--inkblot-semantic-color-text-primary)]',
                    'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                  )}
                >
                  {row.opens}
                </td>
                <td
                  className={cn(
                    'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                    '[font:var(--inkblot-semantic-typography-body-medium)]',
                    'text-[var(--inkblot-semantic-color-text-primary)]',
                    'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                  )}
                >
                  {row.clicks}
                </td>
                <td
                  className={cn(
                    'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                    '[font:var(--inkblot-semantic-typography-body-medium)]',
                    'text-[var(--inkblot-semantic-color-text-primary)]',
                    'border-b border-[var(--inkblot-semantic-color-border-subtle)]'
                  )}
                >
                  {row.date}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

interface CampaignStatusCellProps {
  status: CampaignStatus
  subtext?: string
}

function CampaignStatusCell({ status, subtext }: CampaignStatusCellProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex flex-col gap-0.5">
      <div
        className={cn(
          'inline-flex items-center gap-1.5',
          '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
          config.colorClass
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {config.label}
      </div>
      {subtext ? (
        <span
          className={cn(
            '[font:var(--inkblot-semantic-typography-body-small)]',
            'text-[var(--inkblot-semantic-color-text-secondary)]'
          )}
        >
          {subtext}
        </span>
      ) : null}
    </div>
  )
}
