import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface GuidedTourStep {
  target: string
  title: string
  description: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

export interface GuidedTourProps {
  steps?: GuidedTourStep[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  stepIndex?: number
  defaultStepIndex?: number
  onStepIndexChange?: (stepIndex: number) => void
  onComplete: () => void
  className?: string
}

const defaultSteps: GuidedTourStep[] = [
  {
    target: "[data-tour='sidebar']",
    title: 'Navigation Sidebar',
    description:
      'Access all CRM modules from this sidebar. Each icon represents a different module.',
    position: 'right',
  },
  {
    target: "[data-tour='canvas']",
    title: 'AI Command Canvas',
    description:
      'This is your AI-powered command center where you can orchestrate tasks and workflows.',
    position: 'bottom',
  },
  {
    target: "[data-tour='event-feed']",
    title: 'Real-Time Event Feed',
    description: 'Follow live system activity like stage updates, invoices, and communication events.',
    position: 'left',
  },
  {
    target: "[data-tour='system-status']",
    title: 'System Status',
    description: 'This indicator confirms platform health and connectivity.',
    position: 'right',
  },
]

export function GuidedTour({
  steps = defaultSteps,
  open,
  defaultOpen = true,
  onOpenChange,
  stepIndex,
  defaultStepIndex = 0,
  onStepIndexChange,
  onComplete,
  className,
}: GuidedTourProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [internalStepIndex, setInternalStepIndex] = useState(defaultStepIndex)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const isOpen = open ?? internalOpen
  const currentStepIndex = stepIndex ?? internalStepIndex
  const step = steps[currentStepIndex]
  const isLast = currentStepIndex === steps.length - 1

  const setOpenState = (nextOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const setStepState = (nextStepIndex: number) => {
    const bounded = Math.min(Math.max(nextStepIndex, 0), Math.max(steps.length - 1, 0))
    if (stepIndex === undefined) {
      setInternalStepIndex(bounded)
    }
    onStepIndexChange?.(bounded)
  }

  const recalculateTarget = useCallback(() => {
    const targetElement = document.querySelector(step.target)
    if (!targetElement) {
      setTargetRect(null)
      return
    }
    setTargetRect(targetElement.getBoundingClientRect())
  }, [step.target])

  useEffect(() => {
    recalculateTarget()
    window.addEventListener('resize', recalculateTarget)
    window.addEventListener('scroll', recalculateTarget, true)
    return () => {
      window.removeEventListener('resize', recalculateTarget)
      window.removeEventListener('scroll', recalculateTarget, true)
    }
  }, [recalculateTarget])

  const nextStep = () => {
    if (isLast) {
      setOpenState(false)
      onComplete()
      return
    }
    setStepState(currentStepIndex + 1)
  }

  const previousStep = () => {
    setStepState(currentStepIndex - 1)
  }

  const tooltipStyle = useMemo<CSSProperties>(() => {
    if (!targetRect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }

    const spacing = 16
    const width = 320

    if (step.position === 'right') {
      return {
        top: targetRect.top + targetRect.height / 2,
        left: targetRect.right + spacing,
        transform: 'translateY(-50%)',
      }
    }
    if (step.position === 'left') {
      return {
        top: targetRect.top + targetRect.height / 2,
        left: targetRect.left - width - spacing,
        transform: 'translateY(-50%)',
      }
    }
    if (step.position === 'top') {
      return {
        top: targetRect.top - spacing,
        left: targetRect.left + targetRect.width / 2,
        transform: 'translate(-50%, -100%)',
      }
    }
    return {
      top: targetRect.bottom + spacing,
      left: targetRect.left + targetRect.width / 2,
      transform: 'translateX(-50%)',
    }
  }, [step.position, targetRect])

  if (!isOpen) {
    return null
  }

  return (
    <div className={cn('fixed inset-0 z-[200]', className)}>
      {targetRect ? (
        <div
          className="pointer-events-none absolute rounded-[var(--inkblot-radius-lg)] border-2 border-[var(--inkblot-semantic-color-interactive-primary)]/50"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            boxShadow:
              '0 0 0 9999px var(--inkblot-semantic-color-background-inverse), var(--inkblot-shadow-lg)',
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--inkblot-semantic-color-background-inverse)]/70" />
      )}
      <div
        style={{ ...tooltipStyle, position: 'absolute', width: 320, zIndex: 210 }}
        className="rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-5 shadow-[var(--inkblot-shadow-lg)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setOpenState(false)
              onComplete()
            }}
            className="rounded-[var(--inkblot-radius-sm)] p-1 text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
            aria-label="Close tour"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        <h3 className="mb-1.5 text-sm font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          {step.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--inkblot-semantic-color-text-tertiary)]">
          {step.description}
        </p>
        <div className="mb-3 mt-4 flex gap-1">
          {steps.map((_, index) => (
            <span
              key={`${index}-progress`}
              className={cn(
                'h-1 flex-1 rounded-full',
                index <= currentStepIndex
                  ? 'bg-[var(--inkblot-semantic-color-interactive-primary)]'
                  : 'bg-[var(--inkblot-semantic-color-background-tertiary)]'
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1 text-xs text-[var(--inkblot-semantic-color-text-tertiary)] transition-opacity duration-[var(--inkblot-duration-fast)] disabled:opacity-0"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-1.5 rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-4 py-2 text-xs font-medium text-[var(--inkblot-semantic-color-text-inverse)]"
          >
            {isLast ? (
              <>
                <Check className="h-3 w-3" />
                Get Started
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
