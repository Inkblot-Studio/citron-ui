import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskCreateForm } from './TaskCreateForm'

const meta = {
  title: 'Components/TaskCreateForm',
  component: TaskCreateForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskCreateForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onConfirm: (p) => console.log('Task created:', p),
    onCancel: () => console.log('Canceled'),
  },
  decorators: [
    (Story) => (
      <div className="w-96 bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
