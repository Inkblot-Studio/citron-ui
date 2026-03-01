import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const FortyPercent: Story = {
  args: {
    value: 40,
    showValueLabel: true,
    className: 'w-full max-w-[calc(var(--inkblot-size-touch-target-min)*6)]',
  },
}

export const Completed: Story = {
  args: {
    value: 100,
    showValueLabel: true,
    className: 'w-full max-w-[calc(var(--inkblot-size-touch-target-min)*6)]',
  },
}
