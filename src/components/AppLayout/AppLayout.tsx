import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { AppSidebar, type AppSidebarProps } from '../AppSidebar'
import { EventFeed, type EventFeedProps } from '../EventFeed'

export interface AppLayoutProps {
  children: ReactNode
  showEventFeed?: boolean
  sidebarProps?: Partial<AppSidebarProps>
  eventFeedProps?: Partial<EventFeedProps>
  className?: string
}

export function AppLayout({
  children,
  showEventFeed = false,
  sidebarProps,
  eventFeedProps,
  className,
}: AppLayoutProps) {
  return (
    <div
      className={cn(
        'flex h-screen w-full overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <AppSidebar {...sidebarProps} />
      <main className="flex flex-1 overflow-hidden">
        <section data-tour="canvas" className="flex-1 overflow-y-auto">
          {children}
        </section>
        {showEventFeed ? (
          <aside
            data-tour="event-feed"
            className="w-80 overflow-y-auto border-l border-[var(--inkblot-semantic-color-border-default)]"
          >
            <EventFeed {...eventFeedProps} />
          </aside>
        ) : null}
      </main>
    </div>
  )
}
