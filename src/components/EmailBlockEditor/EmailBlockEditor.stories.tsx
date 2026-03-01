import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailBlockEditor, type EmailBlock } from './EmailBlockEditor'

const initialBlocks: EmailBlock[] = [
  { id: 'a', type: 'heading', content: 'Quarterly Launch Update' },
  {
    id: 'b',
    type: 'text',
    content: "We're thrilled to share this quarter's highlights and product roadmap.",
  },
  { id: 'c', type: 'button', content: 'Read the full update' },
]

const meta = {
  title: 'Components/EmailBlockEditor',
  component: EmailBlockEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    blocks: initialBlocks,
    onBlocksChange: () => {},
  },
  render: (args) => {
    const [blocks, setBlocks] = useState<EmailBlock[]>(args.blocks ?? initialBlocks)
    return (
      <div className="p-6">
        <EmailBlockEditor {...args} blocks={blocks} onBlocksChange={setBlocks} />
      </div>
    )
  },
} satisfies Meta<typeof EmailBlockEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    blocks: initialBlocks,
  },
}

export const Empty: Story = {
  args: {
    blocks: [],
  },
}

export const ControlledEditingState: Story = {
  render: (args) => {
    const [blocks, setBlocks] = useState<EmailBlock[]>(args.blocks ?? initialBlocks)
    const [editingId, setEditingId] = useState<string | null>(blocks[0]?.id ?? null)

    return (
      <div className="p-6">
        <EmailBlockEditor
          {...args}
          blocks={blocks}
          onBlocksChange={setBlocks}
          editingId={editingId}
          onEditingIdChange={setEditingId}
        />
      </div>
    )
  },
  args: {
    blocks: initialBlocks,
  },
}
