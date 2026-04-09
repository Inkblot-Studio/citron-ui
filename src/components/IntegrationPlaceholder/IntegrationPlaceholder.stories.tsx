import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquare, Trello, GitBranch } from 'lucide-react'
import { IntegrationPlaceholder } from './IntegrationPlaceholder'

const meta = {
  title: 'Components/IntegrationPlaceholder',
  component: IntegrationPlaceholder,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IntegrationPlaceholder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Slack',
    description: 'Send notifications and updates directly to your Slack channels.',
    icon: <MessageSquare className="h-5 w-5" />,
    connected: false,
    onConnect: () => console.log('Connect Slack'),
  },
}

export const Connected: Story = {
  args: {
    name: 'Jira',
    description: 'Sync tasks and issues with your Jira projects automatically.',
    icon: <Trello className="h-5 w-5" />,
    connected: true,
    onDisconnect: () => console.log('Disconnect Jira'),
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-[var(--inkblot-spacing-4)]">
      <IntegrationPlaceholder
        name="Slack"
        description="Send notifications and updates directly to your Slack channels."
        icon={<MessageSquare className="h-5 w-5" />}
        onConnect={() => console.log('Connect Slack')}
      />
      <IntegrationPlaceholder
        name="Jira"
        description="Sync tasks and issues with your Jira projects."
        icon={<Trello className="h-5 w-5" />}
        connected
        onDisconnect={() => console.log('Disconnect Jira')}
      />
      <IntegrationPlaceholder
        name="GitHub"
        description="Link pull requests and commits to your workflow."
        icon={<GitBranch className="h-5 w-5" />}
        onConnect={() => console.log('Connect GitHub')}
      />
    </div>
  ),
}
