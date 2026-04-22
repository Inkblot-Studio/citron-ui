import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDown, Loader2, Mic, Paperclip, Send, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { AttachmentPreviewRow, type PendingAttachment } from '../GlobalAssistantChat/AttachmentPreviewRow'

export interface CenteredAIChatAgent {
  id: string
  label: string
  description?: string
}

export interface CenteredAIChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  renderedContent?: ReactNode
}

export interface CenteredAIChatComposePayload {
  text: string
  files: File[]
}

export interface CenteredAIChatProps {
  messages?: CenteredAIChatMessage[]
  /**
   * Same shape as `GlobalAssistantChat`: text and files in one callback.
   */
  onSend?: (payload: { text: string; files: File[] }) => void
  /**
   * When set, used on submit instead of `onSend` (same payload shape).
   */
  onComposeSubmit?: (payload: CenteredAIChatComposePayload) => void
  isProcessing?: boolean
  placeholder?: string
  agents?: CenteredAIChatAgent[]
  activeAgent?: string
  onAgentChange?: (agentId: string) => void
  /**
   * Only if neither `onSend` nor `onComposeSubmit`: called with files on send (text has no handler).
   * @deprecated Prefer `onSend` with `{ text, files }`.
   */
  onFilesAttach?: (files: File[]) => void
  onVoiceClick?: () => void
  emptyStateMessage?: string
  className?: string
}

