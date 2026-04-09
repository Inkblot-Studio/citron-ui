import { useState, useRef, useEffect, type ReactNode } from 'react'
import { FileText, Loader2, Paperclip, Send, Sparkles, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  renderedContent?: ReactNode
}

export interface PendingAttachment {
  file: File
  kind: 'image' | 'file'
  previewUrl?: string
}

export interface GlobalAssistantChatProps {
  messages?: AssistantMessage[]
  onSend?: (payload: { text: string; files: File[] }) => void
  isProcessing?: boolean
  placeholder?: string
  emptyStateMessage?: string
  className?: string
}

function AttachmentPreviewRow({
  attachments,
  onRemove,
}: {
  attachments: PendingAttachment[]
  onRemove: (index: number) => void
}) {
  if (attachments.length === 0) return null

  return (
    <div className="flex flex-wrap gap-[var(--inkblot-spacing-2)] px-[var(--inkblot-spacing-2)] pb-[var(--inkblot-spacing-2)]">
      {attachments.map((att, i) => (
        <div
          key={`${att.file.name}-${i}`}
          className="group relative flex items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]"
        >
          {att.kind === 'image' && att.previewUrl ? (
            <img
              src={att.previewUrl}
              alt={att.file.name}
              className="h-8 w-8 rounded-[var(--inkblot-radius-sm)] object-cover"
            />
          ) : (
            <FileText
              size={16}
              className="shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]"
              aria-hidden
            />
          )}
          <span className="max-w-[8rem] truncate text-xs text-[var(--inkblot-semantic-color-text-secondary)]">
            {att.file.name}
          </span>
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="flex h-4 w-4 items-center justify-center rounded-[var(--inkblot-radius-full)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
            aria-label={`Remove ${att.file.name}`}
          >
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  )
}

export function GlobalAssistantChat({
  messages = [],
  onSend,
  isProcessing = false,
  placeholder = 'Ask Citron Intelligence...',
  emptyStateMessage = 'Ask anything — deals, contacts, forecasts...',
  className,
}: GlobalAssistantChatProps) {
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<PendingAttachment[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if ((!trimmed && attachments.length === 0) || isProcessing) return
    onSend?.({ text: trimmed, files: attachments.map((a) => a.file) })
    setInput('')
    setAttachments((prev) => {
      prev.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
      return []
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: PendingAttachment[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith('image/')
      return {
        file,
        kind: isImage ? 'image' : 'file',
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      }
    })
    setAttachments((prev) => [...prev, ...newAttachments])
    e.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const removed = prev[index]
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col bg-[var(--inkblot-semantic-color-background-primary)]',
        className,
      )}
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Sparkles
              className="mx-auto mb-[var(--inkblot-spacing-2)] h-5 w-5 text-[var(--inkblot-semantic-color-text-tertiary)]"
              aria-hidden
            />
            <p className="[font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-tertiary)]">
              {emptyStateMessage}
            </p>
          </div>
        </div>
      ) : (
        <div ref={feedRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-[var(--inkblot-spacing-4)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-6)]">
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-[var(--inkblot-radius-xl)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-inverse)]">
                    {msg.renderedContent ?? msg.content}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start gap-[var(--inkblot-spacing-2)]">
                  <Sparkles
                    size={16}
                    strokeWidth={1.7}
                    className="mt-[var(--inkblot-spacing-1)] shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]"
                    aria-hidden
                  />
                  <div className="max-w-[90%] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-primary)]">
                    {msg.renderedContent ?? msg.content}
                  </div>
                </div>
              ),
            )}

            {isProcessing && (
              <div className="flex items-start gap-[var(--inkblot-spacing-2)]">
                <Loader2
                  size={16}
                  strokeWidth={1.7}
                  className="mt-[var(--inkblot-spacing-1)] shrink-0 animate-spin text-[var(--inkblot-semantic-color-text-tertiary)]"
                  aria-hidden
                />
                <p className="[font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-tertiary)]">
                  Thinking...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="shrink-0 border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]">
        <div className="mx-auto max-w-4xl">
          <div
            className={cn(
              'overflow-hidden rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-sm)]',
              isProcessing && 'pointer-events-none',
            )}
            aria-busy={isProcessing}
          >
            <div className="flex items-end gap-[var(--inkblot-spacing-2)] p-[var(--inkblot-spacing-2)]">
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
                  'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                  'disabled:pointer-events-none disabled:opacity-[var(--inkblot-opacity-disabled)]',
                )}
                aria-label="Attach files"
              >
                <Paperclip size={18} strokeWidth={1.7} aria-hidden />
              </button>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                disabled={isProcessing}
                className={cn(
                  'min-h-[2.25rem] min-w-0 flex-1 resize-none border-0 bg-transparent py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
                  'focus:outline-none focus:ring-0',
                  'disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
                )}
              />

              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {isProcessing ? (
                  <div className="flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)]">
                    <Loader2
                      size={16}
                      strokeWidth={2}
                      className="animate-spin text-[var(--inkblot-semantic-color-text-inverse)]"
                      aria-hidden
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSend}
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-[background,box-shadow] duration-[var(--inkblot-duration-fast)]',
                      'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                    )}
                    aria-label="Send"
                  >
                    <Send size={16} strokeWidth={2} aria-hidden />
                  </button>
                )}
              </div>
            </div>

            <AttachmentPreviewRow attachments={attachments} onRemove={removeAttachment} />
          </div>
        </div>
      </div>
    </div>
  )
}
