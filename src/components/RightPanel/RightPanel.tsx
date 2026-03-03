import { useState, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Sparkles,
  Activity,
  ChevronDown,
  FileText,
  Mail,
  Users,
  CheckSquare,
  MessageSquare,
  Paperclip,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { CanvasBlock } from '../CanvasContext'

export type RightPanelTab = 'chat' | 'events'

export interface RightPanelAgent {
  id: string
  label: string
  icon: LucideIcon
  description: string
}

export interface RightPanelChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  files?: string[]
}

export interface RightPanelProps {
  defaultTab?: RightPanelTab
  tab?: RightPanelTab
  onTabChange?: (tab: RightPanelTab) => void
  agents?: RightPanelAgent[]
  defaultAgent?: RightPanelAgent
  agent?: RightPanelAgent
  onAgentChange?: (agent: RightPanelAgent) => void
  messages?: RightPanelChatMessage[]
  defaultMessages?: RightPanelChatMessage[]
  onMessagesChange?: (messages: RightPanelChatMessage[]) => void
  onSend?: (content: string, files: File[]) => void
  onAddCanvasBlocks?: (blocks: CanvasBlock[]) => void
  agentResponses?: Record<string, { text: string; cards: ('entity' | 'intelligence')[] }>
  autoRespond?: boolean
  autoRespondDelayMs?: number
  renderEventsTab?: () => ReactNode
  className?: string
}

const defaultAgents: RightPanelAgent[] = [
  { id: 'general', label: 'General', icon: MessageSquare, description: 'Full CRM assistant' },
  { id: 'invoices', label: 'Invoices', icon: FileText, description: 'Create & manage invoices' },
  { id: 'campaigns', label: 'Campaigns', icon: Mail, description: 'Email campaigns & templates' },
  { id: 'contacts', label: 'Contacts', icon: Users, description: 'Contact management' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, description: 'Task automation' },
]

const defaultAgentResponses: Record<string, { text: string; cards: ('entity' | 'intelligence')[] }> = {
  general: { text: "Here's an overview of your CRM data with entity profile and intelligence scores.", cards: ['entity', 'intelligence'] },
  invoices: { text: "I've pulled up your latest invoice data and deal health metrics.", cards: ['entity', 'intelligence'] },
  campaigns: { text: 'Analyzing your campaign performance. Here are the key insights.', cards: ['intelligence'] },
  contacts: { text: "Here's the contact profile and relationship intelligence.", cards: ['entity'] },
  tasks: { text: "I've reviewed your task queue. Here's what needs attention.", cards: ['intelligence'] },
}

const defaultInitialMessages: RightPanelChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Welcome to Citron OS. I'm your AI assistant — ask me anything about your revenue operations.",
  },
]

