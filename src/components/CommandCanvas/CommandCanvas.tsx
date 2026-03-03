import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { CanvasBlock } from '../CanvasContext'

export type CommandCanvasCardType = 'entity' | 'intelligence'

export interface CommandCanvasMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  cards?: CommandCanvasCardType[]
}

export interface CommandCanvasProps {
  title?: string
  subtitle?: string
  readyLabel?: string
  placeholder?: string
  footerText?: string
  /**
   * When provided, the canvas renders blocks from CanvasContext instead of the
   * built-in message list. Use `renderBlock` to customise how each block type
   * is rendered.
   */
  blocks?: CanvasBlock[]
  /** Custom renderer for each block type when using blocks mode. */
  renderBlock?: (block: CanvasBlock) => ReactNode
  messages?: CommandCanvasMessage[]
  initialMessages?: CommandCanvasMessage[]
  onMessagesChange?: (messages: CommandCanvasMessage[]) => void
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (value: string) => void
  autoAssistantResponse?: boolean
  assistantResponseDelayMs?: number
  isResponding?: boolean
  onRespondingChange?: (isResponding: boolean) => void
  onSend?: (value: string) => void
  generateAssistantMessage?: (value: string) => Omit<CommandCanvasMessage, 'id' | 'role'>
  renderCard?: (type: CommandCanvasCardType) => ReactNode
  /** When true, hides the built-in input bar. Useful when using RightPanel for input. */
  hideInput?: boolean
  className?: string
}

const defaultMessages: CommandCanvasMessage[] = [
  {
    id: '1',
    role: 'user',
    content: "Show me Acme Corp's profile and deal health.",
  },
  {
    id: '2',
    role: 'assistant',
    content: "Here's the entity profile and current intelligence scores for Acme Corp.",
    cards: ['entity', 'intelligence'],
  },
]

const fallbackCardClass =
  'rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]'

