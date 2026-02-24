import type { ReactNode } from 'react'
import { Send, Calendar } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ActionButtonItem {
  id: string
  label: string
  variant: 'primary' | 'secondary'
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export interface ActionButtonsProps {
  buttons: ActionButtonItem[]
  className?: string
}

const variantStyles = {
  primary: [
    'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
    'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
  ],
  secondary: [
    'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
    'border border-[var(--inkblot-semantic-color-border-default)]',
    'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:border-[var(--inkblot-semantic-color-border-strong)]',
    'active:bg-[var(--inkblot-semantic-color-background-tertiary)]',
  ],
}

export function ActionButtons({ buttons, className }: ActionButtonsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-[var(--inkblot-spacing-3)]',
        className
      )}
    >
      {buttons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          onClick={() => {
            btn.onClick?.()
          }}
          disabled={btn.disabled}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
            '[font:var(--inkblot-semantic-typography-body-medium)] font-medium',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
            'transition-colors duration-[var(--inkblot-duration-fast)]',
            'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none disabled:cursor-not-allowed',
            variantStyles[btn.variant]
          )}
        >
          {btn.icon ?? null}
          {btn.label}
        </button>
      ))}
    </div>
  )
}

export function EmailComposeActionButtons({
  onSendNow,
  onSchedule,
  onSaveDraft,
  className,
}: {
  onSendNow?: () => void
  onSchedule?: () => void
  onSaveDraft?: () => void
  className?: string
}) {
  return (
    <ActionButtons
      buttons={[
        {
          id: 'send',
          label: 'Send Now',
          variant: 'primary',
          icon: <Send className="h-4 w-4" />,
          onClick: onSendNow,
        },
        {
          id: 'schedule',
          label: 'Schedule',
          variant: 'secondary',
          icon: <Calendar className="h-4 w-4" />,
          onClick: onSchedule,
        },
        {
          id: 'draft',
          label: 'Save Draft',
          variant: 'secondary',
          onClick: onSaveDraft,
        },
      ]}
      className={className}
    />
  )
}
