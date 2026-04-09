import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AssistantPanel } from './AssistantPanel'
import type { AssistantMessage } from '../GlobalAssistantChat'

const meta = {
  title: 'Components/AssistantPanel',
  component: AssistantPanel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof AssistantPanel>

export default meta

type Story = StoryObj<typeof meta>

const sampleMessages: AssistantMessage[] = [
  { id: '1', role: 'user', content: 'Show me at-risk deals this quarter.' },
  {
    id: '2',
    role: 'assistant',
    content:
      'There are 2 deals flagged as at-risk: Acme Corp ($450K) and Globex Inc ($280K). Both need re-engagement this week.',
  },
]

function PanelWithToggle(props: React.ComponentProps<typeof AssistantPanel>) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ height: '100vh' }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ margin: 16, padding: '8px 16px' }}
      >
        Open Assistant
      </button>
      <AssistantPanel {...props} open={open} onOpenChange={setOpen} />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <PanelWithToggle {...args} />,
  args: {
    open: true,
    title: 'Sales Assistant',
    subtitle: 'Deals module',
    messages: sampleMessages,
  },
}

export const Empty: Story = {
  render: (args) => <PanelWithToggle {...args} />,
  args: {
    open: true,
    title: 'Assistant',
  },
}
