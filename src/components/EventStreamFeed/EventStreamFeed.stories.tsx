import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventStreamFeed } from './EventStreamFeed'

const meta = {
  title: 'Intelligence Lab/EventStreamFeed',
  component: EventStreamFeed,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof EventStreamFeed>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    events: [
      { id: '1', title: 'Email sent to Jane Doe', timestamp: '2h ago', status: 'success' },
      { id: '2', title: 'Meeting scheduled with Acme Corp', timestamp: '5h ago', status: 'info' },
      { id: '3', title: 'Deal stage changed to Negotiation', timestamp: '1d ago', status: 'warning' },
      { id: '4', title: 'Contact import failed', timestamp: '2d ago', status: 'error' },
    ],
  },
}
