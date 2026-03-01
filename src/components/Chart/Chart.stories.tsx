import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chart } from './Chart'

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[560px]',
    title: 'Closures by team',
    data: [
      { id: 'north', label: 'North', value: 48 },
      { id: 'south', label: 'South', value: 36 },
      { id: 'east', label: 'East', value: 27 },
      { id: 'west', label: 'West', value: 19 },
    ],
  },
}

export const CompletedGoal: Story = {
  args: {
    className: 'w-[560px]',
    title: 'Goals completed',
    data: [
      {
        id: 'q1',
        label: 'Q1',
        value: 100,
        color: 'var(--inkblot-semantic-color-status-success)',
      },
      {
        id: 'q2',
        label: 'Q2',
        value: 86,
        color: 'var(--inkblot-semantic-color-status-success)',
      },
      {
        id: 'q3',
        label: 'Q3',
        value: 92,
        color: 'var(--inkblot-semantic-color-status-success)',
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    className: 'w-[560px]',
    data: [],
    emptyMessage: 'No data available for this period.',
  },
}
