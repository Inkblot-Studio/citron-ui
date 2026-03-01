import type { Meta, StoryObj } from '@storybook/react-vite'
import { Resizable } from './Resizable'

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Resizable>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="h-[calc(var(--inkblot-size-touch-target-min)*6)] w-full max-w-[calc(var(--inkblot-size-touch-target-min)*10)]">
      <Resizable
        primary={
          <div className="h-full rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-primary)]">
            Primary panel
          </div>
        }
        secondary={
          <div className="h-full rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-primary)]">
            Secondary panel
          </div>
        }
      />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-[calc(var(--inkblot-size-touch-target-min)*6)] w-full max-w-[calc(var(--inkblot-size-touch-target-min)*10)]">
      <Resizable
        direction="vertical"
        primary={
          <div className="h-full rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-primary)]">
            Top panel
          </div>
        }
        secondary={
          <div className="h-full rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-primary)]">
            Bottom panel
          </div>
        }
      />
    </div>
  ),
}
