import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { InputOtp } from './InputOtp'

const meta = {
  title: 'Components/InputOtp',
  component: InputOtp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputOtp>

export default meta

type Story = StoryObj<typeof meta>

function InputOtpPreview({ disabled = false }: { disabled?: boolean }) {
  const [value, setValue] = useState('')
  return (
    <div className="grid gap-[var(--inkblot-spacing-3)]">
      <InputOtp value={value} onValueChange={setValue} disabled={disabled} />
      <p className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
        Current value: {value || 'empty'}
      </p>
    </div>
  )
}

export const Default: Story = {
  render: () => <InputOtpPreview />,
}

export const Disabled: Story = {
  render: () => <InputOtpPreview disabled />,
}
