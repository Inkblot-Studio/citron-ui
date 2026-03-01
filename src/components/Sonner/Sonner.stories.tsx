import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sonner } from './Sonner'

const meta = {
  title: 'Components/Sonner',
  component: Sonner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sonner>

export default meta

type Story = StoryObj<typeof meta>

const toasts = [
  {
    id: '1',
    title: 'Sync completed',
    description: 'All contacts were updated.',
    variant: 'success' as const,
  },
  {
    id: '2',
    title: 'Attention required',
    description: 'There are pending approval actions.',
    variant: 'warning' as const,
  },
  {
    id: '3',
    title: 'New insight',
    description: 'A pipeline opportunity was detected.',
    variant: 'info' as const,
  },
]

export const Default: Story = {
  args: {
    toasts,
    maxVisible: 3,
  },
}

export const TopRight: Story = {
  args: {
    toasts: [
      {
        id: '1',
        title: 'Publish complete',
        variant: 'success',
      },
    ],
    position: 'top-right',
  },
}
