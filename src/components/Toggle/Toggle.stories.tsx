import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, Italic } from 'lucide-react'
import { useState } from 'react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false)
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Bold className="mr-2 size-4" />
        Bold
      </Toggle>
    )
  },
}

export const Pressed: Story = {
  args: {
    pressed: true,
    children: 'Activo',
  },
}

export const Disabled: Story = {
  args: {
    pressed: true,
    disabled: true,
    children: (
      <>
        <Italic className="mr-2 size-4" />
        Disabled
      </>
    ),
  },
}
