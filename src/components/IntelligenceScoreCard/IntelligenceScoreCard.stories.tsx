import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntelligenceScoreCard } from './IntelligenceScoreCard'

const meta = {
  title: 'Intelligence Lab/IntelligenceScoreCard',
  component: IntelligenceScoreCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof IntelligenceScoreCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Account Health',
    value: 78,
    subtext: 'Based on engagement',
  },
}

export const WithTrendUp: Story = {
  args: {
    label: 'Pipeline Velocity',
    value: 92,
    subtext: 'vs last quarter',
    trend: 'up',
  },
}

export const WithTrendDown: Story = {
  args: {
    label: 'Risk Score',
    value: 34,
    subtext: 'Requires attention',
    trend: 'down',
  },
}

export const Full: Story = {
  args: {
    label: 'Intelligence Score',
    value: 100,
    subtext: 'Optimal',
    trend: 'up',
  },
}
