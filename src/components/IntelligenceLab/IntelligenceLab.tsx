import { cn } from '../../utils/cn'
import { ModuleContainer } from '../ModuleContainer'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'
import { IntelligenceScoreCard } from '../IntelligenceScoreCard'
import type { GraphNode } from '../../types'
import type { CitronEvent } from '../EventRow'

export interface IntelligenceLabKpiCard {
  label: string
  value: number
  subtext?: string
  trend?: 'up' | 'down'
}

export interface IntelligenceLabInsight {
  title: string
  description: string
  confidence: number
}

const DEFAULT_KPI_CARDS: IntelligenceLabKpiCard[] = [
  { label: 'Pipeline Health', value: 76 },
  { label: 'Churn Risk', value: 28 },
  { label: 'Expansion Signal', value: 64 },
  { label: 'Team Velocity', value: 83 },
]

const DEFAULT_AI_INSIGHTS: IntelligenceLabInsight[] = [
  {
    title: 'Acme Corp likely to close within 14 days',
    description: 'Based on email sentiment, meeting cadence, and champion engagement patterns.',
    confidence: 89,
  },
  {
    title: 'Churn risk detected: GlobalTech Inc',
    description: 'Declining touchpoints and support ticket volume suggest potential churn.',
    confidence: 74,
  },
  {
    title: 'Expansion opportunity: TechVentures',
    description: 'Usage patterns and NPS scores indicate readiness for upsell conversation.',
    confidence: 81,
  },
]

export interface IntelligenceLabProps {
  entities: GraphNode[]
  events: CitronEvent[]
  focusEntity: GraphNode
  setFocusEntity: (entity: GraphNode) => void
  loading: boolean
  kpiCards?: IntelligenceLabKpiCard[]
  aiInsights?: IntelligenceLabInsight[]
  title?: string
  subtitle?: string
  className?: string
}

export function IntelligenceLab({
  loading,
  kpiCards = DEFAULT_KPI_CARDS,
  aiInsights = DEFAULT_AI_INSIGHTS,
  title = 'Intelligence Lab',
  subtitle = 'AI-generated insights - Updated 3 min ago',
  className,
}: IntelligenceLabProps) {
  return (
    <div className={cn('flex h-full flex-col gap-4 overflow-y-auto p-4', className)}>
      <div>
        <h1 className="text-2xl font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          {title}
        </h1>
        <p className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">{subtitle}</p>
      </div>

      <ModuleContainer loading={loading} title="">
        <ModuleErrorBoundary>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {kpiCards.map((kpi) => (
                <IntelligenceScoreCard
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  subtext={kpi.subtext}
                  trend={kpi.trend}
                />
              ))}
            </div>

            <div>
              <h2 className="mb-4 border-b border-[var(--inkblot-semantic-color-border-default)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--inkblot-semantic-color-text-primary)]">
                AI Insights
              </h2>
              <div className="flex flex-col gap-4">
                {aiInsights.map((insight) => (
                  <ModuleErrorBoundary key={insight.title}>
                    <div className="flex items-start justify-between gap-4 rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
                          {insight.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
                          {insight.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-center">
                        <span className="text-lg font-bold text-[var(--inkblot-semantic-color-text-primary)]">
                          {insight.confidence}
                        </span>
                        <span className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
                          Conf.
                        </span>
                      </div>
                    </div>
                  </ModuleErrorBoundary>
                ))}
              </div>
            </div>
          </div>
        </ModuleErrorBoundary>
      </ModuleContainer>
    </div>
  )
}
