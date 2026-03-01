import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'An update is available',
    description: 'A new version of the intelligence module has been released.',
    variant: 'info',
    className: 'w-[520px]',
  },
}

export const Success: Story = {
  args: {
    title: 'Automation completed',
    description: 'The sequence finished without errors.',
    variant: 'success',
    className: 'w-[520px]',
  },
}

export const Warning: Story = {
  args: {
    title: 'Review settings',
    description: 'Required fields are missing before publishing the campaign.',
    variant: 'warning',
    className: 'w-[520px]',
  },
}

export const Error: Story = {
  args: {
    title: 'Could not save',
    description: 'Please try again in a few minutes.',
    variant: 'error',
    className: 'w-[520px]',
  },
}
