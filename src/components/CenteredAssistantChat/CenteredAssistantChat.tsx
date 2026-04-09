import { cn } from '../../utils/cn'
import { GlobalAssistantChat, type GlobalAssistantChatProps } from '../GlobalAssistantChat'

export interface CenteredAssistantChatProps extends GlobalAssistantChatProps {}

export function CenteredAssistantChat({ className, ...props }: CenteredAssistantChatProps) {
  return (
    <GlobalAssistantChat
      {...props}
      className={cn('mx-auto w-full max-w-5xl', className)}
    />
  )
}
