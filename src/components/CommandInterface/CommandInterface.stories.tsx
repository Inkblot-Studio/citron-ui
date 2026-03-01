import type { Meta, StoryObj } from '@storybook/react-vite'
import { EntityCard } from '../EntityCard'
import { EventRow } from '../EventRow'
import { CommandInterface } from './CommandInterface'

const meta = {
  title: 'Components/CommandInterface',
  component: CommandInterface,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CommandInterface>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {},
}

export const WithPrompt: Story = {
  args: {
    promptValue: 'Show me recent deals',
    onPromptChange: () => {},
    onPromptSubmit: () => {},
  },
}

export const WithFileAttachment: Story = {
  args: {
    promptValue: '',
    placeholder: 'Ask Citron Intelligence...',
    onPromptChange: () => {},
    onPromptSubmit: () => {},
    onFilesAttach: () => {},
    multiple: true,
  },
}

export const Processing: Story = {
  args: {
    promptValue: 'Find contacts at Acme Corp',
    isProcessing: true,
  },
}

export const WithTextResponse: Story = {
  args: {
    promptValue: 'What is Acme Corp?',
    response: (
      <p className="text-[var(--inkblot-semantic-color-text-secondary)]">
        Acme Corporation is a technology company with 500+ employees. They have an active deal in negotiation for an enterprise license.
      </p>
    ),
  },
}

export const WithComponentResponse: Story = {
  args: {
    promptValue: 'Show me Acme Corp',
    response: (
      <div className="flex flex-col gap-[var(--inkblot-spacing-4)]">
        <EntityCard
          name="Acme Corporation"
          entityType="Organization"
          metadata={{ industry: 'Technology', employees: '500+' }}
          edges={[{ type: 'PARTNER_OF', target: 'Tech Solutions' }]}
        />
        <EventRow
          event={{
            actor: 'Jane Doe',
            subject: 'Acme Corp',
            event_type: 'EMAIL_SENT',
            timestamp: '2025-02-20T14:30:00Z',
            confidence_score: 0.95,
          }}
        />
      </div>
    ),
  },
}