export function CommandCanvas({
  title = 'Command Canvas',
  subtitle = 'AI-native interface — results appear here',
  readyLabel = 'System ready',
  placeholder = 'Ask anything — deals, contacts, forecasts...',
  footerText = 'Citron OS v1.0 · AI-native Revenue & Operations Platform',
  blocks,
  renderBlock,
  messages,
  initialMessages = defaultMessages,
  onMessagesChange,
  inputValue,
  defaultInputValue = '',
  onInputValueChange,
  autoAssistantResponse = true,
  assistantResponseDelayMs = 700,
  isResponding,
  onRespondingChange,
  onSend,
  generateAssistantMessage,
  renderCard,
  hideInput = false,
  className,
}: CommandCanvasProps) {
  const [internalMessages, setInternalMessages] = useState<CommandCanvasMessage[]>(initialMessages)
  const [internalInput, setInternalInput] = useState(defaultInputValue)
  const [internalResponding, setInternalResponding] = useState(false)
  const responseTimeoutRef = useRef<number | null>(null)

  const isMessagesControlled = messages !== undefined
  const currentMessages = isMessagesControlled ? messages : internalMessages

  const isInputControlled = inputValue !== undefined
  const currentInput = isInputControlled ? inputValue : internalInput

  const isRespondingControlled = isResponding !== undefined
  const currentResponding = isRespondingControlled ? isResponding : internalResponding

  const canSend = currentInput.trim().length > 0 && !currentResponding

  const defaultAssistantFactory = useMemo(
    () => (value: string): Omit<CommandCanvasMessage, 'id' | 'role'> => ({
      content: `Analyzing "${value}". Here are the latest insights.`,
      cards: ['entity', 'intelligence'],
    }),
    []
  )

  const setMessages = (nextMessages: CommandCanvasMessage[]) => {
    if (!isMessagesControlled) {
      setInternalMessages(nextMessages)
    }
    onMessagesChange?.(nextMessages)
  }

  const setInput = (nextInput: string) => {
    if (!isInputControlled) {
      setInternalInput(nextInput)
    }
    onInputValueChange?.(nextInput)
  }

  const setResponding = (nextResponding: boolean) => {
    if (!isRespondingControlled) {
      setInternalResponding(nextResponding)
    }
    onRespondingChange?.(nextResponding)
  }

  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current !== null) {
        window.clearTimeout(responseTimeoutRef.current)
      }
    }
  }, [])

  const handleSend = () => {
    const value = currentInput.trim()
    if (!value) {
      return
    }

    const newUser: CommandCanvasMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: value,
    }

    const nextMessages = [...currentMessages, newUser]
    setMessages(nextMessages)
    setInput('')
    onSend?.(value)

    if (!autoAssistantResponse) {
      return
    }

    setResponding(true)
    responseTimeoutRef.current = window.setTimeout(() => {
      const nextAssistant = (generateAssistantMessage ?? defaultAssistantFactory)(value)
      const updatedMessages = [
        ...nextMessages,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant' as const,
          content: nextAssistant.content,
          cards: nextAssistant.cards,
        },
      ]
      setMessages(updatedMessages)
      setResponding(false)
    }, assistantResponseDelayMs)
  }

  const isBlocksMode = blocks !== undefined

  const defaultBlockRenderer = (block: CanvasBlock): ReactNode => {
    if (block.type === 'text') {
      return (
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/15">
            <Sparkles className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
          </div>
          <p className="pt-0.5 text-sm leading-relaxed text-[var(--inkblot-semantic-color-text-secondary)]">
            {block.content}
          </p>
        </div>
      )
    }
    if (block.type === 'entity') {
      return renderCard ? renderCard('entity') : (
        <div className={fallbackCardClass}>Entity card preview</div>
      )
    }
    if (block.type === 'intelligence') {
      return renderCard ? renderCard('intelligence') : (
        <div className={fallbackCardClass}>Intelligence card preview</div>
      )
    }
    if (block.type === 'loading') {
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/15">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--inkblot-semantic-color-text-tertiary)]" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--inkblot-semantic-color-text-tertiary)]" style={{ animationDelay: '150ms' }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--inkblot-semantic-color-text-tertiary)]" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <section className={cn('flex h-full flex-col', className)}>
      <header className="flex items-center justify-between border-b border-[var(--inkblot-semantic-color-border-default)] px-8 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--inkblot-semantic-color-text-primary)]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--inkblot-semantic-color-status-success)]" />
          {readyLabel}
        </div>
      </header>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {isBlocksMode
            ? blocks.map((block) => (
                <div key={block.id}>
                  {renderBlock ? renderBlock(block) : defaultBlockRenderer(block)}
                </div>
              ))
            : currentMessages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-md rounded-2xl rounded-br-sm bg-[var(--inkblot-semantic-color-interactive-secondary)] px-4 py-2.5 text-sm leading-relaxed text-[var(--inkblot-semantic-color-text-primary)]">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/15">
                        <Sparkles
                          className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-interactive-primary)]"
                          aria-hidden
                        />
                      </div>
                      <p className="pt-0.5 text-sm leading-relaxed text-[var(--inkblot-semantic-color-text-secondary)]">
                        {message.content}
                      </p>
                    </div>
                    {message.cards?.length ? (
                      <div className="ml-9 grid gap-4">
                        {message.cards.map((cardType) =>
                          renderCard ? (
                            <div key={cardType}>{renderCard(cardType)}</div>
                          ) : (
                            <div key={cardType} className={fallbackCardClass}>
                              {cardType === 'entity' ? 'Entity card preview' : 'Intelligence card preview'}
                            </div>
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                )
              )}
        </div>
      </div>

      {!hideInput && !isBlocksMode ? (
        <footer className="border-t border-[var(--inkblot-semantic-color-border-default)] px-8 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]" />
              <input
                type="text"
                value={currentInput}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSend()
                  }
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className="flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-opacity duration-[var(--inkblot-duration-fast)] disabled:opacity-35"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]">
              {footerText}
            </p>
          </div>
        </footer>
      ) : (
        <footer className="border-t border-[var(--inkblot-semantic-color-border-default)] px-8 py-3">
          <p className="text-center text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]">
            {footerText}
          </p>
        </footer>
      )}
    </section>
  )
}
