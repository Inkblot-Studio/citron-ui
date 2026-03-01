import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from './AspectRatio'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

export const Video: Story = {
  args: {
    ratio: 16 / 9,
    className: 'w-[520px] rounded-[var(--inkblot-radius-lg)]',
    children: (
      <div className="flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)]">
        Vista 16:9
      </div>
    ),
  },
}

export const Square: Story = {
  args: {
    ratio: 1,
    className: 'w-[320px] rounded-[var(--inkblot-radius-lg)]',
    children: (
      <div className="flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)]">
        Vista 1:1
      </div>
    ),
  },
}
