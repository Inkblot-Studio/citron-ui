import type { ReactNode } from 'react'
import { Input } from '../Input'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export interface EntityCommandCardStat {
  label: string
  value: string | number
}

export interface EntityCommandCardProps {
  title: string
  insights?: ReactNode
  stats?: EntityCommandCardStat[]
  commandValue?: string
  onCommandChange?: (value: string) => void
  onCommandSubmit?: () => void
  className?: string
}

export function EntityCommandCard({
  title,
  insights,
  stats = [],
  commandValue = '',
  onCommandChange,
  onCommandSubmit,
  className,
}: EntityCommandCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onCommandSubmit?.()
    }
  }

  return (
    <ModuleErrorBoundary className={className}>
      <div className="flex flex-col gap-4 rounded-[var(--inkblot-radius-xl)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4">
        <h2 className="text-xl font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          {title}
        </h2>
        {insights ? (
          <div
            className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-interactive-primary)] p-4"
            style={{
              boxShadow: '0 0 12px var(--inkblot-semantic-color-interactive-primary)',
            }}
          >
            {insights}
          </div>
        ) : null}
        {stats.length > 0 ? (
          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--inkblot-semantic-color-text-secondary)]">
              Connected To
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-3 py-2"
                >
                  <span className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                    {stat.label}
                  </span>
                  <p className="text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-2">
          <Input
            type="text"
            value={commandValue}
            onChange={(e) => onCommandChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this entity..."
            className="rounded-[var(--inkblot-radius-md)]"
          />
        </div>
      </div>
    </ModuleErrorBoundary>
  )
}
