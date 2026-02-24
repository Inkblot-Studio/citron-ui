import type { ComponentType } from 'react'
import { CircleDot, Clock, CheckCircle } from 'lucide-react'
import { cn } from '../../utils/cn'
import { TaskItem } from '../TaskItem'
import type { TaskSection, TaskStatus } from '../../types/task'

export interface TaskListProps {
  sections: TaskSection[]
  onTaskToggle?: (taskId: string) => void
  onTaskClick?: (taskId: string) => void
  className?: string
}

const sectionIcons: Record<TaskStatus, ComponentType<{ className?: string }>> = {
  todo: CircleDot,
  in_progress: Clock,
  done: CheckCircle,
}

export function TaskList({
  sections,
  onTaskToggle,
  onTaskClick,
  className,
}: TaskListProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-8)]',
        className
      )}
    >
      {sections.map((section) => {
        const Icon = sectionIcons[section.id]
        const isDone = section.id === 'done'

        return (
          <section
            key={section.id}
            className="flex flex-col gap-[var(--inkblot-spacing-4)]"
          >
            <div className="flex items-center gap-[var(--inkblot-spacing-3)]">
              <Icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  isDone
                    ? 'text-[var(--inkblot-semantic-color-interactive-primary)]'
                    : 'text-[var(--inkblot-semantic-color-text-secondary)]'
                )}
              />
              <h2
                className={cn(
                  '[font:var(--inkblot-semantic-typography-body-large-bold)]',
                  'text-[var(--inkblot-semantic-color-text-primary)]'
                )}
              >
                {section.label}
              </h2>
              <span
                className={cn(
                  'rounded-[var(--inkblot-radius-full)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
                  'bg-[var(--inkblot-semantic-color-background-secondary)]',
                  '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
                  'text-[var(--inkblot-semantic-color-text-primary)]'
                )}
              >
                {section.count}
              </span>
            </div>
            <div className="flex flex-col gap-[var(--inkblot-spacing-3)]">
              {section.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  {...task}
                  completed={isDone}
                  onToggle={onTaskToggle}
                  onClick={onTaskClick}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
