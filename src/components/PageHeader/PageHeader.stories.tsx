import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail } from 'lucide-react'
import { PageHeader, PageHeaderActionButton } from './PageHeader'

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof PageHeader>

export default meta

type Story = StoryObj<typeof meta>

export const EmailCampaigns: Story = {
  args: {
    title: 'Email Campaigns',
    subtitle: 'Automate outreach · AI-powered templates',
    icon: <Mail className="h-5 w-5" />,
    action: (
      <PageHeaderActionButton
        label="New Campaign"
        onClick={() => {}}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const WithoutIcon: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your metrics and activity',
    action: (
      <PageHeaderActionButton
        label="Create"
        onClick={() => {}}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const Minimal: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Manage your account preferences',
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
