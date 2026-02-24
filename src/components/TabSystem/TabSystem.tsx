import { cn } from '../../utils/cn'

export interface TabItem {
  id: string
  label: string
}

export interface TabSystemProps {
  tabs: TabItem[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function TabSystem({
  tabs,
  activeTabId,
  onTabChange,
  className,
}: TabSystemProps) {
  return (
    <nav
      role="tablist"
      aria-label="Tabs"
      className={cn('flex gap-0 pt-[var(--inkblot-spacing-2)]', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative px-[var(--inkblot-spacing-5)] py-[var(--inkblot-spacing-4)]',
              '[font:var(--inkblot-semantic-typography-body-medium)]',
              'transition-colors duration-[var(--inkblot-duration-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
              isActive
                ? [
                    'font-semibold text-[var(--inkblot-semantic-color-text-primary)]',
                    'bg-[var(--inkblot-semantic-color-background-secondary)]',
                    'rounded-t-[var(--inkblot-radius-lg)]',
                  ]
                : [
                    'text-[var(--inkblot-semantic-color-text-secondary)]',
                    'hover:text-[var(--inkblot-semantic-color-text-primary)]',
                    'hover:bg-[var(--inkblot-semantic-color-background-secondary)]/50',
                  ]
            )}
          >
            {tab.label}
            {isActive ? (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--inkblot-semantic-color-interactive-primary)]"
                aria-hidden
              />
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
