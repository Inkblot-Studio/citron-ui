import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

function BaseCard({ interactive, disabled }: { interactive?: boolean; disabled?: boolean }) {
  return (
    <Card className="w-[420px]" interactive={interactive} disabled={disabled}>
      <CardHeader>
        <CardTitle>Quarter revenue</CardTitle>
        <CardDescription>Comparison versus the previous period.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">$128,450</div>
      </CardContent>
      <CardFooter>
        <button
          type="button"
          className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)] text-sm font-medium text-[var(--inkblot-semantic-color-text-inverse)]"
        >
          View details
        </button>
      </CardFooter>
    </Card>
  )
}

export const Default: Story = {
  render: () => <BaseCard />,
}

export const HoverActive: Story = {
  render: () => <BaseCard interactive />,
}

export const Disabled: Story = {
  render: () => <BaseCard disabled />,
}
