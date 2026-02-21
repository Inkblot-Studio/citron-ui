import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModuleSkeleton } from './ModuleSkeleton'

const meta = {
  title: 'Components/ModuleSkeleton',
  component: ModuleSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModuleSkeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
