import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIComposeInput } from './AIComposeInput'

const meta = {
  title: 'Components/AIComposeInput',
  component: AIComposeInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof AIComposeInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Body',
    placeholder: 'Compose your email or let AI generate content...',
    onWriteWithAI: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const Loading: Story = {
  args: {
    label: 'Body',
    placeholder: 'Compose your email or let AI generate content...',
    loading: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const WithoutAIButton: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Enter your notes...',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
