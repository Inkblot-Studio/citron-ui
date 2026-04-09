import { cn } from '../../utils/cn'

export interface ChartDatum {
  id: string
  label: string
  value: number
  color?: string
}

export interface ChartProps {
  data: ChartDatum[]
  title?: string
  emptyMessage?: string
  className?: string
}

export function Chart({
  data,
  title = 'Rendimiento',
  emptyMessage = 'No data to display.',
  className,
}: ChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 0)

  return (
    <div
      className={cn(
        'w-full rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-5)]',
        className
      )}
    >
      <h3 className="mb-[var(--inkblot-spacing-4)] text-sm font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
        {title}
      </h3>
      {data.length === 0 ? (
        <div className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-4)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
          {emptyMessage}
        </div>
      ) : (
        <div className="flex flex-col gap-[var(--inkblot-spacing-3)]">
          {data.map((item) => {
            const barWidth = maxValue > 0 ? (item.value / maxValue) * 100 : 0
            return (
              <div key={item.id} className="grid grid-cols-[120px_1fr_48px] items-center gap-[var(--inkblot-spacing-3)]">
                <span className="truncate text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
                  {item.label}
                </span>
                <div className="h-3 overflow-hidden rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-background-tertiary)]">
                  <div
                    className="h-full rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)]"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor:
                        item.color ??
                        'var(--inkblot-semantic-color-interactive-primary)',
                    }}
                  />
                </div>
                <span className="text-right text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                  {item.value}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