export function RightPanel({
  defaultTab = 'chat',
  tab,
  onTabChange,
  agents = defaultAgents,
  defaultAgent,
  agent,
  onAgentChange,
  messages,
  defaultMessages = defaultInitialMessages,
  onMessagesChange,
  onSend,
  onAddCanvasBlocks,
  agentResponses = defaultAgentResponses,
  autoRespond = true,
  autoRespondDelayMs = 800,
  renderEventsTab,
  className,
}: RightPanelProps) {
  const [internalTab, setInternalTab] = useState<RightPanelTab>(defaultTab)
  const [internalAgent, setInternalAgent] = useState<RightPanelAgent>(defaultAgent ?? agents[0])
  const [agentMenuOpen, setAgentMenuOpen] = useState(false)
  const [internalMessages, setInternalMessages] = useState<RightPanelChatMessage[]>(defaultMessages)
  const [input, setInput] = useState('')
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isTabControlled = tab !== undefined
  const currentTab = isTabControlled ? tab : internalTab

  const isAgentControlled = agent !== undefined
  const currentAgent = isAgentControlled ? agent : internalAgent

  const isMessagesControlled = messages !== undefined
  const currentMessages = isMessagesControlled ? messages : internalMessages

  const setTab = (nextTab: RightPanelTab) => {
    if (!isTabControlled) setInternalTab(nextTab)
    onTabChange?.(nextTab)
  }

  const setAgent = (nextAgent: RightPanelAgent) => {
    if (!isAgentControlled) setInternalAgent(nextAgent)
    onAgentChange?.(nextAgent)
  }

  const setMessages = (nextMessages: RightPanelChatMessage[]) => {
    if (!isMessagesControlled) setInternalMessages(nextMessages)
    onMessagesChange?.(nextMessages)
  }

  const handleSend = () => {
    if (!input.trim() && attachedFiles.length === 0) return

    const fileNames = attachedFiles.map((f) => f.name)
    const userMsg: RightPanelChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input || `Attached ${fileNames.length} file(s)`,
      files: fileNames.length > 0 ? fileNames : undefined,
    }
    const nextMessages = [...currentMessages, userMsg]
    setMessages(nextMessages)

    onSend?.(input, attachedFiles)

    setInput('')
    setAttachedFiles([])

    if (onAddCanvasBlocks) {
      const loadingId = `loading-${Date.now()}`
      onAddCanvasBlocks([{ id: loadingId, type: 'loading' }])
    }

    if (!autoRespond) return

    setTimeout(() => {
      const response = agentResponses[currentAgent.id] ?? agentResponses.general ?? {
        text: 'Processing your request...',
        cards: [],
      }

      setMessages([
        ...nextMessages,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.text,
        },
      ])

      if (onAddCanvasBlocks) {
        onAddCanvasBlocks([
          { id: `text-${Date.now()}`, type: 'text', content: `[${currentAgent.label}] ${response.text}` },
          ...response.cards.map((card, i) => ({
            id: `card-${Date.now()}-${i}`,
            type: card as 'entity' | 'intelligence',
          })),
        ])
      }
    }, autoRespondDelayMs)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const AgentIcon = currentAgent.icon

  return (
    <div className={cn('flex h-full flex-col bg-[var(--inkblot-semantic-color-background-secondary)]', className)}>
      {/* Tab bar */}
      <div className="flex border-b border-[var(--inkblot-semantic-color-border-default)]">
        <button
          type="button"
          onClick={() => setTab('chat')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors duration-[var(--inkblot-duration-fast)]',
            currentTab === 'chat'
              ? 'border-b-2 border-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-primary)]'
              : 'text-[var(--inkblot-semantic-color-text-tertiary)] hover:text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          <Sparkles className="h-3 w-3" aria-hidden />
          AI Chat
        </button>
        <button
          type="button"
          onClick={() => setTab('events')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors duration-[var(--inkblot-duration-fast)]',
            currentTab === 'events'
              ? 'border-b-2 border-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-primary)]'
              : 'text-[var(--inkblot-semantic-color-text-tertiary)] hover:text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          <Activity className="h-3 w-3" aria-hidden />
          Events
        </button>
      </div>

      {currentTab === 'events' ? (
        <div className="hide-scrollbar flex-1 overflow-y-auto">
          {renderEventsTab?.()}
        </div>
      ) : (
        <>
          {/* Agent Selector */}
          <div className="relative border-b border-[var(--inkblot-semantic-color-border-default)] px-3 py-2">
            <button
              type="button"
              onClick={() => setAgentMenuOpen(!agentMenuOpen)}
              className="flex w-full items-center gap-2 rounded-[var(--inkblot-radius-md)] px-2.5 py-1.5 transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
            >
              <AgentIcon className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
              <span className="text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                {currentAgent.label} Agent
              </span>
              <ChevronDown
                className={cn(
                  'ml-auto h-3 w-3 text-[var(--inkblot-semantic-color-text-tertiary)] transition-transform duration-[var(--inkblot-duration-fast)]',
                  agentMenuOpen && 'rotate-180'
                )}
                aria-hidden
              />
            </button>

            <AnimatePresence>
              {agentMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="glass absolute left-3 right-3 top-full z-50 mt-1 rounded-[var(--inkblot-radius-md)] py-1 shadow-[var(--inkblot-shadow-lg)]"
                >
                  {agents.map((a) => {
                    const Icon = a.icon
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          setAgent(a)
                          setAgentMenuOpen(false)
                        }}
                        className={cn(
                          'flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
                          currentAgent.id === a.id && 'bg-[var(--inkblot-semantic-color-interactive-secondary)]'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-text-tertiary)]" aria-hidden />
                        <div>
                          <p className="text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)]">
                            {a.label}
                          </p>
                          <p className="text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]">
                            {a.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat messages */}
          <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {currentMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={msg.role === 'user' ? 'flex justify-end' : ''}
              >
                {msg.role === 'user' ? (
                  <div className="max-w-[85%]">
                    {msg.files && msg.files.length > 0 && (
                      <div className="mb-1 flex flex-wrap justify-end gap-1">
                        {msg.files.map((f, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]"
                          >
                            <Paperclip className="h-2 w-2" aria-hidden />
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="rounded-2xl rounded-br-sm bg-[var(--inkblot-semantic-color-interactive-secondary)] px-3 py-2 text-xs leading-relaxed text-[var(--inkblot-semantic-color-text-primary)]">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)]/15">
                      <Sparkles className="h-2.5 w-2.5 text-[var(--inkblot-semantic-color-interactive-primary)]" aria-hidden />
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--inkblot-semantic-color-text-secondary)]">
                      {msg.content}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Attached files preview */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-[var(--inkblot-semantic-color-border-default)]/50 px-3 py-2">
              {attachedFiles.map((file, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-2 py-1 text-[10px] text-[var(--inkblot-semantic-color-text-primary)]"
                >
                  <Paperclip className="h-2.5 w-2.5 text-[var(--inkblot-semantic-color-text-tertiary)]" aria-hidden />
                  {file.name}
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:text-[var(--inkblot-semantic-color-status-error)]"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Chat input */}
          <div className="border-t border-[var(--inkblot-semantic-color-border-default)] px-3 py-2.5">
            <div className="glass flex items-center gap-2 rounded-[var(--inkblot-radius-md)] px-3 py-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
                title="Attach files"
                aria-label="Attach files"
              >
                <Paperclip className="h-3 w-3" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend()
                }}
                placeholder={`Ask ${currentAgent.label} agent...`}
                className="flex-1 bg-transparent text-xs text-[var(--inkblot-semantic-color-text-primary)] outline-none placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() && attachedFiles.length === 0}
                className="flex h-6 w-6 items-center justify-center rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] transition-opacity duration-[var(--inkblot-duration-fast)] hover:opacity-90 disabled:opacity-30"
                aria-label="Send message"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
