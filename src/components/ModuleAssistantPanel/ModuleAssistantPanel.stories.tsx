import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModuleAssistantPanel } from './ModuleAssistantPanel'
import type { ModuleAssistantMessage } from './ModuleAssistantPanel'

const meta = {
  title: 'Components/ModuleAssistantPanel',
  component: ModuleAssistantPanel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 600, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModuleAssistantPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    moduleId: 'accounting',
    moduleLabel: 'Accounting',
    onClose: () => {},
    onSend: () => {},
  },
}

const marketingMessages: ModuleAssistantMessage[] = [
  { id: '1', role: 'user', content: 'What were last month\'s top-performing campaigns?' },
  { id: '2', role: 'assistant', content: 'Your top 3 campaigns last month were: "Spring Launch" (12.4% CTR), "Webinar Invite" (9.8% CTR), and "Newsletter Q1" (7.2% CTR). Spring Launch also had the highest conversion rate at 3.1%.' },
  { id: '3', role: 'user', content: 'Can you break down Spring Launch by channel?' },
  { id: '4', role: 'assistant', content: 'Spring Launch performance by channel:\n\n• Email: 14.2% open rate, 4.1% CTR\n• LinkedIn Ads: 2.8% CTR, $1.20 CPC\n• Google Search: 3.5% CTR, $0.95 CPC\n\nEmail drove the highest volume of qualified leads (142), while LinkedIn had the best cost-per-lead at $18.50.' },
  { id: '5', role: 'user', content: 'Great, schedule a follow-up campaign for next week.' },
]

export const WithMessages: Story = {
  args: {
    moduleId: 'marketing',
    moduleLabel: 'Marketing',
    agentLabel: 'Campaign Intelligence',
    messages: marketingMessages,
    onClose: () => {},
    onSend: () => {},
  },
}

const tasksMessages: ModuleAssistantMessage[] = [
  { id: '1', role: 'user', content: 'Show overdue tasks assigned to me.' },
  { id: '2', role: 'assistant', content: 'You have 3 overdue tasks:\n\n1. Review Q1 pipeline report — due Apr 2\n2. Follow up with Acme Corp — due Apr 5\n3. Update CRM contact tags — due Apr 7' },
]

export const Processing: Story = {
  args: {
    moduleId: 'tasks',
    moduleLabel: 'Tasks',
    agentLabel: 'Task Assistant',
    messages: tasksMessages,
    isProcessing: true,
    onClose: () => {},
    onSend: () => {},
  },
}
