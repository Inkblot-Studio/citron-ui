import type { Meta, StoryObj } from '@storybook/react-vite'
import { TasksView } from '../TasksView'
import type { TaskWithStatus } from '../../types/task'

const meta = {
  title: 'Compositions/Tasks',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const tasksWithOneCompleted: TaskWithStatus[] = [
  {
    id: '1',
    title: 'Follow up with Sarah Chen on proposal',
    company: 'Acme Corp',
    priority: 'high',
    date: 'Today',
    assignee: 'You',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Send contract to legal team',
    company: 'GlobalTech',
    priority: 'low',
    date: 'Feb 24',
    assignee: 'Lisa K.',
    status: 'done',
  },
]

export const Default: Story = {
  render: () => (
    <TasksView
      onTaskCreate={(p) => console.log('Task created:', p)}
      onTaskToggle={(id) => console.log('Task toggled:', id)}
      onTaskClick={(id) => console.log('Task clicked:', id)}
    />
  ),
}

export const WithCompletedTask: Story = {
  render: () => (
    <TasksView
      initialTasks={tasksWithOneCompleted}
      onTaskToggle={(id) => console.log('Task toggled:', id)}
    />
  ),
}

export const Empty: Story = {
  render: () => (
    <TasksView
      initialTasks={[]}
      onTaskCreate={(p) => console.log('Task created:', p)}
    />
  ),
}
