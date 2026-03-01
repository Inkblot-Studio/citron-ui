import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface MainShellProps {
  navigation: ReactNode
  eventStream: ReactNode | null
  commandBar: ReactNode
  children: ReactNode
  className?: string
  eventStreamWidth?: string
}

export function MainShell({
  navigation,
  eventStream,
  commandBar,
  children,
  className,
  eventStreamWidth = 'w-80',
}: MainShellProps) {
  return (
    <div
      className={cn(
        'flex h-screen w-screen overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <aside className="flex h-full w-16 shrink-0 flex-col border-r border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]">
        {navigation}
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]">
            <div className="flex-1 overflow-auto px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-6)]">
              {children}
            </div>
            <div className="shrink-0 border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]">
              {commandBar}
            </div>
          </div>
          {eventStream && (
            <aside
              className={cn(
                'flex h-full shrink-0 flex-col border-l border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)]',
                eventStreamWidth
              )}
            >
              {eventStream}
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
