import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Brain, BarChart3, Network, Activity, Settings, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { ModuleErrorBoundary } from '../ModuleErrorBoundary'

export interface AppNavigationRailItem {
  id: string
  path: string
  icon: LucideIcon
  label: string
}

const DEFAULT_NAV_ITEMS: AppNavigationRailItem[] = [
  { id: 'home', path: '/', icon: ClipboardList, label: 'Home' },
  { id: 'intelligence', path: '/intelligence', icon: Brain, label: 'Intelligence' },
  { id: 'pipeline', path: '/pipeline', icon: BarChart3, label: 'Pipeline' },
  { id: 'graph', path: '/graph', icon: Network, label: 'Graph' },
  { id: 'events', path: '/events', icon: Activity, label: 'Events' },
  { id: 'settings', path: '/settings', icon: Settings, label: 'Settings' },
]

export interface AppNavigationRailProps {
  items?: AppNavigationRailItem[]
  brandLogo?: ReactNode
  brandTitle?: string
  className?: string
}

export function AppNavigationRail({
  items = DEFAULT_NAV_ITEMS,
  brandLogo,
  brandTitle = 'Command Canvas — AI-native Interface',
  className,
}: AppNavigationRailProps) {
  return (
    <ModuleErrorBoundary>
      <nav
        className={cn(
          'flex h-full flex-col gap-[var(--inkblot-spacing-4)] border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-3)]',
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-sm)]"
            title={brandTitle}
          >
            {brandLogo ?? (
              <Sparkles className="h-5 w-5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[var(--inkblot-spacing-2)]">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                aria-label={item.label}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-transparent px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-2)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] ${
                    isActive
                      ? 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-interactive-primary)]'
                      : 'text-[var(--inkblot-semantic-color-text-secondary)] hover:border-[var(--inkblot-semantic-color-border-default)]/60 hover:bg-[var(--inkblot-semantic-color-background-primary)]'
                  }`
                }
              >
                <Icon size={20} aria-hidden />
              </NavLink>
            )
          })}
        </div>
      </nav>
    </ModuleErrorBoundary>
  )
}
