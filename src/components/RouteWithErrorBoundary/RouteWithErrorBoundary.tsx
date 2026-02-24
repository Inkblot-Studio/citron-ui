import type { ComponentType } from 'react'
import type { ReactNode } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { PageErrorFallback } from '../PageErrorFallback'

export interface RouteWithErrorBoundaryProps {
  children: ReactNode
  fallback?: ComponentType<FallbackProps>
}

export function RouteWithErrorBoundary({
  children,
  fallback,
}: RouteWithErrorBoundaryProps) {
  const navigate = useNavigate()

  const handleReset = () => {
    navigate('/')
  }

  return (
    <ErrorBoundary
      FallbackComponent={fallback ?? PageErrorFallback}
      onReset={handleReset}
    >
      {children}
    </ErrorBoundary>
  )
}
