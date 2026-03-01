import { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

export interface GraphNode {
  id: string
  label: string
  kind: 'org' | 'person'
  x: number
  y: number
  score: number
}

export interface GraphEdge {
  from: string
  to: string
  strength: number
}

export interface GraphViewProps {
  title?: string
  subtitle?: string
  nodes?: GraphNode[]
  edges?: GraphEdge[]
  className?: string
}

const defaultNodes: GraphNode[] = [
  { id: '1', label: 'Acme Corp', kind: 'org', x: 400, y: 250, score: 82 },
  { id: '2', label: 'TechVentures', kind: 'org', x: 220, y: 140, score: 65 },
  { id: '3', label: 'DataFlow Labs', kind: 'org', x: 600, y: 160, score: 45 },
  { id: '4', label: 'Jane Smith', kind: 'person', x: 300, y: 380, score: 90 },
  { id: '5', label: 'Mark Johnson', kind: 'person', x: 520, y: 370, score: 72 },
  { id: '6', label: 'GlobalTech', kind: 'org', x: 160, y: 300, score: 38 },
  { id: '7', label: 'Sarah Lee', kind: 'person', x: 650, y: 310, score: 55 },
]

const defaultEdges: GraphEdge[] = [
  { from: '1', to: '2', strength: 0.8 },
  { from: '1', to: '3', strength: 0.5 },
  { from: '1', to: '4', strength: 0.9 },
  { from: '1', to: '5', strength: 0.7 },
  { from: '2', to: '6', strength: 0.4 },
  { from: '3', to: '7', strength: 0.6 },
  { from: '4', to: '5', strength: 0.3 },
  { from: '6', to: '4', strength: 0.5 },
]

function scoreColor(score: number, highTone: string, mediumTone: string, lowTone: string) {
  if (score >= 70) {
    return highTone
  }
  if (score >= 50) {
    return mediumTone
  }
  return lowTone
}

function readToken(style: CSSStyleDeclaration, tokens: string[]) {
  for (const token of tokens) {
    const value = style.getPropertyValue(token).trim()
    if (value) {
      return value
    }
  }
  return ''
}

function applyTypography(context: CanvasRenderingContext2D, tokenFont: string, fallbackFont: string) {
  if (tokenFont) {
    context.font = tokenFont
    return
  }
  context.font = fallbackFont
}

export function GraphView({
  title = 'Entity Graph',
  subtitle,
  nodes = defaultNodes,
  edges = defaultEdges,
  className,
}: GraphViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, rect.width, rect.height)

      const rootStyle = getComputedStyle(document.documentElement)
      const borderColor = readToken(rootStyle, [
        '--inkblot-semantic-color-border-default',
        '--inkblot-semantic-color-border-strong',
      ])
      const textColor = readToken(rootStyle, [
        '--inkblot-semantic-color-text-tertiary',
        '--inkblot-semantic-color-text-secondary',
      ])
      const background = readToken(rootStyle, [
        '--inkblot-semantic-color-background-secondary',
        '--inkblot-semantic-color-background-primary',
      ])
      const highTone = readToken(rootStyle, [
        '--inkblot-semantic-color-status-success',
        '--inkblot-semantic-color-interactive-primary',
      ])
      const mediumTone = readToken(rootStyle, [
        '--inkblot-semantic-color-status-warning',
        '--inkblot-semantic-color-status-info',
      ])
      const lowTone = readToken(rootStyle, [
        '--inkblot-semantic-color-status-error',
        '--inkblot-semantic-color-status-warning',
      ])
      const bodySmallTypography = readToken(rootStyle, [
        '--inkblot-semantic-typography-body-small',
        '--inkblot-semantic-typography-body-medium',
      ])
      const bodyMediumTypography = readToken(rootStyle, [
        '--inkblot-semantic-typography-body-medium',
        '--inkblot-semantic-typography-body-small',
      ])
      const defaultCanvasFont = context.font

      edges.forEach((edge) => {
        const from = nodes.find((node) => node.id === edge.from)
        const to = nodes.find((node) => node.id === edge.to)
        if (!from || !to) {
          return
        }
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.strokeStyle = borderColor
        context.globalAlpha = Math.min(1, Math.max(0, edge.strength * 0.45))
        context.lineWidth = Math.max(1, edge.strength * 2)
        context.stroke()
        context.globalAlpha = 1
      })

      nodes.forEach((node) => {
        const color = scoreColor(node.score, highTone, mediumTone, lowTone)
        const radius = node.kind === 'org' ? 28 : 22

        context.beginPath()
        context.arc(node.x, node.y, radius + 8, 0, Math.PI * 2)
        context.fillStyle = color
        context.globalAlpha = 0.08
        context.fill()
        context.globalAlpha = 1

        context.beginPath()
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fillStyle = background
        context.strokeStyle = color
        context.globalAlpha = 0.7
        context.lineWidth = 1.5
        context.fill()
        context.stroke()
        context.globalAlpha = 1

        context.fillStyle = color
        applyTypography(context, bodySmallTypography, defaultCanvasFont)
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(node.kind === 'org' ? '⬡' : '●', node.x, node.y)

        context.fillStyle = textColor
        applyTypography(context, bodyMediumTypography, defaultCanvasFont)
        context.fillText(node.label, node.x, node.y + radius + 16)

        context.fillStyle = color
        context.globalAlpha = 0.8
        applyTypography(context, bodySmallTypography, defaultCanvasFont)
        context.fillText(String(node.score), node.x, node.y + radius + 28)
        context.globalAlpha = 1
      })
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [edges, nodes])

  const effectiveSubtitle = subtitle ?? `Relationship intelligence · ${nodes.length} nodes · ${edges.length} edges`

  return (
    <section className={cn('flex h-full flex-col', className)}>
      <header className="flex items-center justify-between border-b border-[var(--inkblot-semantic-color-border-default)] px-8 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--inkblot-semantic-color-text-primary)]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            {effectiveSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--inkblot-semantic-color-status-success)]" />
            Orgs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--inkblot-semantic-color-status-warning)]" />
            People
          </span>
        </div>
      </header>
      <div className="relative flex-1">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </section>
  )
}
