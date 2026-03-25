import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { useCallback, useMemo } from 'react'
import { cn } from '../../utils/cn'
import type { TaskStatus, TaskWithStatus } from '../../types/task'
import { TaskKanbanCard } from './TaskKanbanCard'
import { TaskKanbanColumn } from './TaskKanbanColumn'

const COLUMN_CONFIG: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'TO DO' },
  { id: 'in_progress', title: 'IN PROGRESS' },
  { id: 'done', title: 'DONE' },
]

function applyDragResult(tasks: TaskWithStatus[], result: DropResult): TaskWithStatus[] {
  const { destination, source, draggableId } = result
  if (!destination) return tasks
  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return tasks
  }

  const destCol = destination.droppableId as TaskStatus
  const moving = tasks.find((t) => t.id === draggableId)
  if (!moving) return tasks

  const without = tasks.filter((t) => t.id !== draggableId)
  const updatedMoving: TaskWithStatus = { ...moving, status: destCol }

  const destBefore = without.filter((t) => t.status === destCol)
  const destAfter = [...destBefore]
  destAfter.splice(destination.index, 0, updatedMoving)

  const columnOrder: TaskStatus[] = ['todo', 'in_progress', 'done']
  return columnOrder.flatMap((col) =>
    col === destCol ? destAfter : without.filter((t) => t.status === col)
  )
}

export interface TaskKanbanBoardProps {
  tasks: TaskWithStatus[]
  onTasksChange: (tasks: TaskWithStatus[]) => void
  className?: string
}

export function TaskKanbanBoard({ tasks, onTasksChange, className }: TaskKanbanBoardProps) {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      onTasksChange(applyDragResult(tasks, result))
    },
    [tasks, onTasksChange]
  )

  const byColumn = useMemo(() => {
    const map: Record<TaskStatus, TaskWithStatus[]> = {
      todo: [],
      in_progress: [],
      done: [],
    }
    for (const t of tasks) {
      map[t.status].push(t)
    }
    return map
  }, [tasks])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={cn(
          'flex w-full flex-col gap-[var(--inkblot-spacing-4)] lg:flex-row lg:items-start lg:overflow-x-auto',
          className
        )}
      >
        {COLUMN_CONFIG.map((col) => {
          const items = byColumn[col.id]
          return (
            <TaskKanbanColumn key={col.id} columnId={col.id} title={col.title} count={items.length}>
              {items.map((task, index) => (
                <TaskKanbanCard key={task.id} task={task} index={index} />
              ))}
            </TaskKanbanColumn>
          )
        })}
      </div>
    </DragDropContext>
  )
}
