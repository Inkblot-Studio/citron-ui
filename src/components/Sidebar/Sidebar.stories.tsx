import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, Settings, Users } from 'lucide-react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

const baseItems = [
  { id: 'contacts', label: 'Contacts', icon: Users, active: true },
  { id: 'reports', label: 'Reports', icon: BarChart3, badge: <span className="text-xs">12</span> },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export const Default: Story = {
  render: () => (
    <div className="h-[420px]">
      <Sidebar
        header="Citron"
        items={baseItems}
        footer={<p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">v1.0.0</p>}
      />
    </div>
  ),
}

export const Collapsible: Story = {
  render: () => (
    <div className="h-[420px]">
      <Sidebar header="Citron" items={baseItems} collapsed />
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <div className="h-[420px]">
      <Sidebar
        header="Citron"
        items={[
          ...baseItems,
          { id: 'billing', label: 'Billing', icon: Settings, disabled: true },
        ]}
      />
    </div>
  ),
}
