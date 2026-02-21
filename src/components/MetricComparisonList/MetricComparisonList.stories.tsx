import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricComparisonList } from './MetricComparisonList'

const meta = {
  title: 'Intelligence Lab/MetricComparisonList',
  component: MetricComparisonList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricComparisonList>

export default meta

type Story = StoryObj<typeof meta>

export const PipelineStages: Story = {
  args: {
    items: [
      { label: 'Discovery', value: '12', variant: 'success' },
      { label: 'Qualification', value: '8', variant: 'success' },
      { label: 'Proposal', value: '5', variant: 'warning' },
      { label: 'Negotiation', value: '3', variant: 'default' },
      { label: 'Closed Won', value: '24', variant: 'success' },
    ],
  },
}

export const AccountHealth: Story = {
  args: {
    items: [
      { label: 'Engagement Score', value: '92%', variant: 'success' },
      { label: 'Risk Level', value: 'Low', variant: 'success' },
      { label: 'Churn Risk', value: 'Medium', variant: 'warning' },
      { label: 'Growth Potential', value: 'High' },
    ],
  },
}

export const WithArrows: Story = {
  args: {
    items: [
      { label: 'Pipeline Stages' },
      { label: 'Account Health' },
      { label: 'Recent Activity' },
    ],
  },
}
