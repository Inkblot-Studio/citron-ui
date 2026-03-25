import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TaskWithStatus } from '../../types/task'
import { TaskKanbanBoard } from './TaskKanbanBoard'

const sample: TaskWithStatus[] = [
  {
    id: '1',
    title: 'Follow up with Sarah Chen on proposal',
    company: 'Acme Corp',
    priority: 'high',
    date: 'Mar 28',
    assignee: 'You',
    status: 'todo',
    jiraKey: 'CRM-104',
  },
  {
    id: '2',
    title: 'Schedule demo with engineering team',
    company: 'TechStart Inc',
    priority: 'medium',
    date: 'Apr 2',
    assignee: 'Alex M.',
    status: 'in_progress',
    jiraKey: 'CRM-112',
  },
  {
    id: '3',
    title: 'Prepare quarterly report slides',
    company: 'GlobalTech',
    priority: 'low',
    date: 'Mar 30',
    assignee: 'Sam R.',
    status: 'done',
    jiraKey: 'CRM-98',
  },
]

const meta = {
  title: 'Compositions/Tasks/TaskKanbanBoard',
  component: TaskKanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskKanbanBoard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [tasks, setTasks] = useState<TaskWithStatus[]>(sample)
    return (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-8)]">
        <TaskKanbanBoard tasks={tasks} onTasksChange={setTasks} />
      </div>
    )
  },
}
