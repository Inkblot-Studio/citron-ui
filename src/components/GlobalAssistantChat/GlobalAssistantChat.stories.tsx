import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlobalAssistantChat, type AssistantMessage } from './GlobalAssistantChat'

const meta = {
  title: 'Components/GlobalAssistantChat',
  component: GlobalAssistantChat,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalAssistantChat>

export default meta

type Story = StoryObj<typeof meta>

const sampleMessages: AssistantMessage[] = [
  { id: '1', role: 'user', content: 'What is the current pipeline value?' },
  {
    id: '2',
    role: 'assistant',
    content:
      'The current pipeline value across all active deals is $4.2M. This represents a 12% increase from last quarter, driven primarily by 3 new enterprise opportunities added in the last two weeks.',
  },
  { id: '3', role: 'user', content: 'Which deals are at risk?' },
  {
    id: '4',
    role: 'assistant',
    content:
      "There are 2 deals flagged as at-risk:\n\n1. Acme Corp ($450K) — No contact in 14 days, champion left the company.\n2. Globex Inc ($280K) — Budget freeze announced last week, next steps unclear.\n\nI recommend scheduling re-engagement calls for both this week.",
  },
]

export const Empty: Story = {
  args: {},
}

export const WithMessages: Story = {
  args: {
    messages: sampleMessages,
  },
}

export const Processing: Story = {
  args: {
    messages: [
      ...sampleMessages,
      { id: '5', role: 'user', content: 'Draft a re-engagement email for Acme Corp.' },
    ],
    isProcessing: true,
  },
}
