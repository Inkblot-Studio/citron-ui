import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { CommandInterface } from '../CommandInterface'
import { EntityCard } from '../EntityCard'
import { EventRow } from '../EventRow'
import { ModuleSkeleton } from '../Skeleton'
import type { CitronEvent } from '../EventRow'
import type { GraphNode, ChatMessage } from '../../types'

export interface ChatFeedProps {
  entities: GraphNode[]
  events: CitronEvent[]
  onFocusEntity?: (entity: GraphNode) => void
  findEntity?: (name: string) => GraphNode | null
  placeholder?: string
  emptyMessage?: string
  className?: string
}

function detectIntent(query: string): 'entity' | 'event' | 'general' {
  const lower = query.toLowerCase()
  if (lower.includes('entity') || lower.includes('company') || lower.includes('person') || lower.includes('deal') || lower.includes('profile') || lower.includes('org')) {
    return 'entity'
  }
  if (lower.includes('event') || lower.includes('activity') || lower.includes('recent') || lower.includes('stream') || lower.includes('log')) {
    return 'event'
  }
  return 'general'
}

function GeneratedEntityUI({ entities }: { entities: GraphNode[] }) {
  const entity = entities[0]
  if (!entity) return null
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Here&apos;s the entity profile and current intelligence scores:
      </p>
      <EntityCard
        name={entity.name}
        entityType={entity.type}
        metadata={entity.metadata}
        edges={[
          { type: 'WORKS_WITH', target: entities[1]?.name },
          { type: 'MANAGES', target: entities[4]?.name },
        ]}
      />
    </div>
  )
}

function GeneratedEventUI({ events }: { events: CitronEvent[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Latest activity from the event bus:
      </p>
      {events.slice(0, 5).map((evt) => (
        <EventRow key={evt.id ?? `${evt.actor}-${evt.subject}-${evt.timestamp}`} event={evt} />
      ))}
    </div>
  )
}

function GeneratedGeneralUI() {
  return (
    <p className="text-sm text-[var(--inkblot-semantic-color-text-primary)]">
      Revenue confidence is trending upward at 78%. Momentum score increased 12% this week driven by 3 new meetings with Acme Corp. Churn risk remains low at 15% across the active pipeline.
    </p>
  )
}

export function ChatFeed({
  entities,
  events,
  onFocusEntity,
  findEntity,
  placeholder = 'Ask anything — deals, contacts, forecasts...',
  emptyMessage = 'Escribe para comenzar...',
  className,
}: ChatFeedProps) {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedUI, setGeneratedUI] = useState<Map<string, ReactNode>>(new Map())
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages, isProcessing])

  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim()
    if (!trimmed || isProcessing) return

    const matchedEntity = findEntity?.(trimmed)
    if (matchedEntity && onFocusEntity) {
      onFocusEntity(matchedEntity)
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    }

    const intent = detectIntent(trimmed)

    setMessages((prev) => [...prev, userMsg])
    setPrompt('')
    setIsProcessing(true)

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-res`,
        role: 'assistant',
        content: '',
        intent,
        timestamp: new Date().toISOString(),
      }

      let ui: ReactNode
      switch (intent) {
        case 'entity':
          ui = <GeneratedEntityUI entities={entities} />
          break
        case 'event':
          ui = <GeneratedEventUI events={events} />
          break
        default:
          ui = <GeneratedGeneralUI />
      }

      setGeneratedUI((prev) => {
        const next = new Map(prev)
        next.set(assistantMsg.id, ui)
        return next
      })
      setMessages((prev) => [...prev, assistantMsg])
      setIsProcessing(false)
    }, 1000)
  }, [prompt, isProcessing, entities, events, onFocusEntity, findEntity])

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div ref={feedRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !isProcessing ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <p className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">{emptyMessage}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-2">
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-4 py-3 text-sm text-[var(--inkblot-semantic-color-text-primary)]">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="max-w-[90%]">
                  {generatedUI.get(msg.id) ?? (
                    <p className="text-sm text-[var(--inkblot-semantic-color-text-primary)]">
                      {msg.content}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isProcessing && (
          <div className="max-w-[70%]">
            <ModuleSkeleton className="animate-shimmer" />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-4">
        <CommandInterface
          promptValue={prompt}
          onPromptChange={setPrompt}
          onPromptSubmit={handleSubmit}
          isProcessing={isProcessing}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
