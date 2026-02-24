import { useState, useMemo } from 'react'
import { ClipboardList } from 'lucide-react'
import { PageHeader, PageHeaderActionButton } from '../PageHeader'
import { TaskList } from '../TaskList'
import { TaskCreateForm } from '../TaskCreateForm'
import { SearchBar } from '../SearchBar'
import { cn } from '../../utils/cn'
import type { TaskWithStatus, TaskSection, TaskCreatePayload } from '../../types/task'

export interface TasksViewProps {
  initialTasks?: TaskWithStatus[]
  onTaskCreate?: (payload: TaskCreatePayload) => void
  onTaskToggle?: (taskId: string) => void
  onTaskClick?: (taskId: string) => void
  className?: string
}

function createTask(
  payload: TaskCreatePayload,
  id: string,
  assignee: string = 'You'
): TaskWithStatus {
  const today = new Date()
  const dateStr =
    today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'Today'
  return {
    id,
    title: payload.title,
    company: payload.company ?? 'Unassigned',
    priority: payload.priority ?? 'medium',
    date: dateStr,
    assignee,
    status: 'todo',
  }
}

function tasksToSections(tasks: TaskWithStatus[]): TaskSection[] {
  const byStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    in_progress: tasks.filter((t) => t.status === 'in_progress'),
    done: tasks.filter((t) => t.status === 'done'),
  }
  return [
    { id: 'todo', label: 'TO DO', count: byStatus.todo.length, tasks: byStatus.todo },
    {
      id: 'in_progress',
      label: 'IN PROGRESS',
      count: byStatus.in_progress.length,
      tasks: byStatus.in_progress,
    },
    { id: 'done', label: 'DONE', count: byStatus.done.length, tasks: byStatus.done },
  ]
}

const INITIAL_TASKS: TaskWithStatus[] = [
  createTask(
    { title: 'Follow up with Sarah Chen on proposal', company: 'Acme Corp', priority: 'high' },
    '1'
  ),
  createTask(
    {
      title: 'Schedule demo with engineering team',
      company: 'TechStart Inc',
      priority: 'medium',
    },
    '2'
  ),
  createTask(
    { title: 'Prepare quarterly report slides', company: 'GlobalTech', priority: 'low' },
    '3'
  ),
  createTask(
    { title: 'Review Q1 marketing budget', company: 'TechStart Inc', priority: 'medium' },
    '4'
  ),
  createTask(
    {
      title: 'Draft partnership agreement',
      company: 'Enterprise Co',
      priority: 'urgent',
    },
    '5'
  ),
  createTask(
    { title: 'Send contract to legal team', company: 'GlobalTech', priority: 'low' },
    '6'
  ),
  createTask(
    { title: 'Update CRM with new contacts', company: 'Acme Corp', priority: 'low' },
    '7'
  ),
]

INITIAL_TASKS[0].status = 'todo'
INITIAL_TASKS[1].status = 'todo'
INITIAL_TASKS[2].status = 'todo'
INITIAL_TASKS[3].status = 'in_progress'
INITIAL_TASKS[4].status = 'in_progress'
INITIAL_TASKS[5].status = 'done'
INITIAL_TASKS[6].status = 'done'

export function TasksView({
  initialTasks = INITIAL_TASKS,
  onTaskCreate,
  onTaskToggle,
  onTaskClick,
  className,
}: TasksViewProps) {
  const [tasks, setTasks] = useState<TaskWithStatus[]>(initialTasks)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks
    const q = searchQuery.toLowerCase()
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.company.toLowerCase().includes(q)
    )
  }, [tasks, searchQuery])

  const sections = useMemo(() => tasksToSections(filteredTasks), [filteredTasks])

  const pendingCount = tasks.filter((t) => t.status !== 'done').length
  const urgentCount = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'done').length
  const subtitle = `${pendingCount} pending${urgentCount > 0 ? ` · ${urgentCount} urgent` : ''}`

  const handleTaskCreate = (payload: TaskCreatePayload) => {
    const id = `task-${Date.now()}`
    const newTask = createTask(payload, id)
    setTasks((prev) => [newTask, ...prev])
    setShowCreateForm(false)
    onTaskCreate?.(payload)
  }

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t
        const nextStatus = t.status === 'done' ? 'todo' : 'done'
        return { ...t, status: nextStatus }
      })
    )
    onTaskToggle?.(taskId)
  }

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-8 px-8 py-8">
        <PageHeader
          title="Tasks"
          subtitle={subtitle}
          icon={<ClipboardList className="h-5 w-5" />}
          action={
            <PageHeaderActionButton
              label="New Task"
              onClick={() => setShowCreateForm((s) => !s)}
            />
          }
        />
        <SearchBar
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {showCreateForm ? (
          <TaskCreateForm
            onConfirm={handleTaskCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        ) : null}
        <TaskList
          sections={sections}
          onTaskToggle={handleTaskToggle}
          onTaskClick={onTaskClick}
        />
      </div>
    </div>
  )
}
