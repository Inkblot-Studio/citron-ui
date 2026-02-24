import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskList } from './TaskList'
import type { TaskSection } from '../../types/task'

const meta = {
  title: 'Components/TaskList',
  component: TaskList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskList>

export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_SECTIONS: TaskSection[] = [
  {
    id: 'todo',
    label: 'TO DO',
    count: 3,
    tasks: [
      {
        id: '1',
        title: 'Follow up with Sarah Chen on proposal',
        company: 'Acme Corp',
        priority: 'high',
        date: 'Today',
        assignee: 'You',
      },
      {
        id: '2',
        title: 'Schedule demo with engineering team',
        company: 'TechStart Inc',
        priority: 'medium',
        date: 'Tomorrow',
        assignee: 'Mike R.',
      },
      {
        id: '3',
        title: 'Prepare quarterly report slides',
        company: 'GlobalTech',
        priority: 'low',
        date: 'Mar 1',
        assignee: 'Lisa K.',
      },
    ],
  },
  {
    id: 'in_progress',
    label: 'IN PROGRESS',
    count: 2,
    tasks: [
      {
        id: '4',
        title: 'Review Q1 marketing budget',
        company: 'TechStart Inc',
        priority: 'medium',
        date: 'Feb 26',
        assignee: 'Mike R.',
      },
      {
        id: '5',
        title: 'Draft partnership agreement',
        company: 'Enterprise Co',
        priority: 'urgent',
        date: 'Today',
        assignee: 'You',
      },
    ],
  },
  {
    id: 'done',
    label: 'DONE',
    count: 2,
    tasks: [
      {
        id: '6',
        title: 'Send contract to legal team',
        company: 'GlobalTech',
        priority: 'low',
        date: 'Feb 24',
        assignee: 'Lisa K.',
      },
      {
        id: '7',
        title: 'Update CRM with new contacts',
        company: 'Acme Corp',
        priority: 'low',
        date: 'Feb 28',
        assignee: 'You',
      },
    ],
  },
]

export const Default: Story = {
  args: {
    sections: SAMPLE_SECTIONS,
    onTaskToggle: (id) => console.log('Toggle', id),
    onTaskClick: (id) => console.log('Click', id),
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
