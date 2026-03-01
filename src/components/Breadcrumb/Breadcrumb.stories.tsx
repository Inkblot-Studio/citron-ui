import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'sales', label: 'Sales', href: '#' },
      { id: 'pipeline', label: 'Pipeline', current: true },
    ],
  },
}

export const WithDisabledStep: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'settings', label: 'Settings', disabled: true },
      { id: 'integrations', label: 'Integrations', current: true },
    ],
  },
}
