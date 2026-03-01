import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible } from './Collapsible'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Account details',
    children: 'Enterprise account with 12 active users and auto-renew enabled.',
    className: 'w-[520px]',
  },
}

export const Open: Story = {
  args: {
    title: 'Account details',
    children: 'Enterprise account with 12 active users and auto-renew enabled.',
    defaultOpen: true,
    className: 'w-[520px]',
  },
}

export const Disabled: Story = {
  args: {
    title: 'Account details',
    children: 'Enterprise account with 12 active users and auto-renew enabled.',
    disabled: true,
    className: 'w-[520px]',
  },
}
