import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil, Trash2, Copy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './DropdownMenu'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuContent>
        <DropdownMenuItem
          icon={
            <Pencil
              style={{
                width: 'var(--inkblot-spacing-4)',
                height: 'var(--inkblot-spacing-4)',
              }}
            />
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={
            <Copy
              style={{
                width: 'var(--inkblot-spacing-4)',
                height: 'var(--inkblot-spacing-4)',
              }}
            />
          }
        >
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          icon={
            <Trash2
              style={{
                width: 'var(--inkblot-spacing-4)',
                height: 'var(--inkblot-spacing-4)',
              }}
            />
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const OpenByDefault: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuContent>
        <DropdownMenuItem>Active</DropdownMenuItem>
        <DropdownMenuItem>Paused</DropdownMenuItem>
        <DropdownMenuItem>Archived</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
