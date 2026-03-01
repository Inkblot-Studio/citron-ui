import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface NavLinkProps {
  label: string
  icon: LucideIcon
  active?: boolean
  onClick?: () => void
  title?: string
  dataTour?: string
  className?: string
}

export function NavLink({
  label,
  icon: Icon,
  active = false,
  onClick,
  title,
  dataTour,
  className,
}: NavLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-tour={dataTour}
      className={cn(
        'group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-transparent transition-colors duration-[var(--inkblot-duration-fast)]',
        active
          ? 'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)]'
          : 'text-[var(--inkblot-semantic-color-text-tertiary)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
        className
      )}
      title={title ?? label}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden />
      {active ? (
        <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-[var(--inkblot-semantic-color-interactive-primary)]" />
      ) : null}
      <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-[var(--inkblot-radius-sm)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] px-2 py-1 text-xs font-medium text-[var(--inkblot-semantic-color-text-primary)] opacity-0 transition-opacity duration-[var(--inkblot-duration-fast)] group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
