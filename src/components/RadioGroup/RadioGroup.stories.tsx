import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RadioGroup } from './RadioGroup'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const OPTIONS = [
  {
    value: 'weekly',
    label: 'Weekly digest',
    description: 'Receive one summarized report each week.',
  },
  {
    value: 'daily',
    label: 'Daily updates',
    description: 'Receive updates every day.',
  },
  {
    value: 'off',
    label: 'Muted',
    description: 'No notifications.',
    disabled: true,
  },
]

function RadioPreview() {
  const [value, setValue] = useState('weekly')
  return (
    <div className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*7)]">
      <RadioGroup options={OPTIONS} value={value} onValueChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  render: () => <RadioPreview />,
}

export const Uncontrolled: Story = {
  render: () => (
    <div className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*7)]">
      <RadioGroup options={OPTIONS} defaultValue="daily" />
    </div>
  ),
}
