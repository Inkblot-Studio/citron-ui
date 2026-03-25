import type { ButtonHTMLAttributes } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../ThemeProvider'
import { cn } from '../../utils/cn'

export interface ThemeSwitcherButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function ThemeSwitcherButton({ className, type = 'button', ...props }: ThemeSwitcherButtonProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type={type}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={cn(
        'group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--inkblot-radius-md)] border border-transparent',
        'text-[var(--inkblot-semantic-color-text-tertiary)] transition-colors duration-[var(--inkblot-duration-fast)]',
        'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
      {...props}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} aria-hidden />
    </button>
  )
}
