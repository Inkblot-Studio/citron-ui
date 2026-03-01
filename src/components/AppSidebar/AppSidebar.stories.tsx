import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppSidebar } from './AppSidebar'

const meta = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  render: () => {
    const [activePath, setActivePath] = useState('/')
    return (
      <div className="h-[520px] bg-[var(--inkblot-semantic-color-background-primary)]">
        <AppSidebar activePath={activePath} onNavigate={setActivePath} />
      </div>
    )
  },
} satisfies Meta<typeof AppSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ActiveReports: Story = {
  render: () => (
    <div className="h-[520px] bg-[var(--inkblot-semantic-color-background-primary)]">
      <AppSidebar activePath="/reports" />
    </div>
  ),
}
