import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialog } from './AlertDialog'

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: 'Delete contact?',
    description: 'This action cannot be undone and will remove associated history.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
  },
}

export const Destructive: Story = {
  args: {
    open: true,
    title: 'Delete campaign?',
    description: 'The campaign and its performance metrics will no longer be available.',
    confirmLabel: 'Delete campaign',
    cancelLabel: 'Cancel',
    destructive: true,
  },
}

export const ConfirmDisabled: Story = {
  args: {
    open: true,
    title: 'Publish changes?',
    description: 'Complete required fields before confirming publication.',
    confirmLabel: 'Publish',
    cancelLabel: 'Back',
    confirmDisabled: true,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen p-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-inverse)]"
        >
          Open Alert Dialog
        </button>
        <AlertDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    )
  },
  args: {
    title: 'Confirm update',
    description: 'This change will impact active sequences.',
    confirmLabel: 'Continue',
    cancelLabel: 'Back',
  },
}
