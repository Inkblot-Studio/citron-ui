import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskItem } from './TaskItem'

const meta = {
  title: 'Components/TaskItem',
  component: TaskItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskItem>

export default meta

type Story = StoryObj<typeof meta>

export const Todo: Story = {
  args: {
    id: '1',
    title: 'Follow up with Sarah Chen on proposal',
    company: 'Acme Corp',
    priority: 'high',
    date: 'Today',
    assignee: 'You',
    completed: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const InProgress: Story = {
  args: {
    id: '2',
    title: 'Review Q1 marketing budget',
    company: 'TechStart Inc',
    priority: 'medium',
    date: 'Feb 26',
    assignee: 'Mike R.',
    completed: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const Done: Story = {
  args: {
    id: '3',
    title: 'Send contract to legal team',
    company: 'GlobalTech',
    priority: 'low',
    date: 'Feb 24',
    assignee: 'Lisa K.',
    completed: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const Urgent: Story = {
  args: {
    id: '4',
    title: 'Urgent: Client escalation response',
    company: 'Enterprise Co',
    priority: 'urgent',
    date: 'Today',
    assignee: 'You',
    completed: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
