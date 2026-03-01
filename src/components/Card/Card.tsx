import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  disabled?: boolean
}

export function Card({
  className,
  interactive = false,
  disabled = false,
  ...props
}: CardProps) {
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'w-full rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-primary)]',
        interactive &&
          'transition-[border-color,transform,background] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] hover:border-[var(--inkblot-semantic-color-border-strong)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)] active:translate-y-px',
        disabled && 'pointer-events-none opacity-[var(--inkblot-opacity-disabled)]',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--inkblot-spacing-1)] p-[var(--inkblot-spacing-5)]',
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-base font-semibold text-[var(--inkblot-semantic-color-text-primary)]',
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-sm text-[var(--inkblot-semantic-color-text-secondary)]',
        className
      )}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-[var(--inkblot-spacing-5)] pb-[var(--inkblot-spacing-5)]', className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-[var(--inkblot-spacing-2)] border-t border-[var(--inkblot-semantic-color-border-default)] px-[var(--inkblot-spacing-5)] py-[var(--inkblot-spacing-4)]',
        className
      )}
      {...props}
    />
  )
}
