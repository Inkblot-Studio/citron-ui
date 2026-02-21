import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
}

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
}

export const Error: Story = {
  args: { label: 'Error', variant: 'error' },
}

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
}
