import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModuleErrorBoundary } from './ModuleErrorBoundary'

function CrashComponent() {
  throw new Error('Simulated module render error')
}

const meta = {
  title: 'Components/ModuleErrorBoundary',
  component: ModuleErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModuleErrorBoundary>

export default meta

type Story = StoryObj<typeof meta>

export const WithCrashedChild: Story = {
  render: function Render() {
    const [key, setKey] = useState(0)
    return (
      <ModuleErrorBoundary key={key} onRetry={() => setKey((k) => k + 1)}>
        <CrashComponent />
      </ModuleErrorBoundary>
    )
  },
}

export const WithHealthyChild: Story = {
  args: {
    children: (
      <div className="rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4">
        Module content renders normally
      </div>
    ),
  },
}
