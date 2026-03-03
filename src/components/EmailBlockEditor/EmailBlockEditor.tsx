import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Columns, GripVertical, Image, Minus, MousePointerClick, Square, Trash2, Type } from 'lucide-react'
import { cn } from '../../utils/cn'

export type BlockType = 'heading' | 'text' | 'image' | 'button' | 'divider' | 'columns'

export interface EmailBlock {
  id: string
  type: BlockType
  content: string
}

export interface EmailBlockEditorProps {
  blocks: EmailBlock[]
  onBlocksChange: (blocks: EmailBlock[]) => void
  availableBlockTypes?: BlockType[]
  editingId?: string | null
  onEditingIdChange?: (editingId: string | null) => void
  onAddBlock?: (type: BlockType, block: EmailBlock) => void
  onDeleteBlock?: (id: string) => void
  onMoveBlock?: (id: string, direction: -1 | 1) => void
  onBlockContentChange?: (id: string, content: string) => void
  readOnly?: boolean
  className?: string
}

interface BlockTypeConfig {
  type: BlockType
  label: string
  icon: typeof Type
}

const blockTypeConfig: BlockTypeConfig[] = [
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'button', label: 'Button', icon: Square },
  { type: 'divider', label: 'Divider', icon: Minus },
  { type: 'columns', label: '2 Columns', icon: Columns },
]

const defaultContentByType: Record<BlockType, string> = {
  heading: 'Your Heading Here',
  text: 'Write your content here. Click to edit this text block.',
  image: 'https://placehold.co/600x200',
  button: 'Click Me',
  divider: '',
  columns: 'Column 1 | Column 2',
}

