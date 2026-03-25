import { Draggable } from '@hello-pangea/dnd'
import { cn } from '../../utils/cn'
import { Avatar } from '../Avatar'
import type { TaskPriority, TaskWithStatus } from '../../types/task'

const priorityBarClass: Record<TaskPriority, string> = {
  low: 'bg-[var(--inkblot-semantic-color-status-info)]',
  medium: 'bg-[var(--inkblot-semantic-color-status-success)]',
  high: 'bg-[var(--inkblot-semantic-color-status-warning)]',
  urgent: 'bg-[var(--inkblot-semantic-color-status-error)]',
}

export interface TaskKanbanCardProps {
  task: TaskWithStatus
  index: number
  className?: string
}

export function TaskKanbanCard({ task, index, className }: TaskKanbanCardProps) {
  const keyLabel = task.jiraKey ?? `TASK-${task.id}`

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'relative flex cursor-grab flex-col gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
            'bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] shadow-[var(--inkblot-shadow-sm)]',
            'active:cursor-grabbing',
            snapshot.isDragging &&
              'shadow-[var(--inkblot-shadow-lg)] ring-2 ring-[var(--inkblot-semantic-color-border-focus)]',
            className
          )}
        >
          <div className="absolute right-[var(--inkblot-spacing-3)] top-[var(--inkblot-spacing-3)] h-8 w-1 rounded-[var(--inkblot-radius-sm)]">
            <span
              className={cn(
                'block h-full w-full rounded-[var(--inkblot-radius-sm)]',
                priorityBarClass[task.priority]
              )}
            />
          </div>
          <p
            className={cn(
              'pr-[var(--inkblot-spacing-4)] text-[var(--inkblot-semantic-color-text-primary)]',
              '[font:var(--inkblot-semantic-typography-body-medium)] font-semibold'
            )}
          >
            {task.title}
          </p>
          <p className="text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
            {task.company}
          </p>
          <div className="flex items-end justify-between gap-[var(--inkblot-spacing-2)]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[var(--inkblot-semantic-color-text-tertiary)] [font:var(--inkblot-semantic-typography-body-small)]">
                {keyLabel}
              </span>
              {task.date ? (
                <span className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
                  {task.date}
                </span>
              ) : null}
            </div>
            <Avatar
              size="sm"
              fallback={task.assignee.replace(/\s/g, '').slice(0, 2).toUpperCase()}
              alt={task.assignee}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}
