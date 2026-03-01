import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircularScore } from './CircularScore'

const meta = {
  title: 'Components/CircularScore',
  component: CircularScore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Revenue Confidence',
    value: 82,
    tone: 'success',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'primary'],
    },
  },
} satisfies Meta<typeof CircularScore>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Warning: Story = {
  args: {
    label: 'Churn Risk',
    value: 37,
    tone: 'warning',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Deliverability',
    value: 18,
    tone: 'error',
  },
}
