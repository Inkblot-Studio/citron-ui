import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { AppSidebar, type AppSidebarProps } from '../AppSidebar'
import { EventFeed, type EventFeedProps } from '../EventFeed'
import { RightPanel, type RightPanelProps } from '../RightPanel'
import { CanvasProvider, type CanvasProviderProps } from '../CanvasContext'

export interface AppLayoutProps {
  children: ReactNode
  /** @deprecated Use `showRightPanel` instead. */
  showEventFeed?: boolean
  /** Shows the AI chat + events right panel. */
  showRightPanel?: boolean
  sidebarProps?: Partial<AppSidebarProps>
  eventFeedProps?: Partial<EventFeedProps>
  rightPanelProps?: Partial<RightPanelProps>
  canvasProviderProps?: Partial<CanvasProviderProps>
  className?: string
}

export function AppLayout({
  children,
  showEventFeed = false,
  showRightPanel = false,
  sidebarProps,
  eventFeedProps,
  rightPanelProps,
  canvasProviderProps,
  className,
}: AppLayoutProps) {
  const showPanel = showRightPanel || showEventFeed

  const content = (
    <div
      className={cn(
        'flex h-screen w-full overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <AppSidebar {...sidebarProps} />
      <main className="flex flex-1 overflow-hidden">
        <section data-tour="canvas" className="hide-scrollbar flex-1 overflow-y-auto">
          {children}
        </section>
        {showPanel ? (
          <aside
            data-tour="right-panel"
            className="flex w-80 flex-col overflow-hidden border-l border-[var(--inkblot-semantic-color-border-default)]"
          >
            {showRightPanel ? (
              <RightPanel
                renderEventsTab={() => <EventFeed {...eventFeedProps} />}
                {...rightPanelProps}
              />
            ) : (
              <EventFeed {...eventFeedProps} />
            )}
          </aside>
        ) : null}
      </main>
    </div>
  )

  if (showRightPanel) {
    return <CanvasProvider {...canvasProviderProps}>{content}</CanvasProvider>
  }

  return content
}
