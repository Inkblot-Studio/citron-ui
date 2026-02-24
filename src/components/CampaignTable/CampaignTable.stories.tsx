import type { Meta, StoryObj } from '@storybook/react-vite'
import { CampaignTable } from './CampaignTable'
import type { CampaignTableRow } from './CampaignTable'

const meta = {
  title: 'Components/CampaignTable',
  component: CampaignTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CampaignTable>

export default meta

type Story = StoryObj<typeof meta>

const COLUMNS = [
  { key: 'campaign', label: 'Campaign' },
  { key: 'status', label: 'Status' },
  { key: 'opens', label: 'Opens' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'date', label: 'Date' },
]

const SAMPLE_ROWS: CampaignTableRow[] = [
  {
    id: '1',
    campaignName: 'Q1 Product Launch',
    recipients: '2840 recipients',
    status: 'sent',
    opens: '68%',
    clicks: '24%',
    date: 'Feb 12, 2026',
  },
  {
    id: '2',
    campaignName: 'Welcome Series',
    recipients: '1200 recipients',
    status: 'active',
    statusSubtext: 'Running',
    opens: '-',
    clicks: '-',
    date: 'Feb 28, 2026',
  },
  {
    id: '3',
    campaignName: 'Re-engagement Campaign',
    recipients: '890 recipients',
    status: 'draft',
    opens: '-',
    clicks: '-',
    date: 'Feb 5, 2026',
  },
  {
    id: '4',
    campaignName: 'Holiday Promo',
    recipients: '4500 recipients',
    status: 'scheduled',
    opens: '-',
    clicks: '-',
    date: 'Mar 1, 2026',
  },
]

export const Default: Story = {
  args: {
    columns: COLUMNS,
    rows: SAMPLE_ROWS,
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const SingleRow: Story = {
  args: {
    columns: COLUMNS,
    rows: [SAMPLE_ROWS[0]],
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
