import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCards, StatCardsWithChart } from './StatCards'

const meta = {
  title: 'Components/StatCards',
  component: StatCards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCards>

export default meta

type Story = StoryObj<typeof meta>

const EMAIL_CAMPAIGN_STATS = [
  {
    label: 'Total Sent',
    value: '12.4K',
    change: 'This month',
    changeVariant: 'success' as const,
  },
  {
    label: 'Avg. Open Rate',
    value: '64%',
    change: '+8% vs prior',
    changeVariant: 'success' as const,
  },
  {
    label: 'Avg. Click Rate',
    value: '22%',
    change: '+3% vs prior',
    changeVariant: 'success' as const,
  },
  {
    label: 'Active Automations',
    value: '7',
    change: '3 paused',
    changeVariant: 'error' as const,
  },
]

export const EmailCampaigns: Story = {
  args: {
    items: EMAIL_CAMPAIGN_STATS,
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const WithCharts: Story = {
  render: () => (
    <StatCardsWithChart
      items={[
        {
          ...EMAIL_CAMPAIGN_STATS[0],
          chartData: [40, 65, 45, 80, 55, 70, 90],
        },
        {
          ...EMAIL_CAMPAIGN_STATS[1],
          chartData: [50, 55, 60, 58, 64, 62, 64],
        },
        {
          ...EMAIL_CAMPAIGN_STATS[2],
          chartData: [18, 20, 22, 19, 21, 23, 22],
        },
        {
          ...EMAIL_CAMPAIGN_STATS[3],
          chartData: [5, 6, 7, 6, 7, 7, 7],
        },
      ]}
    />
  ),
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const NeutralChanges: Story = {
  args: {
    items: [
      { label: 'Total Users', value: '1,234', change: 'No change', changeVariant: 'neutral' },
      { label: 'Conversion', value: '4.2%', change: '0% vs prior', changeVariant: 'neutral' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
