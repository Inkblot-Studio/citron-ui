import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { AppSidebar, type AppSidebarProps } from '../AppSidebar'
import { EventFeed, type EventFeedProps } from '../EventFeed'
import { CanvasProvider, type CanvasProviderProps } from '../CanvasContext'

export interface AppLayoutProps {
  children: ReactNode
  showEventFeed?: boolean
  sidebarProps?: Partial<AppSidebarProps>
  eventFeedProps?: Partial<EventFeedProps>
  canvasProviderProps?: Partial<CanvasProviderProps>
  className?: string
}

export function AppLayout({
  children,
  showEventFeed = false,
  sidebarProps,
  eventFeedProps,
  canvasProviderProps,
  className,
}: AppLayoutProps) {
  const content = (
    <div
      className={cn(
        'flex h-screen w-full overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]',
        className,
      )}
    >
      <AppSidebar {...sidebarProps} />
      <main className="flex flex-1 overflow-hidden">
        <section data-tour="canvas" className="hide-scrollbar flex-1 overflow-y-auto">
          {children}
        </section>
        {showEventFeed && (
          <aside
            data-tour="event-feed"
            className="flex w-80 flex-col overflow-hidden border-l border-[var(--inkblot-semantic-color-border-default)]"
          >
            <EventFeed {...eventFeedProps} />
          </aside>
        )}
      </main>
    </div>
  )

  if (canvasProviderProps) {
    return <CanvasProvider {...canvasProviderProps}>{content}</CanvasProvider>
  }

  return content
}
