import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { EmailBlock } from '../EmailBlockEditor'

export interface AIEmailGeneratorProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  isGenerating?: boolean
  onGeneratingChange?: (isGenerating: boolean) => void
  generated?: boolean
  onGeneratedChange?: (generated: boolean) => void
  generationDelayMs?: number
  onSubmitPrompt?: (prompt: string) => void
  generateBlocks?: (prompt: string) => EmailBlock[] | Promise<EmailBlock[]>
  onGenerate?: (blocks: EmailBlock[]) => void
  suggestions?: string[]
  className?: string
}

const defaultSuggestions = [
  'Write a product launch announcement for a SaaS tool',
  'Create a re-engagement email for churned users',
  'Draft a welcome email for new customers',
  'Write a quarterly business review summary',
  'Create a seasonal promotion email with urgency',
]

export function AIEmailGenerator({
  value,
  defaultValue = '',
  onValueChange,
  isGenerating,
  onGeneratingChange,
  generated,
  onGeneratedChange,
  generationDelayMs = 1500,
  onSubmitPrompt,
  generateBlocks,
  onGenerate,
  suggestions = defaultSuggestions,
  className,
}: AIEmailGeneratorProps) {
  const [internalPrompt, setInternalPrompt] = useState(defaultValue)
  const [internalGenerating, setInternalGenerating] = useState(false)
  const [internalGenerated, setInternalGenerated] = useState(false)
  const generatedTimeoutRef = useRef<number | null>(null)

  const isValueControlled = value !== undefined
  const currentPrompt = isValueControlled ? value : internalPrompt

  const isGeneratingControlled = isGenerating !== undefined
  const currentGenerating = isGeneratingControlled ? isGenerating : internalGenerating

  const isGeneratedControlled = generated !== undefined
  const currentGenerated = isGeneratedControlled ? generated : internalGenerated

  const setPrompt = (nextPrompt: string) => {
    if (!isValueControlled) {
      setInternalPrompt(nextPrompt)
    }
    onValueChange?.(nextPrompt)
  }

  const setGenerating = (nextGenerating: boolean) => {
    if (!isGeneratingControlled) {
      setInternalGenerating(nextGenerating)
    }
    onGeneratingChange?.(nextGenerating)
  }

  const setGenerated = (nextGenerated: boolean) => {
    if (!isGeneratedControlled) {
      setInternalGenerated(nextGenerated)
    }
    onGeneratedChange?.(nextGenerated)
  }

  useEffect(() => {
    return () => {
      if (generatedTimeoutRef.current !== null) {
        window.clearTimeout(generatedTimeoutRef.current)
      }
    }
  }, [])

  const createDefaultBlocks = (promptText: string): EmailBlock[] => {
    const baseId = Date.now()
    return [
      { id: `ai-${baseId}-1`, type: 'heading', content: 'Exciting News from Our Team' },
      {
        id: `ai-${baseId}-2`,
        type: 'text',
        content: `Generated from prompt: ${promptText}`,
      },
      { id: `ai-${baseId}-3`, type: 'image', content: '' },
      {
        id: `ai-${baseId}-4`,
        type: 'text',
        content:
          "Our latest updates are designed to help you achieve more with less effort. We've built these improvements with your feedback in mind.",
      },
      { id: `ai-${baseId}-5`, type: 'button', content: 'Learn More' },
      { id: `ai-${baseId}-6`, type: 'divider', content: '' },
      { id: `ai-${baseId}-7`, type: 'text', content: 'Best regards,\nThe Team' },
    ]
  }

  const handleGenerate = async () => {
    const promptText = currentPrompt.trim()
    if (!promptText || currentGenerating) {
      return
    }

    onSubmitPrompt?.(promptText)
    setGenerating(true)

    let generatedBlocks: EmailBlock[]
    if (generateBlocks) {
      generatedBlocks = await Promise.resolve(generateBlocks(promptText))
    } else {
      await new Promise<void>((resolve) => {
        window.setTimeout(() => resolve(), generationDelayMs)
      })
      generatedBlocks = createDefaultBlocks(promptText)
    }

    onGenerate?.(generatedBlocks)
    setGenerating(false)
    setGenerated(true)
    generatedTimeoutRef.current = window.setTimeout(() => setGenerated(false), 1800)
  }

  return (
    <section className={cn(className)}>
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[var(--inkblot-semantic-color-status-warning)]" />
        <span className="text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)]">
          AI Email Generator
        </span>
      </div>
      <div className="space-y-3">
        <textarea
          value={currentPrompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={3}
          placeholder="Describe the email you want to create..."
          className="w-full resize-none rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-3 text-sm text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] outline-none"
        />
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="rounded-[var(--inkblot-radius-sm)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-2.5 py-1 text-[10px] text-[var(--inkblot-semantic-color-text-primary)] transition-opacity duration-[var(--inkblot-duration-fast)] hover:opacity-85"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!currentPrompt.trim() || currentGenerating}
          className="flex items-center gap-2 rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-status-warning)]/10 px-4 py-2 text-xs font-medium text-[var(--inkblot-semantic-color-status-warning)] transition-opacity duration-[var(--inkblot-duration-fast)] disabled:opacity-40"
        >
          {currentGenerating ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Generating...
            </>
          ) : currentGenerated ? (
            <>
              <Check className="h-3 w-3" />
              Applied to editor
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" />
              Generate Email
            </>
          )}
        </button>
      </div>
    </section>
  )
}
