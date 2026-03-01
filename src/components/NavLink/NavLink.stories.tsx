import { MessageSquare } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from './NavLink'

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Canvas',
    icon: MessageSquare,
  },
} satisfies Meta<typeof NavLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
  args: {
    active: true,
  },
}
