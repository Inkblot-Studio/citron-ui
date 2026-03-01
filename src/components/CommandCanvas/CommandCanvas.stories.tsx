import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EntityCard } from '../EntityCard'
import { IntelligenceCard } from '../IntelligenceCard'
import { CommandCanvas } from './CommandCanvas'
import type { CommandCanvasMessage } from './CommandCanvas'

const meta = {
  title: 'Components/CommandCanvas',
  component: CommandCanvas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="h-screen">
      <CommandCanvas
        {...args}
        renderCard={(type) =>
          type === 'entity' ? (
            <EntityCard
              name="Acme Corp"
              entityType="Organization"
              metadata={{ Region: 'North America', ARR: '$2.4M' }}
              edges={[
                { type: 'Partner', target: 'DataFlow Labs' },
                { type: 'Prospect Owner', target: 'Jane Smith' },
              ]}
            />
          ) : (
            <IntelligenceCard />
          )
        }
      />
    </div>
  ),
} satisfies Meta<typeof CommandCanvas>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EmptyStart: Story = {
  args: {
    initialMessages: [],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState<CommandCanvasMessage[]>([
      {
        id: 'init-1',
        role: 'assistant',
        content: 'How can I help with your CRM workflows today?',
      },
    ])

    return (
      <div className="h-screen">
        <CommandCanvas
          {...args}
          messages={messages}
          onMessagesChange={setMessages}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
          autoAssistantResponse={false}
          onSend={(value) => {
            setMessages((previous) => [
              ...previous,
              {
                id: `${Date.now()}-assistant`,
                role: 'assistant',
                content: `Received: ${value}`,
                cards: ['entity'],
              },
            ])
          }}
        />
      </div>
    )
  },
}
