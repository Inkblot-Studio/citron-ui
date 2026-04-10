import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { Loader2, Paperclip, Send, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { AttachmentPreviewRow, type PendingAttachment } from './AttachmentPreviewRow'

export type { PendingAttachment } from './AttachmentPreviewRow'

export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  renderedContent?: ReactNode
}

export interface GlobalAssistantChatProps {
  messages?: AssistantMessage[]
  onSend?: (payload: { text: string; files: File[] }) => void
  isProcessing?: boolean
  placeholder?: string
  emptyStateMessage?: string
  className?: string
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => {
      attachments.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
    }
    // Only on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed && attachments.length === 0) return
    if (isProcessing) return

    try {
      onSend?.({ text: trimmed, files: attachments.map((a) => a.file) })
    } catch {
      // Swallow errors from consumer callbacks to keep the chat functional
    }

    setInput('')
    setAttachments((prev) => {
      prev.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
      return []
    })

    requestAnimationFrame(() => {
      textareaRef.current?.focus()
    })
  }, [input, attachments, isProcessing, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [])

  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => {
      const removed = prev[index]
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }, [])

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

      {/* Input area — never disabled; isProcessing only prevents sending */}
      <div className="shrink-0 border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]">
        <div className="mx-auto max-w-4xl">
          <div
            className={cn(
              'overflow-hidden rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-sm)]',
            )}
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
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                className={cn(
                  'min-h-[2.25rem] min-w-0 flex-1 resize-none border-0 bg-transparent py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
                  'focus:outline-none focus:ring-0',
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
