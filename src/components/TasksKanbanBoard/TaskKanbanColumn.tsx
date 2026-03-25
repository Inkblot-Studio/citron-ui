import { Droppable } from '@hello-pangea/dnd'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import type { TaskStatus } from '../../types/task'

export interface TaskKanbanColumnProps {
  columnId: TaskStatus
  title: string
  count: number
  children: ReactNode
  className?: string
}

export function TaskKanbanColumn({
  columnId,
  title,
  count,
  children,
  className,
}: TaskKanbanColumnProps) {
  return (
    <div
      className={cn(
        'flex min-w-[min(100%,280px)] flex-1 flex-col rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]',
        'bg-[var(--inkblot-semantic-color-background-tertiary)]',
        className
      )}
    >
      <header
        className={cn(
          'flex items-center justify-between gap-[var(--inkblot-spacing-3)] border-b border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]'
        )}
      >
        <h2
          className={cn(
            'text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]',
            'font-semibold uppercase tracking-wide'
          )}
        >
          {title}
        </h2>
        <span
          className={cn(
            'min-w-[var(--inkblot-size-touch-target-min)] rounded-[var(--inkblot-radius-md)] px-[var(--inkblot-spacing-2)] py-0.5 text-center',
            'bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-primary)]',
            '[font:var(--inkblot-semantic-typography-body-small)] font-medium'
          )}
        >
          {count}
        </span>
      </header>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex min-h-[200px] flex-1 flex-col gap-[var(--inkblot-spacing-3)] p-[var(--inkblot-spacing-3)]',
              snapshot.isDraggingOver && 'bg-[var(--inkblot-semantic-color-interactive-secondary)]/30'
            )}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
