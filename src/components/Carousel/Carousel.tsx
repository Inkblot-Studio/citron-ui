import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CarouselProps {
  items: ReactNode[]
  initialIndex?: number
  loop?: boolean
  className?: string
}

export function Carousel({
  items,
  initialIndex = 0,
  loop = false,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0))
  )

  const canGoPrev = loop || currentIndex > 0
  const canGoNext = loop || currentIndex < items.length - 1

  const goPrev = () => {
    if (items.length === 0) return
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
      return
    }
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goNext = () => {
    if (items.length === 0) return
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      return
    }
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))
  }

  return (
    <div
      className={cn(
        'w-full rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)]',
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[var(--inkblot-radius-lg)]">
        <div
          className="flex transition-transform duration-[var(--inkblot-duration-normal)] ease-[var(--inkblot-easing-default)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[var(--inkblot-spacing-3)] flex items-center justify-between">
        <div className="text-sm text-[var(--inkblot-semantic-color-text-secondary)]">
          {items.length > 0 ? `${currentIndex + 1} de ${items.length}` : 'Sin elementos'}
        </div>
        <div className="flex gap-[var(--inkblot-spacing-2)]">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev || items.length === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext || items.length === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
