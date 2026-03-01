import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    title: 'Update available',
    description: 'A new campaign version is available.',
    variant: 'info',
    className: 'w-[360px]',
  },
}

export const SuccessWithAction: Story = {
  args: {
    title: 'Saved successfully',
    description: 'Changes were synced to your workspace.',
    variant: 'success',
    action: {
      label: 'View details',
    },
    className: 'w-[360px]',
  },
}

export const Error: Story = {
  args: {
    title: 'Could not publish',
    description: 'Review required fields before continuing.',
    variant: 'error',
    className: 'w-[360px]',
  },
}
