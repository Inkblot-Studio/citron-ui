import { type ReactNode, useEffect, useCallback } from 'react'
import { X, AlertTriangle, ArrowUp, ArrowDown, Minus, Calendar, User } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { TaskItemData, TaskStatus, TaskPriority } from '../../types'

export interface TaskDetailsField {
  label: string
  value: ReactNode
}

export interface TaskDetailsPanelProps {
  task: TaskItemData | null
  open: boolean
  onOpenChange?: (open: boolean) => void
  extraFields?: TaskDetailsField[]
  onStatusChange?: (status: TaskStatus) => void
  onAssigneeChange?: (assignee: string) => void
  className?: string
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  todo: {
    label: 'To Do',
    color: 'bg-[var(--inkblot-semantic-color-text-tertiary)]',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-[var(--inkblot-semantic-color-status-info)]',
  },
  done: {
    label: 'Done',
    color: 'bg-[var(--inkblot-semantic-color-status-success)]',
  },
}

const priorityConfig: Record<TaskPriority, { label: string; icon: typeof ArrowUp; color: string }> = {
  urgent: {
    label: 'Urgent',
    icon: AlertTriangle,
    color: 'text-[var(--inkblot-semantic-color-status-warning)]',
  },
  high: {
    label: 'High',
    icon: ArrowUp,
    color: 'text-[var(--inkblot-semantic-color-status-warning)]',
  },
  medium: {
    label: 'Medium',
    icon: Minus,
    color: 'text-[var(--inkblot-semantic-color-status-info)]',
  },
  low: {
    label: 'Low',
    icon: ArrowDown,
    color: 'text-[var(--inkblot-semantic-color-text-tertiary)]',
  },
}

function deriveStatus(task: TaskItemData): TaskStatus {
  if (task.completed) return 'done'
  return 'todo'
}

function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)] border-b border-[var(--inkblot-semantic-color-border-default)]">
      <span className="w-28 shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
        {label}
      </span>
      <div className="min-w-0 flex-1 text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-small)]">
        {children}
      </div>
    </div>
  )
}

export function TaskDetailsPanel({
  task,
  open,
  onOpenChange,
  extraFields,
  onStatusChange,
  onAssigneeChange: _onAssigneeChange,
  className,
}: TaskDetailsPanelProps) {
  void _onAssigneeChange
  const close = useCallback(() => onOpenChange?.(false), [onOpenChange])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, close])

  if (!open) return null

  const status = task ? deriveStatus(task) : null
  const statusInfo = status ? statusConfig[status] : null
  const priorityInfo = task ? priorityConfig[task.priority] : null
  const PriorityIcon = priorityInfo?.icon ?? Minus

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-[var(--inkblot-duration-fast)]"
        onClick={close}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={task?.title ?? 'Task details'}
        className={cn(
          'relative z-10 flex h-full w-[480px] flex-col',
          'bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-md)]',
          className
        )}
      >
        {task ? (
          <>
            <div className="flex items-start gap-[var(--inkblot-spacing-3)] border-b border-[var(--inkblot-semantic-color-border-default)] p-[var(--inkblot-spacing-6)]">
              <div className="min-w-0 flex-1">
                <h2 className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-4)]">
                  {task.title}
                </h2>
                {task.jiraKey && (
                  <span className="mt-[var(--inkblot-spacing-1)] inline-block text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
                    {task.jiraKey}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className={cn(
                  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)]',
                  'text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)]',
                  'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)]'
                )}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[var(--inkblot-spacing-6)]">
              <FieldRow label="Status">
                <button
                  type="button"
                  onClick={() => {
                    if (!onStatusChange || !status) return
                    const order: TaskStatus[] = ['todo', 'in_progress', 'done']
                    const next = order[(order.indexOf(status) + 1) % order.length]
                    onStatusChange(next)
                  }}
                  className={cn(
                    'inline-flex items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-sm)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
                    'transition-colors duration-[var(--inkblot-duration-fast)]',
                    onStatusChange && 'cursor-pointer hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]'
                  )}
                  disabled={!onStatusChange}
                >
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', statusInfo?.color)} />
                  {statusInfo?.label}
                </button>
              </FieldRow>

              <FieldRow label="Priority">
                <span className={cn('inline-flex items-center gap-[var(--inkblot-spacing-2)]', priorityInfo?.color)}>
                  <PriorityIcon className="h-4 w-4" aria-hidden />
                  {priorityInfo?.label}
                </span>
              </FieldRow>

              <FieldRow label="Assignee">
                <span className="inline-flex items-center gap-[var(--inkblot-spacing-2)]">
                  <User className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]" aria-hidden />
                  {task.assignee}
                </span>
              </FieldRow>

              <FieldRow label="Due date">
                <span className="inline-flex items-center gap-[var(--inkblot-spacing-2)]">
                  <Calendar className="h-4 w-4 text-[var(--inkblot-semantic-color-text-tertiary)]" aria-hidden />
                  {task.date}
                </span>
              </FieldRow>

              <FieldRow label="Company">
                {task.company}
              </FieldRow>

              {extraFields?.map((field) => (
                <FieldRow key={field.label} label={field.label}>
                  {field.value}
                </FieldRow>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-[var(--inkblot-spacing-6)]">
            <p className="text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
              No task selected
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
