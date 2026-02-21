import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventRow } from './EventRow'

const meta = {
  title: 'Components/EventRow',
  component: EventRow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof EventRow>

export default meta

type Story = StoryObj<typeof meta>

export const HighConfidence: Story = {
  args: {
    event: {
      actor: 'Jane Doe',
      subject: 'Acme Corp',
      event_type: 'EMAIL_SENT',
      timestamp: '2025-02-20T14:30:00Z',
      confidence_score: 0.95,
    },
  },
}

export const MediumConfidence: Story = {
  args: {
    event: {
      actor: 'System',
      subject: 'Deal-42',
      event_type: 'STAGE_CHANGED',
      timestamp: '2025-02-20T14:25:00Z',
      confidence_score: 0.65,
    },
  },
}

export const LowConfidence: Story = {
  args: {
    event: {
      actor: 'Unknown',
      subject: 'Contact',
      event_type: 'PHONE_CALL',
      timestamp: '2025-02-20T14:20:00Z',
      confidence_score: 0.15,
    },
  },
}
