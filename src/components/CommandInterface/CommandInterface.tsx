import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Loader2, Paperclip, Send, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CommandInterfaceProps {
  promptValue?: string
  onPromptChange?: (value: string) => void
  onPromptSubmit?: () => void
  onFilesAttach?: (files: File[]) => void
  isProcessing?: boolean
  response?: ReactNode
  placeholder?: string
  accept?: string
  multiple?: boolean
  className?: string
}

export function CommandInterface({
  promptValue = '',
  onPromptChange,
  onPromptSubmit,
  onFilesAttach,
  isProcessing = false,
  response,
  placeholder = 'Ask Citron Intelligence...',
  accept,
  multiple = true,
  className,
}: CommandInterfaceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onPromptSubmit?.()
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFilesAttach) {
      onFilesAttach(Array.from(files))
    }
    e.target.value = ''
  }

  return (
    <div className={cn('flex w-full max-w-[80rem] flex-col gap-[var(--inkblot-spacing-3)]', className)}>
      <div
        className={cn(
          'flex items-end gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-2)] shadow-[var(--inkblot-shadow-sm)]',
          isProcessing && 'pointer-events-none'
        )}
        aria-busy={isProcessing}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="sr-only"
          aria-hidden
        />
        <button
          type="button"
          onClick={handleAttachClick}
          disabled={isProcessing}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
            'hover:border-[var(--inkblot-semantic-color-border-strong)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-secondary)]',
            'disabled:pointer-events-none disabled:opacity-[var(--inkblot-opacity-disabled)]'
          )}
          aria-label="Adjuntar archivos"
        >
          <Paperclip size={18} strokeWidth={1.7} aria-hidden />
        </button>
        <div className="relative flex min-w-0 flex-1 items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]">
          <Sparkles
            size={18}
            strokeWidth={1.7}
            className="shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]"
            aria-hidden
          />
          <textarea
            value={promptValue}
            onChange={(e) => onPromptChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={2}
            disabled={isProcessing}
            className={cn(
              'min-h-[2.5rem] min-w-0 flex-1 resize-none border-0 bg-transparent py-0 pr-[var(--inkblot-spacing-12)] [font:var(--inkblot-semantic-typography-body-medium)] text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
              'focus:outline-none focus:ring-0',
              'disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]'
            )}
          />
          <div
            className={cn(
              'absolute bottom-[var(--inkblot-spacing-2)] right-[var(--inkblot-spacing-2)] flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-full)]',
              isProcessing ? 'bg-[var(--inkblot-semantic-color-interactive-primary)]' : ''
            )}
          >
            {isProcessing ? (
              <Loader2
                size={16}
                strokeWidth={2}
                className="animate-spin text-[var(--inkblot-semantic-color-text-inverse)]"
                aria-hidden
              />
            ) : (
              <button
                type="button"
                onClick={onPromptSubmit}
                disabled={isProcessing}
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-[background,box-shadow] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                  'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]'
                )}
                aria-label="Enviar"
              >
                <Send size={16} strokeWidth={2} aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>
      {response ? (
        <div className="rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)]">
          <div className="min-w-0 [font:var(--inkblot-semantic-typography-body-medium)] text-[var(--inkblot-semantic-color-text-primary)]">
            {response}
          </div>
        </div>
      ) : null}
    </div>
  )
}
