import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Write a message...',
    className: 'w-[360px]',
  },
}

export const Error: Story = {
  args: {
    placeholder: 'This field has an error',
    error: true,
    className: 'w-[360px]',
  },
}

export const Disabled: Story = {
  args: {
    value: 'Locked content',
    disabled: true,
    className: 'w-[360px]',
  },
}
