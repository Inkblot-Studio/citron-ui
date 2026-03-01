import { ModuleErrorBoundary } from '../ModuleErrorBoundary'
import { TrendingDown, TrendingUp } from 'lucide-react'

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
      <div className="flex flex-col items-center gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-sm)]">
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
              className="transition-[stroke-dashoffset] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="flex items-center gap-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-heading-small)] font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              {clamped}%
              {trend === 'up' ? (
                <TrendingUp
                  className="h-4 w-4 text-[var(--inkblot-semantic-color-status-success)]"
                  aria-hidden
                />
              ) : trend === 'down' ? (
                <TrendingDown
                  className="h-4 w-4 text-[var(--inkblot-semantic-color-status-error)]"
                  aria-hidden
                />
              ) : null}
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="[font:var(--inkblot-semantic-typography-body-medium)] font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
            {label}
          </p>
          {subtext ? (
            <p className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
              {subtext}
            </p>
          ) : null}
        </div>
      </div>
    </ModuleErrorBoundary>
  )
}
