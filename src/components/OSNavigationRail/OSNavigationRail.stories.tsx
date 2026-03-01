import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, Home, Search, Settings } from 'lucide-react'
import { OSNavigationRail } from './OSNavigationRail'

const meta = {
  title: 'Intelligence Lab/OSNavigationRail',
  component: OSNavigationRail,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof OSNavigationRail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: 'home', icon: <Home />, label: 'Home', active: true },
      { id: 'search', icon: <Search />, label: 'Search' },
      { id: 'chart', icon: <BarChart3 />, label: 'Insights' },
      { id: 'settings', icon: <Settings />, label: 'Settings' },
    ],
  },
}

export const IconsOnly: Story = {
  args: {
    items: [
      { id: 'home', icon: <Home />, active: true },
      { id: 'search', icon: <Search /> },
      { id: 'chart', icon: <BarChart3 /> },
      { id: 'settings', icon: <Settings /> },
    ],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [active, setActive] = useState('home')
    return (
      <OSNavigationRail
        {...args}
        activeItemId={active}
        onActiveItemChange={(nextId) => setActive(nextId)}
      />
    )
  },
  args: {
    items: [
      { id: 'home', icon: <Home />, label: 'Home' },
      { id: 'search', icon: <Search />, label: 'Search' },
      { id: 'chart', icon: <BarChart3 />, label: 'Insights' },
      { id: 'settings', icon: <Settings />, label: 'Settings' },
    ],
  },
}
