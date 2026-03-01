import { Copy, PenLine, Trash2 } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextMenu } from './ContextMenu'

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[520px] h-[220px]',
    trigger: (
      <div className="flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-dashed border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Right-click here
      </div>
    ),
    items: [
      {
        id: 'copy',
        label: 'Duplicate',
        icon: <Copy className="h-4 w-4" />,
        shortcut: 'Ctrl+D',
      },
      {
        id: 'rename',
        label: 'Rename',
        icon: <PenLine className="h-4 w-4" />,
        shortcut: 'F2',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        danger: true,
      },
    ],
  },
}

export const WithDisabledItem: Story = {
  args: {
    className: 'w-[520px] h-[220px]',
    trigger: (
      <div className="flex h-full w-full items-center justify-center rounded-[var(--inkblot-radius-lg)] border border-dashed border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
        Right-click here
      </div>
    ),
    items: [
      {
        id: 'copy',
        label: 'Duplicate',
        icon: <Copy className="h-4 w-4" />,
      },
      {
        id: 'rename',
        label: 'Rename',
        icon: <PenLine className="h-4 w-4" />,
        disabled: true,
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        danger: true,
      },
    ],
  },
}
