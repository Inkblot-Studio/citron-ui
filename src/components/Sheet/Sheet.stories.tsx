import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sheet } from './Sheet'

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

export const Right: Story = {
  args: {
    open: true,
    side: 'right',
    title: 'Right panel',
    description: 'This panel opens from the right side.',
    children: (
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Panel content for quick actions.
      </p>
    ),
  },
}

export const Left: Story = {
  args: {
    open: true,
    side: 'left',
    title: 'Left panel',
    children: (
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Panel content for account details.
      </p>
    ),
  },
}

export const Bottom: Story = {
  args: {
    open: true,
    side: 'bottom',
    title: 'Bottom panel',
    children: (
      <p className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Panel content for status updates.
      </p>
    ),
  },
}
