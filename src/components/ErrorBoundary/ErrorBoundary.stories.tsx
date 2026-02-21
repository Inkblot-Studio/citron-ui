import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorBoundary } from './ErrorBoundary'

function CrashComponent() {
  throw new Error('Simulated render error')
}

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>

export default meta

type Story = StoryObj<typeof meta>

export const WithCrashedChild: Story = {
  render: () => (
    <ErrorBoundary>
      <CrashComponent />
    </ErrorBoundary>
  ),
}

export const WithHealthyChild: Story = {
  args: {
    children: (
      <div className="rounded-md border border-neutral-gray-200 bg-neutral-gray-50 px-4 py-3 text-neutral-gray-900">
        Renders normally
      </div>
    ),
  },
}
