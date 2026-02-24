export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low'

export interface TaskItemData {
  id: string
  title: string
  company: string
  priority: TaskPriority
  date: string
  assignee: string
  completed?: boolean
}

export interface TaskWithStatus extends TaskItemData {
  status: TaskStatus
}

export interface TaskSection {
  id: TaskStatus
  label: string
  count: number
  tasks: TaskItemData[]
}

export interface TaskCreatePayload {
  title: string
  company?: string
  priority?: TaskPriority
}
