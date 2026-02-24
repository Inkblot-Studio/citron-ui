import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionButtons, EmailComposeActionButtons } from './ActionButtons'

const meta = {
  title: 'Components/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionButtons>

export default meta

type Story = StoryObj<typeof meta>

export const EmailCompose: Story = {
  render: () => (
    <EmailComposeActionButtons
      onSendNow={() => {}}
      onSchedule={() => {}}
      onSaveDraft={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const Custom: Story = {
  args: {
    buttons: [
      {
        id: 'primary',
        label: 'Primary Action',
        variant: 'primary',
        onClick: () => {},
      },
      {
        id: 'secondary',
        label: 'Secondary',
        variant: 'secondary',
        onClick: () => {},
      },
      {
        id: 'disabled',
        label: 'Disabled',
        variant: 'secondary',
        disabled: true,
        onClick: () => {},
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
