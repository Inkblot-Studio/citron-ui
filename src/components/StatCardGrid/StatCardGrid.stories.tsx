import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCardGrid } from './StatCardGrid'

const meta = {
  title: 'Components/StatCardGrid',
  component: StatCardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
} satisfies Meta<typeof StatCardGrid>

export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_ITEMS = [
  { label: 'Total Sent', value: '12.4K', change: 'This month', changeVariant: 'success' as const },
  { label: 'Avg. Open Rate', value: '64%', change: '+8% vs prior', changeVariant: 'success' as const },
  { label: 'Avg. Click Rate', value: '22%', change: '+3% vs prior', changeVariant: 'success' as const },
  { label: 'Active Automations', value: '7', change: '3 paused', changeVariant: 'error' as const },
]

function StatCardPlaceholder({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div
      className={[
        'rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-subtle)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-4)]',
      ].join(' ')}
    >
      <span className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)] uppercase tracking-wider">
        {label}
      </span>
      <p className="mt-1 [font:var(--inkblot-semantic-typography-heading-medium)] text-[var(--inkblot-semantic-color-text-primary)]">
        {value}
      </p>
    </div>
  )
}

export const WithCustomCards: Story = {
  args: {
    columns: 4,
    children: (
      <>
        {SAMPLE_ITEMS.map((item) => (
          <StatCardPlaceholder key={item.label} label={item.label} value={item.value} />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: (
      <>
        {SAMPLE_ITEMS.slice(0, 2).map((item) => (
          <StatCardPlaceholder key={item.label} label={item.label} value={item.value} />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
