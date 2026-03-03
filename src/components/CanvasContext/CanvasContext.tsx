import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface CanvasBlock {
  id: string
  type: 'text' | 'entity' | 'intelligence' | 'loading'
  content?: string
}

export interface CanvasContextValue {
  blocks: CanvasBlock[]
  addBlocks: (blocks: CanvasBlock[]) => void
  clearBlocks: () => void
}

const CanvasContext = createContext<CanvasContextValue | null>(null)

export function useCanvas(): CanvasContextValue {
  const ctx = useContext(CanvasContext)
  if (!ctx) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  return ctx
}

export interface CanvasProviderProps {
  children: ReactNode
  initialBlocks?: CanvasBlock[]
}

const defaultInitialBlocks: CanvasBlock[] = [
  {
    id: 'welcome-1',
    type: 'text',
    content:
      'Welcome to Citron OS. Use the AI chat on the right to interact with your revenue engine.',
  },
  { id: 'welcome-2', type: 'entity' },
  { id: 'welcome-3', type: 'intelligence' },
]

export function CanvasProvider({ children, initialBlocks = defaultInitialBlocks }: CanvasProviderProps) {
  const [blocks, setBlocks] = useState<CanvasBlock[]>(initialBlocks)

  const addBlocks = useCallback((newBlocks: CanvasBlock[]) => {
    setBlocks((prev) => [...prev, ...newBlocks])
  }, [])

  const clearBlocks = useCallback(() => {
    setBlocks([])
  }, [])

  return (
    <CanvasContext.Provider value={{ blocks, addBlocks, clearBlocks }}>
      {children}
    </CanvasContext.Provider>
  )
}
