import type { Meta, StoryObj } from '@storybook/react-vite'
import { Compass, BarChart3, Settings } from 'lucide-react'
import { NavigationMenu } from './NavigationMenu'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>

export default meta

type Story = StoryObj<typeof meta>

const ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    active: true,
    icon: (
      <Compass
        style={{
          width: 'var(--inkblot-spacing-4)',
          height: 'var(--inkblot-spacing-4)',
        }}
      />
    ),
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (
      <BarChart3
        style={{
          width: 'var(--inkblot-spacing-4)',
          height: 'var(--inkblot-spacing-4)',
        }}
      />
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    disabled: true,
    icon: (
      <Settings
        style={{
          width: 'var(--inkblot-spacing-4)',
          height: 'var(--inkblot-spacing-4)',
        }}
      />
    ),
  },
]

export const Default: Story = {
  args: {
    items: ITEMS,
  },
}

export const Compact: Story = {
  args: {
    items: ITEMS.map((item) => ({ ...item, active: false })),
  },
}
