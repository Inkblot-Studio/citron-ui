import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './Drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Drawer side="right">
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter panel</DrawerTitle>
          <DrawerDescription>
            Refine your results using the available options.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Left: Story = {
  render: () => (
    <Drawer side="left">
      <DrawerTrigger>Open Left Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace shortcuts</DrawerTitle>
          <DrawerDescription>
            Pin your most used destinations for faster access.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const closeRef = useRef<HTMLButtonElement | null>(null)

    return (
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerTrigger>Open Controlled Drawer</DrawerTrigger>
        <DrawerContent initialFocusRef={closeRef}>
          <DrawerHeader>
            <DrawerTitle>Controlled drawer</DrawerTitle>
            <DrawerDescription>
              Open state and close behavior are controlled via props.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-interactive-secondary)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}
