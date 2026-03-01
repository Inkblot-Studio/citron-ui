import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppLayout } from './AppLayout'

const meta = {
  title: 'Components/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    children: null,
  },
} satisfies Meta<typeof AppLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          Command Canvas
        </h1>
      </div>
    </AppLayout>
  ),
}

export const WithEventFeed: Story = {
  render: () => (
    <AppLayout showEventFeed>
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
          Events Context
        </h1>
      </div>
    </AppLayout>
  ),
}
