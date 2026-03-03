export interface CircularScoreProps {
  label: string
  value: number
  tone?: 'success' | 'warning' | 'error' | 'info' | 'primary'
  /** Override the stroke color with an arbitrary CSS color value. Takes precedence over `tone`. */
  color?: string
  /** When true the arc represents the inverse (100 - value). Useful for risk-style scores. */
  inverted?: boolean
  size?: number
  className?: string
}

const toneStrokeMap: Record<NonNullable<CircularScoreProps['tone']>, string> = {
  success: 'var(--inkblot-semantic-color-status-success)',
  warning: 'var(--inkblot-semantic-color-status-warning)',
  error: 'var(--inkblot-semantic-color-status-error)',
  info: 'var(--inkblot-semantic-color-status-info)',
  primary: 'var(--inkblot-semantic-color-interactive-primary)',
}

export function CircularScore({
  label,
  value,
  tone = 'primary',
  color,
  inverted = false,
  size = 72,
  className,
}: CircularScoreProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const displayValue = inverted ? 100 - clamped : clamped
  const strokeWidth = 5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayValue / 100) * circumference
  const strokeColor = color ?? toneStrokeMap[tone]

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-2">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--inkblot-semantic-color-background-tertiary)"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-[var(--inkblot-duration-fast)]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
            {clamped}
          </span>
        </div>
        <span className="text-center text-[10px] leading-tight text-[var(--inkblot-semantic-color-text-tertiary)]">
          {label}
        </span>
      </div>
    </div>
  )
}
