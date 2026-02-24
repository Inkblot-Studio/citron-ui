import { cn } from '../../utils/cn'

export type StatCardChangeVariant = 'success' | 'error' | 'neutral'

export interface StatCardItem {
  label: string
  value: string
  change?: string
  changeVariant?: StatCardChangeVariant
}

export interface StatCardsProps {
  items: StatCardItem[]
  className?: string
}

const changeVariantStyles: Record<StatCardChangeVariant, string> = {
  success: 'text-[var(--inkblot-semantic-color-status-success)]',
  error: 'text-[var(--inkblot-semantic-color-status-error)]',
  neutral: 'text-[var(--inkblot-semantic-color-text-secondary)]',
}

export function StatCards({ items, className }: StatCardsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <StatCard key={item.label} item={item} />
      ))}
    </div>
  )
}

interface StatCardProps {
  item: StatCardItem
}

function StatCard({ item }: StatCardProps) {
  const changeVariant = item.changeVariant ?? 'neutral'
  const changeStyle = changeVariantStyles[changeVariant]

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-[var(--inkblot-radius-lg)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-4)]',
        'border border-[var(--inkblot-semantic-color-border-subtle)]'
      )}
    >
      <span
        className={cn(
          'uppercase tracking-wider',
          '[font:var(--inkblot-semantic-typography-body-small)]',
          'text-[var(--inkblot-semantic-color-text-secondary)]'
        )}
      >
        {item.label}
      </span>
      <span
        className={cn(
          '[font:var(--inkblot-semantic-typography-heading-medium)]',
          'text-[var(--inkblot-semantic-color-text-primary)]'
        )}
      >
        {item.value}
      </span>
      {item.change ? (
        <span
          className={cn(
            '[font:var(--inkblot-semantic-typography-body-small)]',
            changeStyle
          )}
        >
          {item.change}
        </span>
      ) : null}
    </div>
  )
}

export interface StatCardWithChartItem extends StatCardItem {
  chartData?: number[]
}

export interface StatCardsWithChartProps {
  items: StatCardWithChartItem[]
  className?: string
}

export function StatCardsWithChart({
  items,
  className,
}: StatCardsWithChartProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <StatCardWithChart key={item.label} item={item} />
      ))}
    </div>
  )
}

interface StatCardWithChartProps {
  item: StatCardWithChartItem
}

function StatCardWithChart({ item }: StatCardWithChartProps) {
  const changeVariant = item.changeVariant ?? 'neutral'
  const changeStyle = changeVariantStyles[changeVariant]
  const chartData = item.chartData ?? []
  const maxVal = Math.max(...chartData, 1)

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-[var(--inkblot-radius-lg)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-4)]',
        'border border-[var(--inkblot-semantic-color-border-subtle)]'
      )}
    >
      <span
        className={cn(
          'uppercase tracking-wider',
          '[font:var(--inkblot-semantic-typography-body-small)]',
          'text-[var(--inkblot-semantic-color-text-secondary)]'
        )}
      >
        {item.label}
      </span>
      <div className="flex items-end justify-between gap-2">
        <span
          className={cn(
            '[font:var(--inkblot-semantic-typography-heading-medium)]',
            'text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          {item.value}
        </span>
        {chartData.length > 0 ? (
          <div className="flex h-8 items-end gap-0.5">
            {chartData.map((val, i) => (
              <div
                key={i}
                className="w-1 min-w-[2px] rounded-sm bg-[var(--inkblot-semantic-color-interactive-primary)] opacity-80"
                style={{ height: `${(val / maxVal) * 100}%`, minHeight: 4 }}
              />
            ))}
          </div>
        ) : null}
      </div>
      {item.change ? (
        <span
          className={cn(
            '[font:var(--inkblot-semantic-typography-body-small)]',
            changeStyle
          )}
        >
          {item.change}
        </span>
      ) : null}
    </div>
  )
}
