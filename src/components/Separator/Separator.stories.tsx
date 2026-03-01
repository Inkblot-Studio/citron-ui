import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-[320px] space-y-3">
      <p className="text-[var(--inkblot-semantic-color-text-primary)]">Top block</p>
      <Separator {...args} />
      <p className="text-[var(--inkblot-semantic-color-text-secondary)]">Bottom block</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-[80px] items-center gap-3">
      <span className="text-[var(--inkblot-semantic-color-text-primary)]">Left</span>
      <Separator {...args} />
      <span className="text-[var(--inkblot-semantic-color-text-primary)]">Right</span>
    </div>
  ),
}
