import type { ReactNode } from 'react'
import {
  Activity,
  BarChart3,
  CheckSquare,
  Command,
  FileText,
  FlaskConical,
  GitBranch,
  Mail,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import { NavLink } from '../NavLink'

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
  className?: string
}

const defaultItems: AppSidebarItem[] = [
  { id: 'canvas', icon: MessageSquare, label: 'Canvas', path: '/', dataTour: 'nav-canvas' },
  { id: 'deals', icon: BarChart3, label: 'Deals', path: '/deals', dataTour: 'nav-deals' },
  { id: 'contacts', icon: Users, label: 'Contacts', path: '/contacts', dataTour: 'nav-contacts' },
  { id: 'graph', icon: GitBranch, label: 'Graph', path: '/graph', dataTour: 'nav-graph' },
  { id: 'events', icon: Activity, label: 'Events', path: '/events', dataTour: 'nav-events' },
  {
    id: 'campaigns',
    icon: Mail,
    label: 'Campaigns',
    path: '/campaigns',
    dataTour: 'nav-campaigns',
  },
  {
    id: 'invoices',
    icon: FileText,
    label: 'Invoices',
    path: '/invoices',
    dataTour: 'nav-invoices',
  },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks', path: '/tasks', dataTour: 'nav-tasks' },
  {
    id: 'automations',
    icon: Workflow,
    label: 'Automations',
    path: '/automations',
    dataTour: 'nav-automations',
  },
  { id: 'reports', icon: PieChart, label: 'Reports', path: '/reports', dataTour: 'nav-reports' },
  {
    id: 'intelligence',
    icon: FlaskConical,
    label: 'Intel Lab',
    path: '/intelligence',
    dataTour: 'nav-intelligence',
  },
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
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
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
        <span
          data-tour="system-status"
          className="mx-auto mt-2 h-2 w-2 rounded-full bg-[var(--inkblot-semantic-color-status-success)]"
          title="System Online"
        />
      </div>
    </aside>
  )
}
