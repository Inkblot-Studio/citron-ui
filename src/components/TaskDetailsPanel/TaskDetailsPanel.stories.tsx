import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskDetailsPanel } from './TaskDetailsPanel'
import type { TaskItemData } from '../../types'

const sampleTask: TaskItemData = {
  id: 'task-1',
  title: 'Implement user authentication flow',
  company: 'Acme Corp',
  priority: 'high',
  date: '2026-04-15',
  assignee: 'Jane Cooper',
  jiraKey: 'PROJ-142',
}

const meta = {
  title: 'Components/TaskDetailsPanel',
  component: TaskDetailsPanel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskDetailsPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    task: sampleTask,
    open: true,
    extraFields: [
      { label: 'Description', value: 'Set up OAuth 2.0 login with Google and GitHub providers. Include refresh token rotation and session management.' },
      { label: 'Sprint', value: 'Sprint 14' },
    ],
  },
}

export const Empty: Story = {
  args: {
    task: null,
    open: true,
  },
}
