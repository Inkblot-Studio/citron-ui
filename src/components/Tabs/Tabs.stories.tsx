import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const items = [
  { id: 'overview', label: 'Overview', content: 'Module summary.' },
  { id: 'contacts', label: 'Contacts', content: 'Contacts list.' },
  { id: 'activity', label: 'Activity', content: 'Recent activity.' },
]

export const Default: Story = {
  args: {
    items,
    className: 'w-[420px]',
  },
}

export const FullWidth: Story = {
  args: {
    items,
    fullWidth: true,
    className: 'w-[420px]',
  },
}
