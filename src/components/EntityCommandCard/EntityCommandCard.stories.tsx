import type { Meta, StoryObj } from '@storybook/react-vite'
import { EntityCommandCard } from './EntityCommandCard'

const meta = {
  title: 'Intelligence Lab/EntityCommandCard',
  component: EntityCommandCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityCommandCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Acme Corporation',
  },
}

export const WithInsights: Story = {
  args: {
    title: 'Acme Corporation',
    insights: (
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Strong engagement in last 30 days. 3 deals in pipeline. Recommended next action: schedule executive briefing.
      </p>
    ),
  },
}

export const WithStats: Story = {
  args: {
    title: 'Acme Corporation',
    stats: [
      { label: 'Contacts', value: 12 },
      { label: 'Deals', value: 3 },
      { label: 'Activities', value: 28 },
    ],
  },
}

export const Full: Story = {
  args: {
    title: 'Acme Corporation',
    insights: (
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Strong engagement. 3 deals in pipeline.
      </p>
    ),
    stats: [
      { label: 'Contacts', value: 12 },
      { label: 'Deals', value: 3 },
      { label: 'Activities', value: 28 },
    ],
    commandValue: '',
    onCommandChange: () => {},
    onCommandSubmit: () => {},
  },
}
