import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Sparkles, Loader2, Send, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ModuleAssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  renderedContent?: ReactNode
}

export interface ModuleAssistantPanelProps {
  moduleId: string
  moduleLabel: string
  agentLabel?: string
  messages?: ModuleAssistantMessage[]
  onSend?: (content: string) => void
  isProcessing?: boolean
  placeholder?: string
  onClose?: () => void
  className?: string
}

export function ModuleAssistantPanel({
  moduleLabel,
  agentLabel = 'Module Assistant',
  messages = [],
  onSend,
  isProcessing = false,
  placeholder = 'Ask a question...',
  onClose,
  className,
}: ModuleAssistantPanelProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isProcessing])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col border-l border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--inkblot-semantic-color-text-primary)]">
            {moduleLabel}
          </p>
          <p className="truncate text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            {agentLabel}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-[var(--inkblot-spacing-2)] flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
            aria-label="Close assistant panel"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]">
        {messages.length === 0 && !isProcessing ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Sparkles className="mx-auto mb-[var(--inkblot-spacing-2)] h-5 w-5 text-[var(--inkblot-semantic-color-text-tertiary)]" />
              <p className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
                Ask anything about {moduleLabel}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-[var(--inkblot-spacing-3)]">
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-[var(--inkblot-radius-lg)] rounded-br-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] shadow-[var(--inkblot-shadow-sm)]">
                    <p className="[font:var(--inkblot-semantic-typography-body-small)] text-white">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start gap-[var(--inkblot-spacing-2)]">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-background-secondary)]">
                    <Sparkles className="h-3 w-3 text-[var(--inkblot-semantic-color-interactive-primary)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {msg.renderedContent ?? (
                      <p className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-secondary)]">
                        {msg.content}
                      </p>
                    )}
                  </div>
                </div>
              ),
            )}

            {isProcessing && (
              <div className="flex items-start gap-[var(--inkblot-spacing-2)]">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-background-secondary)]">
                  <Loader2 className="h-3 w-3 animate-spin text-[var(--inkblot-semantic-color-interactive-primary)]" />
                </div>
                <p className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
                  Thinking...
                </p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-3)]">
        <div className="flex items-end gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] transition-colors duration-[var(--inkblot-duration-fast)] focus-within:border-[var(--inkblot-semantic-color-border-focus)]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="max-h-24 min-h-[1.5rem] flex-1 resize-none bg-transparent [font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-primary)] outline-none placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-full)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-white transition-opacity duration-[var(--inkblot-duration-fast)] hover:opacity-90 disabled:opacity-30"
            aria-label="Send message"
          >
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