export function EmailBlockEditor({
  blocks,
  onBlocksChange,
  availableBlockTypes,
  editingId,
  onEditingIdChange,
  onAddBlock,
  onDeleteBlock,
  onMoveBlock,
  onBlockContentChange,
  readOnly = false,
  className,
}: EmailBlockEditorProps) {
  const [internalEditingId, setInternalEditingId] = useState<string | null>(null)
  const isEditingControlled = editingId !== undefined
  const currentEditingId = isEditingControlled ? editingId : internalEditingId

  const setEditingId = (nextEditingId: string | null) => {
    if (!isEditingControlled) {
      setInternalEditingId(nextEditingId)
    }
    onEditingIdChange?.(nextEditingId)
  }

  const visibleBlockTypes = useMemo(() => {
    if (!availableBlockTypes || availableBlockTypes.length === 0) {
      return blockTypeConfig
    }
    return blockTypeConfig.filter((item) => availableBlockTypes.includes(item.type))
  }, [availableBlockTypes])

  const blockIndexById = useMemo(
    () =>
      blocks.reduce<Record<string, number>>((result, block, index) => {
        result[block.id] = index
        return result
      }, {}),
    [blocks]
  )

  const addBlock = (type: BlockType) => {
    if (readOnly) {
      return
    }
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      content: defaultContentByType[type],
    }
    onBlocksChange([...blocks, newBlock])
    onAddBlock?.(type, newBlock)
  }

  const updateBlockContent = (id: string, content: string) => {
    if (readOnly) {
      return
    }
    onBlocksChange(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
    onBlockContentChange?.(id, content)
  }

  const deleteBlock = (id: string) => {
    if (readOnly) {
      return
    }
    onBlocksChange(blocks.filter((block) => block.id !== id))
    onDeleteBlock?.(id)
  }

  const moveBlock = (id: string, direction: -1 | 1) => {
    if (readOnly) {
      return
    }
    const currentIndex = blockIndexById[id]
    const nextIndex = currentIndex + direction
    if (nextIndex < 0 || nextIndex >= blocks.length) {
      return
    }
    const next = [...blocks]
    const [picked] = next.splice(currentIndex, 1)
    next.splice(nextIndex, 0, picked)
    onBlocksChange(next)
    onMoveBlock?.(id, direction)
  }

  return (
    <section className={cn('flex gap-4', className)}>
      <aside className="w-44 shrink-0">
        <span className="text-[10px] uppercase tracking-wide text-[var(--inkblot-semantic-color-text-tertiary)]">
          Blocks
        </span>
        <div className="mt-2 space-y-1">
          {visibleBlockTypes.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => addBlock(item.type)}
              disabled={readOnly}
              className="flex w-full items-center gap-2 rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-3 py-2 text-xs text-[var(--inkblot-semantic-color-text-primary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]"
            >
              <item.icon className="h-3.5 w-3.5 text-[var(--inkblot-semantic-color-text-tertiary)]" />
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      <div className="glass min-h-[400px] flex-1 rounded-[var(--inkblot-radius-lg)] p-6">
        {blocks.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <MousePointerClick className="h-8 w-8 text-[var(--inkblot-semantic-color-text-tertiary)]/40" />
            <div>
              <p className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
                Drop blocks here to build your email
              </p>
              <p className="mt-1 text-[10px] text-[var(--inkblot-semantic-color-text-tertiary)]/60">
                or use AI to generate a full layout
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {blocks.map((block, index) => (
              <article key={block.id} className="group flex items-start gap-2">
                <div className="pt-1 text-[var(--inkblot-semantic-color-text-tertiary)]">
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 rounded-[var(--inkblot-radius-md)] border border-transparent p-3 transition-colors duration-[var(--inkblot-duration-fast)] group-hover:border-[var(--inkblot-semantic-color-border-default)]">
                  {block.type === 'heading' ? (
                    <h2
                      contentEditable={!readOnly && currentEditingId === block.id}
                      suppressContentEditableWarning
                      onClick={() => {
                        if (!readOnly) {
                          setEditingId(block.id)
                        }
                      }}
                      onBlur={(event) => {
                        updateBlockContent(block.id, event.currentTarget.textContent ?? '')
                        setEditingId(null)
                      }}
                      className="cursor-text text-xl font-bold text-[var(--inkblot-semantic-color-text-primary)] outline-none"
                    >
                      {block.content}
                    </h2>
                  ) : null}
                  {block.type === 'text' ? (
                    <p
                      contentEditable={!readOnly && currentEditingId === block.id}
                      suppressContentEditableWarning
                      onClick={() => {
                        if (!readOnly) {
                          setEditingId(block.id)
                        }
                      }}
                      onBlur={(event) => {
                        updateBlockContent(block.id, event.currentTarget.textContent ?? '')
                        setEditingId(null)
                      }}
                      className="cursor-text text-sm leading-relaxed text-[var(--inkblot-semantic-color-text-secondary)] outline-none"
                    >
                      {block.content}
                    </p>
                  ) : null}
                  {block.type === 'image' ? (
                    <div className="flex h-32 items-center justify-center overflow-hidden rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)]">
                      <Image className="h-8 w-8 text-[var(--inkblot-semantic-color-text-tertiary)]/50" />
                    </div>
                  ) : null}
                  {block.type === 'button' ? (
                    <div className="flex justify-center">
                      <span
                        contentEditable={!readOnly && currentEditingId === block.id}
                        suppressContentEditableWarning
                        onClick={() => {
                          if (!readOnly) {
                            setEditingId(block.id)
                          }
                        }}
                        onBlur={(event) => {
                          updateBlockContent(block.id, event.currentTarget.textContent ?? '')
                          setEditingId(null)
                        }}
                        className="cursor-text rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-interactive-primary)] px-6 py-2.5 text-sm font-medium text-[var(--inkblot-semantic-color-text-inverse)] outline-none"
                      >
                        {block.content}
                      </span>
                    </div>
                  ) : null}
                  {block.type === 'divider' ? (
                    <hr className="my-2 border-[var(--inkblot-semantic-color-border-default)]" />
                  ) : null}
                  {block.type === 'columns' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-4 text-center text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
                        Column 1
                      </div>
                      <div className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-4 text-center text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
                        Column 2
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 opacity-0 transition-opacity duration-[var(--inkblot-duration-fast)] group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => moveBlock(block.id, -1)}
                    disabled={readOnly || index === 0}
                    className="rounded-[var(--inkblot-radius-sm)] p-1 text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(block.id, 1)}
                    disabled={readOnly || index === blocks.length - 1}
                    className="rounded-[var(--inkblot-radius-sm)] p-1 text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBlock(block.id)}
                    disabled={readOnly}
                    className="rounded-[var(--inkblot-radius-sm)] p-1 text-[var(--inkblot-semantic-color-status-error)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-status-error)]/10"
                    aria-label="Delete block"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
