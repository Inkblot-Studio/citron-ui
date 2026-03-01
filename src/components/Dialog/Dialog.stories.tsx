import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './Dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogDescription>
            Save your latest updates before leaving this screen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose className="bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)] border-transparent hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]">
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const InitiallyOpen: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deployment status</DialogTitle>
          <DialogDescription>
            Your release is running and can be monitored in real time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const confirmRef = useRef<HTMLButtonElement | null>(null)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
        >
          Open controlled dialog
        </button>
        <DialogContent initialFocusRef={confirmRef}>
          <DialogHeader>
            <DialogTitle>Controlled mode</DialogTitle>
            <DialogDescription>
              This dialog is controlled by props and focuses the primary action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <button
              ref={confirmRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-transparent bg-[var(--inkblot-semantic-color-interactive-primary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-inverse)] hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]"
            >
              Continue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
