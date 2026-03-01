import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './ScrollArea'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea
      maxHeight="calc(var(--inkblot-size-touch-target-min)*4)"
      className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*7)]"
    >
      <div className="grid gap-[var(--inkblot-spacing-2)]">
        {Array.from({ length: 16 }, (_, index) => (
          <div
            key={`item-${index + 1}`}
            className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-primary)]"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Tight: Story = {
  render: () => (
    <ScrollArea
      maxHeight="calc(var(--inkblot-size-touch-target-min)*3)"
      className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*7)]"
    >
      <p className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
        This area limits visible content and keeps vertical scroll behavior.
      </p>
      <p className="mt-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor
        convallis sapien, non faucibus mauris sodales sit amet.
      </p>
      <p className="mt-[var(--inkblot-spacing-3)] text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
        Integer blandit est id massa pellentesque, nec volutpat orci pulvinar.
      </p>
    </ScrollArea>
  ),
}
