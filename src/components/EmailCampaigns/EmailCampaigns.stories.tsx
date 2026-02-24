import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailCampaignsView } from '../EmailCampaignsView'

const meta = {
  title: 'Compositions/EmailCampaigns',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => (
    <EmailCampaignsView
      onSendNow={() => console.log('Send Now')}
      onSchedule={() => console.log('Schedule')}
      onSaveDraft={() => console.log('Save Draft')}
      onNewCampaign={() => console.log('New Campaign')}
      onGenerateWithAI={() => console.log('Generate with AI')}
      onTemplateClick={(t) => console.log('Template clicked:', t)}
    />
  ),
}
