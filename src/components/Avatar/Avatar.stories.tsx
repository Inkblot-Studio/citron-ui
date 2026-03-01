import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    alt: 'User avatar',
    size: 'md',
  },
}

export const Fallback: Story = {
  args: {
    fallback: 'AL',
    size: 'md',
  },
}

export const Disabled: Story = {
  args: {
    fallback: 'AL',
    disabled: true,
    size: 'md',
  },
}
