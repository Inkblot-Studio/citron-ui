import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModuleContainer } from './ModuleContainer'

const meta = {
  title: 'Components/ModuleContainer',
  component: ModuleContainer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ModuleContainer>

export default meta

type Story = StoryObj<typeof meta>

export const WithContent: Story = {
  args: {
    title: 'Dashboard Module',
    children: (
      <p className="text-[var(--inkblot-semantic-color-text-secondary)]">
        Module content goes here.
      </p>
    ),
  },
}

export const Loading: Story = {
  args: {
    title: 'Loading Module',
    loading: true,
  },
}
