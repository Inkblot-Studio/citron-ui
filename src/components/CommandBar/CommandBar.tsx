import { Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { CommandInterface } from '../CommandInterface'

export interface CommandBarProps {
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: () => void
  isProcessing: boolean
  placeholder?: string
  subtitle?: string
  className?: string
}

export function CommandBar({
  prompt,
  onPromptChange,
  onSubmit,
  isProcessing,
  placeholder = 'Ask anything — deals, contacts, forecasts...',
  subtitle = 'Citron OS v1.0 — AI-native Revenue & Operations Platform',
  className,
}: CommandBarProps) {
  return (
    <div
      className={cn(
        'border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-4)]',
        className
      )}
    >
      <div className="flex items-start gap-[var(--inkblot-spacing-3)]">
        <div className="mt-[var(--inkblot-spacing-1)] flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)]">
          <Sparkles className="h-5 w-5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
        </div>
        <div className="flex-1">
          <CommandInterface
            promptValue={prompt}
            onPromptChange={onPromptChange}
            onPromptSubmit={onSubmit}
            isProcessing={isProcessing}
            placeholder={placeholder}
          />
        </div>
      </div>
      {subtitle && (
        <p className="mt-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
