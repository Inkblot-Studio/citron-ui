import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

function CalendarWithState() {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  return <Calendar value={selected} onChange={setSelected} />
}

export const Default: Story = {
  render: () => <CalendarWithState />,
}

export const WithDisabledDates: Story = {
  args: {
    value: new Date(2026, 2, 9),
    disabledDates: [new Date(2026, 2, 8), new Date(2026, 2, 12), new Date(2026, 2, 16)],
  },
}
