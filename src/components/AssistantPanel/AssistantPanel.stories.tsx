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

function PushLayoutDemo(props: React.ComponentProps<typeof AssistantPanel>) {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]">
      {/* Main content area — resizes when panel opens */}
      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
              Dashboard
            </h1>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-2 text-sm text-[var(--inkblot-semantic-color-text-primary)] transition-colors hover:bg-[var(--inkblot-semantic-color-background-tertiary)]"
            >
              {open ? 'Close' : 'Open'} Assistant
            </button>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-6"
              >
                <div className="mb-2 h-4 w-48 rounded bg-[var(--inkblot-semantic-color-background-tertiary)]" />
                <div className="h-3 w-full rounded bg-[var(--inkblot-semantic-color-background-tertiary)]" />
                <div className="mt-1 h-3 w-3/4 rounded bg-[var(--inkblot-semantic-color-background-tertiary)]" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Panel sits as a flex sibling, pushing main content */}
      <AssistantPanel {...props} open={open} onOpenChange={setOpen} />
    </div>
  )
}

export const PushLayout: Story = {
  render: (args) => <PushLayoutDemo {...args} />,
  args: {
    open: true,
    title: 'Sales Assistant',
    subtitle: 'Deals module',
    messages: sampleMessages,
  },
}

export const Empty: Story = {
  render: (args) => <PushLayoutDemo {...args} />,
  args: {
    open: true,
    title: 'Assistant',
  },
}

export const ClosedByDefault: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[var(--inkblot-semantic-color-background-primary)]">
        <main className="flex-1 overflow-y-auto p-8 transition-all duration-300">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-4 py-2 text-sm text-[var(--inkblot-semantic-color-text-primary)]"
          >
            Open Assistant
          </button>
        </main>
        <AssistantPanel {...args} open={open} onOpenChange={setOpen} />
      </div>
    )
  },
  args: {
    title: 'Assistant',
    messages: sampleMessages,
  },
}
