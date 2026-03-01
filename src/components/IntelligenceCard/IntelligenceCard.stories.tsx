import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntelligenceCard } from './IntelligenceCard'

const meta = {
  title: 'Components/IntelligenceCard',
  component: IntelligenceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IntelligenceCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const RiskHeavy: Story = {
  args: {
    items: [
      { label: 'Revenue Confidence', value: 54, tone: 'warning' },
      { label: 'Churn Risk', value: 78, tone: 'error' },
      { label: 'Momentum', value: 41, tone: 'warning' },
    ],
  },
}