export function CenteredAIChat({
  messages = [],
  onSend,
  onComposeSubmit,
  isProcessing = false,
  placeholder = 'Ask Citron Intelligence...',
  agents,
  activeAgent,
  onAgentChange,
  onFilesAttach,
  onVoiceClick,
  emptyStateMessage = 'Ask anything — deals, contacts, forecasts...',
  className,
}: CenteredAIChatProps) {
  const [input, setInput] = useState('')
  const [agentOpen, setAgentOpen] = useState(false)
  const [attachments, setAttachments] = useState<PendingAttachment[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /** Attach is allowed unless a send is in flight (same rule as `GlobalAssistantChat`). */
  const attachDisabled = isProcessing

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (!agentOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAgentOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [agentOpen])

  const attachmentsRef = useRef(attachments)
  attachmentsRef.current = attachments

  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
    }
  }, [])

  const clearAttachments = () => {
    setAttachments((prev) => {
      prev.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
      return []
    })
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const removed = prev[index]
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }

  const flushSend = (trimmed: string, files: File[]) => {
    try {
      if (onComposeSubmit) {
        onComposeSubmit({ text: trimmed, files })
      } else if (onSend) {
        onSend({ text: trimmed, files })
      } else if (files.length > 0) {
        onFilesAttach?.(files)
      }
    } catch {
      // Same as GlobalAssistantChat: never break the UI if the consumer throws
    }
    clearAttachments()
    setInput('')
    requestAnimationFrame(() => {
      textareaRef.current?.focus()
    })
  }

  const handleSend = () => {
    if (isProcessing) return
    const trimmed = input.trim()
    const files = attachments.map((a) => a.file)
    if (!trimmed && files.length === 0) return
    flushSend(trimmed, files)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length || attachDisabled) {
      e.target.value = ''
      return
    }
    const next: PendingAttachment[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith('image/')
      return {
        file,
        kind: isImage ? 'image' : 'file',
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      }
    })
    setAttachments((prev) => [...prev, ...next])
    e.target.value = ''
  }

  const selectedAgent = agents?.find((a) => a.id === activeAgent)
  const trimmedInput = input.trim()
  const hasAttachments = attachments.length > 0
  const canSubmit = !isProcessing && (Boolean(trimmedInput) || hasAttachments)

  const surfaceClass = 'bg-[var(--inkblot-semantic-color-background-primary)]'

  return (
    <div className={cn('flex h-full min-h-0 flex-col', surfaceClass, className)}>
      {messages.length === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center px-[var(--inkblot-spacing-4)]">
          <p className="text-center [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-tertiary)]">
            {emptyStateMessage}
          </p>
        </div>
      ) : (
        <div
          ref={feedRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[var(--inkblot-spacing-4)] pt-[var(--inkblot-spacing-4)]"
        >
          <div className="mx-auto mt-auto flex w-full max-w-3xl flex-col gap-[var(--inkblot-spacing-4)] pb-[var(--inkblot-spacing-4)]">
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
              )
            )}
          </div>
        </div>
      )}

      <div
        className={cn(
          'shrink-0 px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
          surfaceClass,
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-3xl flex-col gap-[var(--inkblot-spacing-2)]',
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

          <div className="flex flex-col overflow-hidden rounded-3xl border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] shadow-[var(--inkblot-shadow-sm)]">
            <AttachmentPreviewRow attachments={attachments} onRemove={removeAttachment} />

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={isProcessing}
              className={cn(
                'h-10 min-h-10 max-h-10 w-full resize-none overflow-x-auto overflow-y-hidden whitespace-nowrap border-0 bg-transparent px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] [font:var(--inkblot-semantic-typography-body-default)] text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
                'focus:outline-none focus:ring-0',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            />
          </div>

          <div
            className={cn(
              'flex items-center gap-[var(--inkblot-spacing-2)] pt-[var(--inkblot-spacing-1)]',
              agents && agents.length > 0 ? 'justify-between' : 'justify-end',
            )}
          >
            {agents && agents.length > 0 && (
              <div ref={dropdownRef} className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setAgentOpen((o) => !o)}
                  className={cn(
                    'flex max-w-full items-center gap-[var(--inkblot-spacing-1)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)] [font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-secondary)] transition-colors duration-[var(--inkblot-duration-fast)]',
                    'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
                  )}
                >
                  <Sparkles size={14} strokeWidth={1.7} aria-hidden />
                  <span className="truncate">{selectedAgent?.label ?? 'Select agent'}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.7}
                    className={cn(
                      'shrink-0 transition-transform duration-[var(--inkblot-duration-fast)]',
                      agentOpen && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>

                {agentOpen && (
                  <div className="absolute bottom-full left-0 z-10 mb-[var(--inkblot-spacing-1)] min-w-[12rem] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-1)] shadow-[var(--inkblot-shadow-sm)]">
                    {agents.map((agent) => (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => {
                          onAgentChange?.(agent.id)
                          setAgentOpen(false)
                        }}
                        className={cn(
                          'flex w-full flex-col gap-0.5 rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] text-left transition-colors duration-[var(--inkblot-duration-fast)]',
                          agent.id === activeAgent
                            ? 'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-primary)]'
                            : 'text-[var(--inkblot-semantic-color-text-secondary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
                        )}
                      >
                        <span className="[font:var(--inkblot-semantic-typography-body-small)]">{agent.label}</span>
                        {agent.description && (
                          <span className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
                            {agent.description}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex shrink-0 items-center gap-[var(--inkblot-spacing-2)]">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachDisabled}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                  'disabled:pointer-events-none disabled:opacity-50',
                )}
                aria-label="Attach files"
              >
                <Paperclip size={18} strokeWidth={1.7} aria-hidden />
              </button>

              <button
                type="button"
                onClick={() => onVoiceClick?.()}
                disabled={isProcessing}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-[background,border-color,color] duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] hover:text-[var(--inkblot-semantic-color-text-secondary)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                  'disabled:pointer-events-none disabled:opacity-50',
                )}
                aria-label="Voice input"
              >
                <Mic size={18} strokeWidth={1.7} aria-hidden />
              </button>

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
                    disabled={!canSubmit}
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-[background,box-shadow] duration-[var(--inkblot-duration-fast)]',
                      'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
                      'disabled:pointer-events-none disabled:opacity-40',
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
      </div>
    </div>
  )
}
