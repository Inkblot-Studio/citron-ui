import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Paperclip } from 'lucide-react'
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
    <div
      className={cn(
        'flex w-full max-w-2xl flex-col gap-8',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-start gap-2">
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
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)]',
                'hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
              aria-label="Adjuntar archivos"
            >
              <Paperclip
                size={20}
                strokeWidth={1.5}
                className="text-[var(--inkblot-semantic-color-text-tertiary)]"
                aria-hidden
              />
            </button>
            <textarea
              value={promptValue}
              onChange={(e) => onPromptChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={3}
              disabled={isProcessing}
              className={cn(
                'min-w-0 flex-1 resize-none rounded-[var(--inkblot-radius-xl)] bg-[var(--inkblot-semantic-color-background-primary)] p-4 text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] transition-shadow duration-[var(--inkblot-duration-fast)]',
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
          <div className="min-w-0 text-[var(--inkblot-semantic-color-text-primary)]">
            {response}
          </div>
        </div>
      ) : null}
    </div>
  )
}
