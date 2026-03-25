import type { ReactNode } from 'react'
import {
  CheckSquare,
  Command,
  FileText,
  Mail,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import { NavLink } from '../NavLink'
import { ThemeSwitcherButton } from '../ThemeSwitcherButton'

export interface AppSidebarItem {
  id: string
  icon: LucideIcon
  label: string
  path: string
  dataTour?: string
}

export interface AppSidebarProps {
  items?: AppSidebarItem[]
  bottomItems?: AppSidebarItem[]
  activePath?: string
  onNavigate?: (path: string) => void
  logo?: ReactNode
  /** When true the status dot at the bottom pulses with an animation. */
  showStatusDot?: boolean
  /** Renders the global theme toggle (moon/sun) next to bottom nav items. Requires ThemeProvider. */
  showThemeToggle?: boolean
  className?: string
}

const defaultItems: AppSidebarItem[] = [
  { id: 'canvas', icon: MessageSquare, label: 'Canvas', path: '/', dataTour: 'nav-canvas' },
  { id: 'invoices', icon: FileText, label: 'Invoices & Deals', path: '/invoices', dataTour: 'nav-invoices' },
  { id: 'contacts', icon: Users, label: 'Contacts', path: '/contacts', dataTour: 'nav-contacts' },
  { id: 'campaigns', icon: Mail, label: 'Campaigns', path: '/campaigns', dataTour: 'nav-campaigns' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks', path: '/tasks', dataTour: 'nav-tasks' },
]

const defaultBottomItems: AppSidebarItem[] = [
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings', dataTour: 'nav-settings' },
]

export function AppSidebar({
  items = defaultItems,
  bottomItems = defaultBottomItems,
  activePath = '/',
  onNavigate,
  logo,
  showStatusDot = true,
  showThemeToggle = true,
  className,
}: AppSidebarProps) {
  return (
    <aside
      data-tour="sidebar"
      className={cn(
        'flex h-full w-16 flex-col items-center gap-1 border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] py-4',
        className
      )}
    >
      <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)]">
        {logo ?? (
          <Command
            className="h-4 w-4 text-[var(--inkblot-semantic-color-text-inverse)]"
            aria-hidden
          />
        )}
      </div>
      <nav className="hide-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={item.path === activePath}
            onClick={() => onNavigate?.(item.path)}
            dataTour={item.dataTour}
          />
        ))}
      </nav>
      <div className="flex flex-col gap-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={item.path === activePath}
            onClick={() => onNavigate?.(item.path)}
            dataTour={item.dataTour}
          />
        ))}
        {showThemeToggle ? (
          <div className="group relative flex justify-center">
            <ThemeSwitcherButton className="h-10 w-10 min-h-0 min-w-0 shrink-0 rounded-[var(--inkblot-radius-md)]" />
            <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-[var(--inkblot-radius-sm)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-2 py-1 text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)] opacity-0 transition-opacity duration-[var(--inkblot-duration-fast)] group-hover:opacity-100">
              Theme
            </span>
          </div>
        ) : null}
        {showStatusDot ? (
          <span
            data-tour="system-status"
            className="mx-auto mt-2 h-2 w-2 animate-pulse rounded-full bg-[var(--inkblot-semantic-color-status-success)]"
            title="System Online"
          />
        ) : null}
      </div>
    </aside>
  )
}
