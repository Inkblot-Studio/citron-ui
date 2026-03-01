import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(45)
    return <Slider value={value} onValueChange={setValue} className="w-[320px]" />
  },
}

export const FineStep: Story = {
  render: () => {
    const [value, setValue] = useState(2.5)
    return (
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={5}
        step={0.5}
        className="w-[320px]"
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 65,
    disabled: true,
    className: 'w-[320px]',
  },
}
