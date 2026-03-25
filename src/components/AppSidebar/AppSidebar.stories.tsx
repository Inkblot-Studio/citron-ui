import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '../ThemeProvider'
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
      <ThemeProvider>
        <div className="h-[520px] bg-[var(--inkblot-semantic-color-background-primary)]">
          <AppSidebar activePath={activePath} onNavigate={setActivePath} />
        </div>
      </ThemeProvider>
    )
  },
} satisfies Meta<typeof AppSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ActiveReports: Story = {
  render: () => (
    <ThemeProvider>
      <div className="h-[520px] bg-[var(--inkblot-semantic-color-background-primary)]">
        <AppSidebar activePath="/reports" />
      </div>
    </ThemeProvider>
  ),
}
