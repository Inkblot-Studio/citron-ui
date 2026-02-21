import { Component, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div
          className={cn(
            'inline-flex items-center gap-3 rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)] px-4 py-3 text-[var(--inkblot-semantic-color-text-secondary)]',
            this.props.className
          )}
          role="alert"
        >
          <span className="text-sm font-medium">Something went wrong</span>
        </div>
      )
    }
    return this.props.children
  }
}
