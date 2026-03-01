import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Command,
  Globe,
  Megaphone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

interface OnboardingStep {
  id: string
  question: string
  subtitle: string
  icon: LucideIcon
  type: 'input' | 'select' | 'multi-select'
  field: string
  placeholder?: string
  options?: Array<{ value: string; label: string }>
}

export interface OnboardingWizardProps {
  onComplete: (data: Record<string, string | string[]>) => void
  steps?: OnboardingStep[]
  value?: Record<string, string | string[]>
  defaultValue?: Record<string, string | string[]>
  onValueChange?: (value: Record<string, string | string[]>) => void
  stepIndex?: number
  defaultStepIndex?: number
  onStepIndexChange?: (index: number) => void
  onCancel?: () => void
  showSkip?: boolean
  className?: string
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'company',
    question: "What's your company name?",
    subtitle: "We'll personalize your workspace around your brand.",
    icon: Building2,
    type: 'input',
    field: 'companyName',
    placeholder: 'e.g. Acme Corporation',
  },
  {
    id: 'size',
    question: 'How many employees does your company have?',
    subtitle: 'This helps us tailor the right features for your team size.',
    icon: Users,
    type: 'select',
    field: 'companySize',
    options: [
      { value: '1-10', label: '1-10' },
      { value: '11-50', label: '11-50' },
      { value: '51-200', label: '51-200' },
      { value: '201-1000', label: '201-1,000' },
      { value: '1000+', label: '1,000+' },
    ],
  },
  {
    id: 'industry',
    question: 'What industry are you in?',
    subtitle: "We'll pre-configure pipelines and templates for your sector.",
    icon: Briefcase,
    type: 'select',
    field: 'industry',
    options: [
      { value: 'saas', label: 'SaaS / Software' },
      { value: 'agency', label: 'Agency / Consulting' },
      { value: 'ecommerce', label: 'E-Commerce' },
      { value: 'fintech', label: 'Fintech' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'role',
    question: "What's your role?",
    subtitle: 'So we can surface the most relevant modules first.',
    icon: Target,
    type: 'select',
    field: 'role',
    options: [
      { value: 'founder', label: 'Founder / CEO' },
      { value: 'sales', label: 'Sales Leader' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'ops', label: 'Operations' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'goals',
    question: 'What do you want to achieve?',
    subtitle: "Select all that apply. We'll prioritize these in your dashboard.",
    icon: Target,
    type: 'multi-select',
    field: 'goals',
    options: [
      { value: 'pipeline', label: 'Manage Sales Pipeline' },
      { value: 'contacts', label: 'Organize Contacts' },
      { value: 'email', label: 'Email Campaigns' },
      { value: 'invoicing', label: 'Invoicing' },
      { value: 'reporting', label: 'Analytics & Reporting' },
      { value: 'automation', label: 'Workflow Automation' },
    ],
  },
  {
    id: 'source',
    question: 'How did you hear about us?',
    subtitle: 'Helps us improve our outreach.',
    icon: Megaphone,
    type: 'select',
    field: 'source',
    options: [
      { value: 'google', label: 'Google Search' },
      { value: 'social', label: 'Social Media' },
      { value: 'referral', label: 'Friend / Colleague' },
      { value: 'event', label: 'Conference / Event' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'website',
    question: "What's your company website?",
    subtitle: "Optional, we'll try to auto-import your branding.",
    icon: Globe,
    type: 'input',
    field: 'website',
    placeholder: 'e.g. https://acme.com',
  },
]

export function OnboardingWizard({
  onComplete,
  steps = defaultSteps,
  value,
  defaultValue,
  onValueChange,
  stepIndex,
  defaultStepIndex = 0,
  onStepIndexChange,
  onCancel,
  showSkip = true,
  className,
}: OnboardingWizardProps) {
  const [internalStepIndex, setInternalStepIndex] = useState(defaultStepIndex)
  const [internalFormData, setInternalFormData] = useState<Record<string, string | string[]>>(
    defaultValue ?? {}
  )

  const isStepControlled = stepIndex !== undefined
  const isValueControlled = value !== undefined
  const currentStepIndex = isStepControlled ? stepIndex : internalStepIndex
  const formData = isValueControlled ? value : internalFormData

  const currentStep = steps[currentStepIndex]
  const currentFieldValue =
    formData[currentStep.field] ?? (currentStep.type === 'multi-select' ? [] : '')
  const isLastStep = currentStepIndex === steps.length - 1

  const canProceed = useMemo(() => {
    if (currentStep.type === 'multi-select') {
      return (currentFieldValue as string[]).length > 0
    }
    if (currentStep.id === 'website') {
      return true
    }
    return typeof currentFieldValue === 'string' && currentFieldValue.trim().length > 0
  }, [currentFieldValue, currentStep.id, currentStep.type])

  const setCurrentStepIndex = (nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), Math.max(steps.length - 1, 0))
    if (!isStepControlled) {
      setInternalStepIndex(bounded)
    }
    onStepIndexChange?.(bounded)
  }

  const updateFormData = (nextValue: Record<string, string | string[]>) => {
    if (!isValueControlled) {
      setInternalFormData(nextValue)
    }
    onValueChange?.(nextValue)
  }

  const goBack = () => setCurrentStepIndex(currentStepIndex - 1)
  const goNext = () => {
    if (isLastStep) {
      onComplete(formData)
      return
    }
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const setFieldValue = (field: string, nextValue: string | string[]) => {
    updateFormData({ ...formData, [field]: nextValue })
  }

  const toggleMulti = (field: string, option: string) => {
    const currentValues = (formData[field] as string[] | undefined) ?? []
    const nextValues = currentValues.includes(option)
      ? currentValues.filter((valueItem) => valueItem !== option)
      : [...currentValues, option]
    setFieldValue(field, nextValues)
  }

  return (
    <section
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[var(--inkblot-semantic-color-interactive-primary)]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--inkblot-semantic-color-status-warning)]/5 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-lg px-6">
        <header className="mb-12 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-primary)]">
            <Command className="h-5 w-5 text-[var(--inkblot-semantic-color-text-inverse)]" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[var(--inkblot-semantic-color-text-primary)]">
            Citron OS
          </span>
        </header>

        <div className="mb-10 flex gap-1">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                'h-0.5 flex-1 rounded-full',
                index < currentStepIndex
                  ? 'bg-[var(--inkblot-semantic-color-interactive-primary)]'
                  : index === currentStepIndex
                    ? 'bg-[var(--inkblot-semantic-color-interactive-primary)]/60'
                    : 'bg-[var(--inkblot-semantic-color-background-tertiary)]'
              )}
            />
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-secondary)]">
              <currentStep.icon className="h-5 w-5 text-[var(--inkblot-semantic-color-text-primary)]" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-[var(--inkblot-semantic-color-text-primary)]">
              {currentStep.question}
            </h2>
            <p className="mt-1 text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
              {currentStep.subtitle}
            </p>
          </div>

          {currentStep.type === 'input' ? (
            <input
              autoFocus
              value={(currentFieldValue as string) || ''}
              onChange={(event) => setFieldValue(currentStep.field, event.target.value)}
              placeholder={currentStep.placeholder}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canProceed) {
                  goNext()
                }
              }}
              className="w-full rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-5 py-3.5 text-sm text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)] outline-none"
            />
          ) : null}

          {currentStep.type === 'select' ? (
            <div className="grid grid-cols-2 gap-2">
              {currentStep.options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFieldValue(currentStep.field, option.value)}
                  className={cn(
                    'rounded-[var(--inkblot-radius-lg)] border px-4 py-3 text-left text-sm transition-colors duration-[var(--inkblot-duration-fast)]',
                    currentFieldValue === option.value
                      ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)]/10 text-[var(--inkblot-semantic-color-text-primary)]'
                      : 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-tertiary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          {currentStep.type === 'multi-select' ? (
            <div className="grid grid-cols-2 gap-2">
              {currentStep.options?.map((option) => {
                const selected = (currentFieldValue as string[]).includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleMulti(currentStep.field, option.value)}
                    className={cn(
                      'flex items-center gap-2 rounded-[var(--inkblot-radius-lg)] border px-4 py-3 text-left text-sm transition-colors duration-[var(--inkblot-duration-fast)]',
                      selected
                        ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)]/10 text-[var(--inkblot-semantic-color-text-primary)]'
                        : 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-tertiary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-sm)] border',
                        selected
                          ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)]'
                          : 'border-[var(--inkblot-semantic-color-border-default)]'
                      )}
                    >
                      {selected ? (
                        <Check className="h-2.5 w-2.5 text-[var(--inkblot-semantic-color-text-inverse)]" />
                      ) : null}
                    </span>
                    {option.label}
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>

        <footer className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 rounded-[var(--inkblot-radius-md)] px-4 py-2 text-xs text-[var(--inkblot-semantic-color-text-tertiary)] transition-opacity duration-[var(--inkblot-duration-fast)] disabled:opacity-0"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <div className="flex items-center gap-3">
            {!isLastStep && showSkip ? (
              <button
                type="button"
                onClick={onCancel ?? goNext}
                className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]"
              >
                Skip
              </button>
            ) : null}
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed}
              className="flex items-center gap-2 rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-5 py-2.5 text-xs font-medium text-[var(--inkblot-semantic-color-text-inverse)] transition-opacity duration-[var(--inkblot-duration-fast)] disabled:opacity-40"
            >
              {isLastStep ? (
                <>
                  <Sparkles className="h-3 w-3" />
                  Launch Citron OS
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
