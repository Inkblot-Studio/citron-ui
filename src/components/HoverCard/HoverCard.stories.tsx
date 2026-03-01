import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserRound } from 'lucide-react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-primary)]"
      >
        <UserRound
          style={{
            width: 'var(--inkblot-spacing-4)',
            height: 'var(--inkblot-spacing-4)',
          }}
        />
        Hover profile
      </HoverCardTrigger>
      <HoverCardContent>
        <h3 className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]">
          Citron Workspace
        </h3>
        <p className="mt-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
          Collaboration context, ownership and last activity details.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithDelays: Story = {
  render: () => (
    <HoverCard openDelay={260} closeDelay={260}>
      <HoverCardTrigger
        className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center rounded-[var(--inkblot-radius-lg)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-inverse)]"
      >
        Delayed hover
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]">
          This card uses a longer enter and leave delay.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}
