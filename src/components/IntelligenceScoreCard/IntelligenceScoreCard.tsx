import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export interface IntelligenceScoreCardProps {
  label: string
  value: number
  subtext?: string
  trend?: 'up' | 'down'
  className?: string
}

const r = 36
const circumference = 2 * Math.PI * r

export function IntelligenceScoreCard({
  label,
  value,
  subtext,
  trend,
  className,
}: IntelligenceScoreCardProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <ModuleErrorBoundary className={className}>
      <div className="flex flex-col items-center gap-4 rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4">
        <div className="relative">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle
              cx="48"
              cy="48"
              r={r}
              fill="none"
              stroke="var(--inkblot-semantic-color-background-tertiary)"
              strokeWidth="4"
            />
            <circle
              cx="48"
              cy="48"
              r={r}
              fill="none"
              stroke="var(--inkblot-semantic-color-interactive-primary)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-[var(--inkblot-duration-fast)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-lg font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              {clamped}%
              {trend === 'up' ? (
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 text-[var(--inkblot-semantic-color-status-success)]"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M8 4l4 6H4l4-6z"
                  />
                </svg>
              ) : trend === 'down' ? (
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 text-[var(--inkblot-semantic-color-status-error)]"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M8 12l4-6H4l4 6z"
                  />
                </svg>
              ) : null}
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
            {label}
          </p>
          {subtext ? (
            <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
              {subtext}
            </p>
          ) : null}
        </div>
      </div>
    </ModuleErrorBoundary>
  )
}
