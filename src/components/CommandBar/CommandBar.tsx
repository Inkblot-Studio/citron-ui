import { useRef } from 'react'
import { Loader2, Paperclip, Send, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CommandBarProps {
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: () => void
  onFilesAttach?: (files: File[]) => void
  isProcessing: boolean
  placeholder?: string
  subtitle?: string
  className?: string
}

export function CommandBar({
  prompt,
  onPromptChange,
  onSubmit,
  onFilesAttach,
  isProcessing,
  placeholder = 'Ask anything — deals, contacts, forecasts...',
  subtitle = 'Citron OS v1.0 — AI-native Revenue & Operations Platform',
  className,
}: CommandBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFilesAttach) {
      onFilesAttach(Array.from(files))
    }
    e.target.value = ''
  }

  return (
    <div
      className={cn(
        'border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-4)]',
        className,
      )}
    >
      <div className="flex items-start gap-[var(--inkblot-spacing-3)]">
        <div className="mt-[var(--inkblot-spacing-1)] flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)]">
          <Sparkles className="h-5 w-5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
        </div>
        <div className="flex-1">
          <div
            className={cn(
              'flex items-end gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-2)] shadow-[var(--inkblot-shadow-sm)]',
              isProcessing && 'pointer-events-none',
            )}
            aria-busy={isProcessing}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="sr-only"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)]',
                'hover:border-[var(--inkblot-semantic-color-border-strong)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-secondary)]',
                'disabled:pointer-events-none disabled:opacity-[var(--inkblot-opacity-disabled)]',
              )}
              aria-label="Attach files"
            >
              <Paperclip size={18} strokeWidth={1.7} aria-hidden />
            </button>

            <textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={isProcessing}
              className={cn(
                'min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
                'focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
              )}
            />

            <div className="flex h-9 w-9 shrink-0 items-center justify-center">
              {isProcessing ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)]">
                  <Loader2 size={16} strokeWidth={2} className="animate-spin text-[var(--inkblot-semantic-color-text-inverse)]" aria-hidden />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-[background,box-shadow] duration-[var(--inkblot-duration-fast)]',
                    'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-secondary)]',
                  )}
                  aria-label="Send"
                >
                  <Send size={16} strokeWidth={2} aria-hidden />
                </button>
              )}
            </div>
          </div>
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
