import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Receive notifications',
    description: 'Updates will be sent by email.',
  },
}

export const Completed: Story = {
  args: {
    label: 'Task completed',
    description: 'The task is marked as done.',
    checked: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Accept terms',
    description: 'This field is required.',
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Locked option',
    description: 'Not available on your current plan.',
    disabled: true,
  },
}
