import type { EntityType } from '../components/EntityCard'

export type {
  TaskStatus,
  TaskPriority,
  TaskItemData,
  TaskWithStatus,
  TaskSection,
  TaskCreatePayload,
} from './task'

export interface GraphNode {
  id: string
  type: EntityType
  name: string
  metadata?: Record<string, string>
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  intent?: 'entity' | 'event' | 'general'
  timestamp: string
}
