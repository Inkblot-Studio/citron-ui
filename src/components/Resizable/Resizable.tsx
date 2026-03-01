import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { GripVertical, GripHorizontal } from 'lucide-react'
import { cn } from '../../utils/cn'

type ResizableDirection = 'horizontal' | 'vertical'

export interface ResizableProps {
  primary: ReactNode
  secondary: ReactNode
  direction?: ResizableDirection
  defaultPrimarySize?: number
  minPrimarySize?: number
  minSecondarySize?: number
  className?: string
}

export function Resizable({
  primary,
  secondary,
  direction = 'horizontal',
  defaultPrimarySize = 50,
  minPrimarySize = 20,
  minSecondarySize = 20,
  className,
}: ResizableProps) {
  const [primarySize, setPrimarySize] = useState(defaultPrimarySize)

  const isHorizontal = direction === 'horizontal'

  const styles = useMemo(() => {
    if (isHorizontal) {
      return {
        gridTemplateColumns: `${primarySize}fr auto ${100 - primarySize}fr`,
      }
    }
    return {
      gridTemplateRows: `${primarySize}fr auto ${100 - primarySize}fr`,
    }
  }, [isHorizontal, primarySize])

  const updateFromPointer = (
    pointerPosition: { x: number; y: number },
    container: HTMLDivElement
  ) => {
    const rect = container.getBoundingClientRect()
    const ratio = isHorizontal
      ? ((pointerPosition.x - rect.left) / rect.width) * 100
      : ((pointerPosition.y - rect.top) / rect.height) * 100
    const maxPrimary = 100 - minSecondarySize
    const next = Math.min(maxPrimary, Math.max(minPrimarySize, ratio))
    setPrimarySize(next)
  }

  return (
    <div
      className={cn(
        'grid h-full w-full overflow-hidden rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
      style={styles}
    >
      <div className="min-h-0 min-w-0 overflow-auto p-[var(--inkblot-spacing-3)]">{primary}</div>
      <div
        className={cn(
          isHorizontal ? 'w-[var(--inkblot-spacing-2)]' : 'h-[var(--inkblot-spacing-2)]',
          'bg-[var(--inkblot-semantic-color-border-default)]'
        )}
      >
        <button
          type="button"
          aria-label="Resize panels"
          className={cn(
            'flex h-full w-full items-center justify-center bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-secondary)]',
            'hover:bg-[var(--inkblot-semantic-color-background-tertiary)] active:bg-[var(--inkblot-semantic-color-background-secondary)]'
          )}
          onPointerDown={(event) => {
            const container = event.currentTarget.closest('div')
              ?.parentElement as HTMLDivElement | null
            if (!container) {
              return
            }
            updateFromPointer(
              { x: event.clientX, y: event.clientY },
              container
            )

            const onPointerMove = (moveEvent: PointerEvent) => {
              updateFromPointer(
                { x: moveEvent.clientX, y: moveEvent.clientY },
                container
              )
            }

            const onPointerUp = () => {
              window.removeEventListener('pointermove', onPointerMove)
              window.removeEventListener('pointerup', onPointerUp)
            }

            window.addEventListener('pointermove', onPointerMove)
            window.addEventListener('pointerup', onPointerUp)
          }}
        >
          {isHorizontal ? (
            <GripVertical
              style={{
                width: 'var(--inkblot-spacing-4)',
                height: 'var(--inkblot-spacing-4)',
              }}
            />
          ) : (
            <GripHorizontal
              style={{
                width: 'var(--inkblot-spacing-4)',
                height: 'var(--inkblot-spacing-4)',
              }}
            />
          )}
        </button>
      </div>
      <div className="min-h-0 min-w-0 overflow-auto p-[var(--inkblot-spacing-3)]">{secondary}</div>
    </div>
  )
}
