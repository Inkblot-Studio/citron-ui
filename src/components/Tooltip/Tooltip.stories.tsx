import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info } from 'lucide-react'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    side: 'top',
    content: 'Contextual information',
    children: (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-3 py-2"
      >
        <Info className="size-4" />
        Hover
      </button>
    ),
  },
}

export const Right: Story = {
  args: {
    side: 'right',
    content: 'Tooltip on the right',
    children: (
      <button
        type="button"
        className="inline-flex items-center rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-3 py-2 text-[var(--inkblot-semantic-color-text-inverse)]"
      >
        Trigger
      </button>
    ),
  },
}

export const Disabled: Story = {
  args: {
    content: 'Not visible',
    disabled: true,
    children: (
      <button
        type="button"
        className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-3 py-2"
      >
        Disabled tooltip
      </button>
    ),
  },
}
