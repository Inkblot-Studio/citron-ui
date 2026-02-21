import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface CommandInterfaceProps {
  promptValue?: string
  onPromptChange?: (value: string) => void
  onPromptSubmit?: () => void
  isProcessing?: boolean
  response?: ReactNode
  placeholder?: string
  className?: string
}

function AIAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[var(--inkblot-semantic-color-text-tertiary)]"
      />
      <path
        d="M8 12h2v2H8v-2zm6 0h2v2h-2v-2zM10 8l2 4 2-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--inkblot-semantic-color-text-secondary)]"
      />
    </svg>
  )
}

export function CommandInterface({
  promptValue = '',
  onPromptChange,
  onPromptSubmit,
  isProcessing = false,
  response,
  placeholder = 'Ask Citron Intelligence...',
  className,
}: CommandInterfaceProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onPromptSubmit?.()
    }
  }

  return (
    <div
      className={cn(
        'flex w-full max-w-2xl flex-col gap-8',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 items-center justify-center">
            <AIAvatar />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <textarea
              value={promptValue}
              onChange={(e) => onPromptChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={3}
              disabled={isProcessing}
              className={cn(
                'w-full resize-none rounded-[var(--inkblot-radius-xl)] bg-[var(--inkblot-semantic-color-background-primary)] p-4 text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] transition-shadow duration-[var(--inkblot-duration-fast)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                'shadow-[0_1px_3px_0_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.08)]',
                'disabled:cursor-not-allowed disabled:opacity-70'
              )}
            />
          </div>
        </div>
      </div>
      {isProcessing ? (
        <div
          className={cn(
            'min-h-[80px] animate-shimmer rounded-[var(--inkblot-radius-xl)] bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--inkblot-semantic-color-background-secondary)_0%,var(--inkblot-semantic-color-background-tertiary)_50%,var(--inkblot-semantic-color-background-secondary)_100%)]'
          )}
        />
      ) : response ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <AIAvatar />
            </div>
            <div className="min-w-0 flex-1 text-[var(--inkblot-semantic-color-text-primary)]">
              {response}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
