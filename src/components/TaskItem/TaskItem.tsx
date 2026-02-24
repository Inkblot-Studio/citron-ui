import { Calendar, Check, User } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { TaskItemData, TaskPriority } from '../../types/task'

export interface TaskItemProps extends TaskItemData {
  onToggle?: (id: string) => void
  onClick?: (id: string) => void
  className?: string
}

const priorityStyles: Record<TaskPriority, string> = {
  urgent:
    'bg-[var(--inkblot-semantic-color-status-error)]/20 text-[var(--inkblot-semantic-color-status-error)] border-[var(--inkblot-semantic-color-status-error)]/30',
  high:
    'bg-[var(--inkblot-semantic-color-status-warning)]/20 text-[var(--inkblot-semantic-color-status-warning)] border-[var(--inkblot-semantic-color-status-warning)]/30',
  medium:
    'bg-[var(--inkblot-semantic-color-status-success)]/10 text-[var(--inkblot-semantic-color-status-success)] border-[var(--inkblot-semantic-color-status-success)]/30',
  low:
    'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)] border-[var(--inkblot-semantic-color-border-subtle)]',
}

export function TaskItem({
  id,
  title,
  company,
  priority,
  date,
  assignee,
  completed = false,
  onToggle,
  onClick,
  className,
}: TaskItemProps) {
  const priorityStyle = priorityStyles[priority]

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(id)
        }
      }}
      className={cn(
        'flex items-center gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-lg)]',
        'border border-[var(--inkblot-semantic-color-border-subtle)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
        'transition-colors duration-[var(--inkblot-duration-fast)]',
        'hover:border-[var(--inkblot-semantic-color-border-default)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
        'cursor-pointer',
        className
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle?.(id)
        }}
        aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        aria-pressed={completed}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          'transition-colors duration-[var(--inkblot-duration-fast)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
          completed
            ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
            : 'border-2 border-[var(--inkblot-semantic-color-border-default)] bg-transparent'
        )}
      >
        {completed ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
      </button>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            '[font:var(--inkblot-semantic-typography-body-large-bold)]',
            'text-[var(--inkblot-semantic-color-text-primary)]',
            completed && 'line-through text-[var(--inkblot-semantic-color-text-secondary)]'
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            'mt-0.5 [font:var(--inkblot-semantic-typography-body-small)]',
            'text-[var(--inkblot-semantic-color-text-secondary)]',
            completed && 'line-through'
          )}
        >
          {company}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-[var(--inkblot-spacing-3)]">
        <span
          className={cn(
            'rounded-[var(--inkblot-radius-md)] border px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
            '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
            priorityStyle
          )}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
        <span
          className={cn(
            'flex items-center gap-1',
            '[font:var(--inkblot-semantic-typography-body-small)]',
            'text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          <Calendar className="h-4 w-4 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]" />
          {date}
        </span>
        <span
          className={cn(
            'flex items-center gap-1',
            '[font:var(--inkblot-semantic-typography-body-small)]',
            'text-[var(--inkblot-semantic-color-text-primary)]'
          )}
        >
          <User className="h-4 w-4 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]" />
          {assignee}
        </span>
      </div>
    </div>
  )
}
