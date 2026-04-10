import { FileText, X } from 'lucide-react'

export interface PendingAttachment {
  file: File
  kind: 'image' | 'file'
  previewUrl?: string
}

export function AttachmentPreviewRow({
  attachments,
  onRemove,
}: {
  attachments: PendingAttachment[]
  onRemove: (index: number) => void
}) {
  if (attachments.length === 0) return null

  return (
    <div className="flex flex-wrap gap-[var(--inkblot-spacing-2)] px-[var(--inkblot-spacing-2)] pb-[var(--inkblot-spacing-2)]">
      {attachments.map((att, i) => (
        <div
          key={`${att.file.name}-${i}-${att.file.size}`}
          className="group relative flex items-center gap-[var(--inkblot-spacing-2)] rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]"
        >
          {att.kind === 'image' && att.previewUrl ? (
            <img
              src={att.previewUrl}
              alt={att.file.name}
              className="h-8 w-8 rounded-[var(--inkblot-radius-sm)] object-cover"
            />
          ) : (
            <FileText
              size={16}
              className="shrink-0 text-[var(--inkblot-semantic-color-text-tertiary)]"
              aria-hidden
            />
          )}
          <span className="max-w-[8rem] truncate text-xs text-[var(--inkblot-semantic-color-text-secondary)]">
            {att.file.name}
          </span>
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="flex h-4 w-4 items-center justify-center rounded-[var(--inkblot-radius-full)] text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)] hover:bg-[var(--inkblot-semantic-color-background-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
            aria-label={`Remove ${att.file.name}`}
          >
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  )
}
