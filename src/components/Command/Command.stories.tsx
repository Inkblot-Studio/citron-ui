import { CalendarRange, FileText, Settings, UserRound } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Command } from './Command'

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

const commandItems = [
  { id: 'contacts', label: 'Open contacts', icon: <UserRound className="h-4 w-4" /> },
  { id: 'reports', label: 'Go to reports', icon: <FileText className="h-4 w-4" /> },
  {
    id: 'calendar',
    label: 'Schedule meeting',
    keywords: ['meeting', 'agenda'],
    icon: <CalendarRange className="h-4 w-4" />,
  },
  {
    id: 'settings',
    label: 'Advanced settings',
    icon: <Settings className="h-4 w-4" />,
    disabled: true,
  },
]

export const Default: Story = {
  args: {
    items: commandItems,
    className: 'w-[520px]',
  },
}

export const DisabledItem: Story = {
  args: {
    items: commandItems,
    className: 'w-[520px]',
  },
}

export const EmptyState: Story = {
  args: {
    items: [],
    className: 'w-[520px]',
  },
}
