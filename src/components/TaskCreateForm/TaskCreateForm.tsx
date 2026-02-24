import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { TaskCreatePayload, TaskPriority } from '../../types/task'

export interface TaskCreateFormProps {
  onConfirm: (payload: TaskCreatePayload) => void
  onCancel: () => void
  className?: string
}

const PRIORITIES: TaskPriority[] = ['urgent', 'high', 'medium', 'low']

export function TaskCreateForm({
  onConfirm,
  onCancel,
  className,
}: TaskCreateFormProps) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onConfirm({ title: trimmed, company: company.trim() || undefined, priority })
    setTitle('')
    setCompany('')
    setPriority('medium')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-lg)]',
        'border border-[var(--inkblot-semantic-color-border-default)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'p-[var(--inkblot-spacing-4)]',
        className
      )}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        autoFocus
        required
        className={cn(
          'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-md)]',
          'border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-primary)]',
          'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          'text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]'
        )}
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company (optional)"
        className={cn(
          'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-md)]',
          'border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-primary)]',
          'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
          '[font:var(--inkblot-semantic-typography-body-medium)]',
          'text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]'
        )}
      />
      <div className="flex flex-wrap gap-[var(--inkblot-spacing-2)]">
        {PRIORITIES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={cn(
              'rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
              '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
              'transition-colors duration-[var(--inkblot-duration-fast)]',
              priority === p
                ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
                : 'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]/80'
            )}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-[var(--inkblot-spacing-2)]">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)]',
            'border border-[var(--inkblot-semantic-color-border-default)]',
            'bg-[var(--inkblot-semantic-color-interactive-secondary)]',
            'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
            '[font:var(--inkblot-semantic-typography-body-medium)] font-medium',
            'text-[var(--inkblot-semantic-color-text-primary)]',
            'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]'
          )}
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-2 rounded-[var(--inkblot-radius-lg)]',
            'bg-[var(--inkblot-semantic-color-interactive-primary)]',
            'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
            '[font:var(--inkblot-semantic-typography-body-medium)] font-medium',
            'text-[var(--inkblot-semantic-color-text-inverse)]',
            'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]',
            'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:cursor-not-allowed'
          )}
        >
          <Check className="h-4 w-4" />
          Add Task
        </button>
      </div>
    </form>
  )
}
