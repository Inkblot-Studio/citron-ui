import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import { useState } from 'react'
import { ToggleGroup } from './ToggleGroup'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

const items = [
  { id: 'left', label: 'Left', icon: AlignLeft },
  { id: 'center', label: 'Center', icon: AlignCenter },
  { id: 'right', label: 'Right', icon: AlignRight },
]

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState('left')
    return <ToggleGroup type="single" items={items} value={value} onValueChange={setValue} />
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['left', 'right'])
    return <ToggleGroup type="multiple" items={items} value={value} onValueChange={setValue} />
  },
}

export const WithDisabled: Story = {
  args: {
    type: 'single',
    items: [
      ...items.slice(0, 2),
      { id: 'right', label: 'Right', icon: AlignRight, disabled: true },
    ],
    defaultValue: 'center',
  },
}
