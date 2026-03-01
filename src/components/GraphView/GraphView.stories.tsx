import type { Meta, StoryObj } from '@storybook/react-vite'
import { GraphView } from './GraphView'

const meta = {
  title: 'Components/GraphView',
  component: GraphView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GraphView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <GraphView />
    </div>
  ),
}

export const Compact: Story = {
  render: () => (
    <div className="h-[520px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]">
      <GraphView title="Graph Snapshot" />
    </div>
  ),
}
