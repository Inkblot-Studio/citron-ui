import {
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
  className,
}: CampaignTableProps) {
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
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
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
          ))}
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
