import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster, type ToasterItem } from './Toaster'

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

const initialToasts: ToasterItem[] = [
  {
    id: '1',
    title: 'Campaign created',
    description: 'Your new campaign is ready.',
    variant: 'success',
  },
  {
    id: '2',
    title: 'Integration disconnected',
    description: 'Reconnect to continue syncing.',
    variant: 'warning',
  },
]

export const Default: Story = {
  render: (args) => (
    <div className="min-h-[360px] p-6">
      <Toaster {...args} />
    </div>
  ),
  args: {
    toasts: initialToasts,
  },
}

export const TopLeft: Story = {
  render: (args) => (
    <div className="min-h-[360px] p-6">
      <Toaster {...args} />
    </div>
  ),
  args: {
    toasts: initialToasts,
    position: 'top-left',
  },
}
