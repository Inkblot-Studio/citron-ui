import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverClose } from './Popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverContent>
        <div className="grid gap-[var(--inkblot-spacing-3)]">
          <p className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]">
            New notifications available.
          </p>
          <PopoverClose>Dismiss</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const IconTrigger: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverContent>
        <div className="flex items-start gap-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
          <Bell
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
          <span>You have 3 unresolved reminders in this workspace.</span>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
