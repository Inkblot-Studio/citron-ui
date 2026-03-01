import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Save, FilePenLine, Trash2 } from 'lucide-react'
import {
  Menubar,
  MenubarItem,
  MenubarSeparator,
} from './Menubar'

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarItem
        icon={
          <Save
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
        }
      >
        Save
      </MenubarItem>
      <MenubarItem
        icon={
          <Download
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
        }
      >
        Export
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem
        icon={
          <FilePenLine
            style={{
              width: 'var(--inkblot-spacing-4)',
              height: 'var(--inkblot-spacing-4)',
            }}
          />
        }
      >
        Rename
      </MenubarItem>
      <MenubarItem
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
      </MenubarItem>
    </Menubar>
  ),
}

export const Compact: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>Grid</MenubarItem>
      <MenubarItem>List</MenubarItem>
    </Menubar>
  ),
}
