import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)
    return <Switch checked={checked} onCheckedChange={setChecked} />
  },
}

export const Unchecked: Story = {
  args: {
    defaultChecked: false,
  },
}

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
