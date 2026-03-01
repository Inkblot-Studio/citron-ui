import { useState } from 'react'
import { User } from 'lucide-react'
import { cn } from '../../utils/cn'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
  disabled?: boolean
  className?: string
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  disabled = false,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const showImage = Boolean(src && !imageError)

  return (
    <span
      aria-disabled={disabled}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--inkblot-radius-full)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-secondary)]',
        disabled && 'opacity-[var(--inkblot-opacity-disabled)]',
        sizeStyles[size],
        className
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : fallback ? (
        <span className="font-medium uppercase">{fallback.slice(0, 2)}</span>
      ) : (
        <User className="h-4 w-4" />
      )}
    </span>
  )
}
