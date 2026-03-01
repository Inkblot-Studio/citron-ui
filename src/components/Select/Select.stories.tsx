import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { value: 'crm', label: 'CRM' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export const Default: Story = {
  args: {
    options,
    defaultValue: 'crm',
  },
}

export const Placeholder: Story = {
  args: {
    options,
    placeholder: 'Select an option',
    defaultValue: '',
  },
}

export const Error: Story = {
  args: {
    options,
    error: true,
    defaultValue: 'sales',
  },
}

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    defaultValue: 'marketing',
  },
}
