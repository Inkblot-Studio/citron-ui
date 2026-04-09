import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface IntegrationPlaceholderProps {
  name: string
  description: string
  icon?: ReactNode
  connected?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  className?: string
}

export function IntegrationPlaceholder({
  name,
  description,
  icon,
  connected = false,
  onConnect,
  onDisconnect,
  className,
}: IntegrationPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-lg)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-5)] shadow-[var(--inkblot-shadow-sm)]',
        className
      )}
    >
      <div className="flex items-start gap-[var(--inkblot-spacing-4)]">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)]',
            'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)]'
          )}
        >
          {icon ?? (
            <span className="h-5 w-5 rounded-full bg-[var(--inkblot-semantic-color-border-default)]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-4)]">
            {name}
          </h3>
          <p className="mt-[var(--inkblot-spacing-1)] text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {connected ? (
          <>
            <span className="inline-flex items-center gap-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-small)]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--inkblot-semantic-color-status-success)]" />
              <span className="text-[var(--inkblot-semantic-color-status-success)]">Connected</span>
            </span>
            {onDisconnect && (
              <button
                type="button"
                onClick={onDisconnect}
                className={cn(
                  'rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
                  'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
                  '[font:var(--inkblot-semantic-typography-body-small)]',
                  'transition-colors duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)]'
                )}
              >
                Disconnect
              </button>
            )}
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-small)]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--inkblot-semantic-color-text-tertiary)]" />
              <span className="text-[var(--inkblot-semantic-color-text-tertiary)]">Not connected</span>
            </span>
            {onConnect && (
              <button
                type="button"
                onClick={onConnect}
                className={cn(
                  'rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
                  'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
                  '[font:var(--inkblot-semantic-typography-body-small)]',
                  'transition-colors duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
                  'active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)]'
                )}
              >
                Connect
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
