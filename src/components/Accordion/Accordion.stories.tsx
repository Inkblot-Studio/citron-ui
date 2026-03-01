import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

const defaultItems = [
  {
    id: 'item-1',
    title: 'Sales pipeline',
    content: 'Summary of opportunity status for the current quarter.',
  },
  {
    id: 'item-2',
    title: 'Recent activity',
    content: 'Email, call, and meeting interactions from this week.',
  },
  {
    id: 'item-3',
    title: 'Critical alerts',
    content: 'Customers with high churn risk and open support tickets.',
  },
]

export const Default: Story = {
  args: {
    items: defaultItems,
    className: 'w-[520px]',
  },
}

export const OpenByDefault: Story = {
  args: {
    items: defaultItems,
    defaultValue: ['item-1'],
    className: 'w-[520px]',
  },
}

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...defaultItems.slice(0, 2),
      {
        id: 'item-3',
        title: 'Critical alerts',
        content: 'Customers with high churn risk and open support tickets.',
        disabled: true,
      },
    ],
    className: 'w-[520px]',
  },
}
