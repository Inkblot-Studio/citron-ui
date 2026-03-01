import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventFeed } from './EventFeed'

const meta = {
  title: 'Components/EventFeed',
  component: EventFeed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EventFeed>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[420px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]">
      <EventFeed />
    </div>
  ),
}

export const CustomHeader: Story = {
  render: () => (
    <div className="w-[420px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]">
      <EventFeed title="System Events" liveLabel="Realtime" />
    </div>
  ),
}
