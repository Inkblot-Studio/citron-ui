import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TabSystem } from './TabSystem'

const meta = {
  title: 'Components/TabSystem',
  component: TabSystem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeTabId: { control: false },
  },
} satisfies Meta<typeof TabSystem>

export default meta

type Story = StoryObj<typeof meta>

const EMAIL_TABS = [
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'templates', label: 'Templates' },
  { id: 'compose', label: 'Compose' },
]

function TabSystemInteractive() {
  const [activeTabId, setActiveTabId] = useState('campaigns')
  return (
    <TabSystem
      tabs={EMAIL_TABS}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    />
  )
}

export const EmailCampaigns: Story = {
  render: () => <TabSystemInteractive />,
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const CampaignsActive: Story = {
  args: {
    tabs: EMAIL_TABS,
    activeTabId: 'campaigns',
    onTabChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const TemplatesActive: Story = {
  args: {
    tabs: EMAIL_TABS,
    activeTabId: 'templates',
    onTabChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const ComposeActive: Story = {
  args: {
    tabs: EMAIL_TABS,
    activeTabId: 'compose',
    onTabChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
