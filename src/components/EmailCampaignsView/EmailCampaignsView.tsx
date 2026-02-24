import { useState, useMemo } from 'react'
import { Mail } from 'lucide-react'
import { PageHeader, PageHeaderActionButton } from '../PageHeader'
import { TabSystem } from '../TabSystem'
import { StatCards } from '../StatCards'
import { CampaignTable } from '../CampaignTable'
import { EmailComposeActionButtons } from '../ActionButtons'
import { SearchBar } from '../SearchBar'
import { EmailTemplatesSection } from '../EmailTemplatesSection'
import { AIComposeInput } from '../AIComposeInput'
import { cn } from '../../utils/cn'
import type { CampaignTableRow } from '../CampaignTable'
import type { EmailTemplateItem } from '../EmailTemplatesSection'

const AI_DRAFT = `Hi [Name],

I hope this email finds you well. I wanted to reach out regarding our recent conversation about [Topic].

Based on our discussion, I've prepared a few options that I believe could add significant value to your organization:

1. **Option A**: [Brief description]
2. **Option B**: [Brief description]
3. **Option C**: [Brief description]

I'd love to schedule a quick call this week to walk you through these in more detail. Would any of the following times work for you?

- Tuesday 2pm
- Wednesday 10am
- Thursday 4pm

Looking forward to hearing from you.

Best regards,
[Your name]`

const INITIAL_CAMPAIGNS: CampaignTableRow[] = [
  {
    id: '1',
    campaignName: 'Q1 Product Launch',
    recipients: '2840 recipients',
    status: 'sent',
    opens: '68%',
    clicks: '24%',
    date: 'Feb 12, 2026',
  },
  {
    id: '2',
    campaignName: 'Welcome Series',
    recipients: '1200 recipients',
    status: 'active',
    statusSubtext: 'Running',
    opens: '-',
    clicks: '-',
    date: 'Feb 28, 2026',
  },
  {
    id: '3',
    campaignName: 'Re-engagement Campaign',
    recipients: '890 recipients',
    status: 'draft',
    opens: '-',
    clicks: '-',
    date: 'Feb 5, 2026',
  },
  {
    id: '4',
    campaignName: 'Holiday Promo',
    recipients: '4500 recipients',
    status: 'scheduled',
    opens: '-',
    clicks: '-',
    date: 'Mar 1, 2026',
  },
]

const INITIAL_TEMPLATES: EmailTemplateItem[] = [
  { id: '1', category: 'Onboarding', title: 'Welcome Series', uses: '34 uses' },
  { id: '2', category: 'Marketing', title: 'Product Announcement', uses: '12 uses' },
  { id: '3', category: 'Retention', title: 'Renewal Reminder', uses: '28 uses' },
  { id: '4', category: 'Sales', title: 'Meeting Follow-up', uses: '56 uses' },
]

const INITIAL_RECIPIENTS = [
  'Acme Corp - Sarah Chen',
  'TechStart Inc - Mike Rodriguez',
  'GlobalTech - Lisa Kim',
  'Enterprise Co - John Smith',
  'StartupXYZ - Emma Wilson',
]

const COLUMNS = [
  { key: 'campaign', label: 'Campaign' },
  { key: 'status', label: 'Status' },
  { key: 'opens', label: 'Opens' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'date', label: 'Date' },
]

const STATS = [
  {
    label: 'Total Sent',
    value: '12.4K',
    change: 'This month',
    changeVariant: 'success' as const,
  },
  {
    label: 'Avg. Open Rate',
    value: '64%',
    change: '+8% vs prior',
    changeVariant: 'success' as const,
  },
  {
    label: 'Avg. Click Rate',
    value: '22%',
    change: '+3% vs prior',
    changeVariant: 'success' as const,
  },
  {
    label: 'Active Automations',
    value: '7',
    change: '3 paused',
    changeVariant: 'error' as const,
  },
]

export interface EmailCampaignsViewProps {
  onSendNow?: () => void
  onSchedule?: () => void
  onSaveDraft?: () => void
  onNewCampaign?: () => void
  onGenerateWithAI?: () => void
  onTemplateClick?: (template: EmailTemplateItem) => void
  className?: string
}

export function EmailCampaignsView({
  onSendNow,
  onSchedule,
  onSaveDraft,
  onNewCampaign,
  onGenerateWithAI,
  onTemplateClick,
  className,
}: EmailCampaignsViewProps) {
  const [activeTabId, setActiveTabId] = useState('campaigns')
  const [searchQuery, setSearchQuery] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [recipientsSearch, setRecipientsSearch] = useState('')

  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_CAMPAIGNS
    const q = searchQuery.toLowerCase()
    return INITIAL_CAMPAIGNS.filter(
      (r) =>
        r.campaignName.toLowerCase().includes(q) ||
        r.recipients.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_TEMPLATES
    const q = searchQuery.toLowerCase()
    return INITIAL_TEMPLATES.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredRecipients = useMemo(() => {
    if (!recipientsSearch.trim()) return INITIAL_RECIPIENTS
    const q = recipientsSearch.toLowerCase()
    return INITIAL_RECIPIENTS.filter((r) => r.toLowerCase().includes(q))
  }, [recipientsSearch])

  const handleWriteWithAI = async () => {
    setAiLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setBody(AI_DRAFT)
    setAiLoading(false)
  }

  const handleSendNow = () => {
    console.log('Send Now clicked')
    onSendNow?.()
  }

  const handleSchedule = () => {
    console.log('Schedule clicked')
    onSchedule?.()
  }

  const handleSaveDraft = () => {
    console.log('Save Draft clicked')
    onSaveDraft?.()
  }

  const showSearch =
    activeTabId === 'campaigns' || activeTabId === 'templates'

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-8 px-8 py-8">
        <PageHeader
          title="Email Campaigns"
          subtitle="Automate outreach · AI-powered templates"
          icon={<Mail className="h-5 w-5" />}
          action={
            <PageHeaderActionButton
              label="New Campaign"
              onClick={() => onNewCampaign?.()}
            />
          }
        />
        <TabSystem
          tabs={[
            { id: 'campaigns', label: 'Campaigns' },
            { id: 'templates', label: 'Templates' },
            { id: 'compose', label: 'Compose' },
          ]}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        />
        {showSearch ? (
          <SearchBar
            placeholder={
              activeTabId === 'campaigns'
                ? 'Search campaigns...'
                : 'Search templates...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : null}
        {activeTabId === 'campaigns' ? (
          <>
            <StatCards items={STATS} />
            <CampaignTable columns={COLUMNS} rows={filteredCampaigns} />
          </>
        ) : activeTabId === 'templates' ? (
          <EmailTemplatesSection
            templates={filteredTemplates}
            onGenerateWithAI={onGenerateWithAI}
            onTemplateClick={onTemplateClick}
          />
        ) : (
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="uppercase tracking-wider text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-small)]"
                >
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject line..."
                  className={cn(
                    'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-lg)]',
                    'border border-[var(--inkblot-semantic-color-border-default)]',
                    'bg-[var(--inkblot-semantic-color-background-secondary)]',
                    'px-4 py-2 text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]'
                  )}
                />
              </div>
              <AIComposeInput
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Compose your email or let AI generate content..."
                loading={aiLoading}
                onWriteWithAI={handleWriteWithAI}
              />
              <div className="flex flex-col gap-2">
                <SearchBar
                  label="Recipients"
                  placeholder="Search contacts, segments, or tags..."
                  value={recipientsSearch}
                  onChange={(e) => setRecipientsSearch(e.target.value)}
                />
                {filteredRecipients.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {filteredRecipients.slice(0, 5).map((r) => (
                      <li
                        key={r}
                        className={cn(
                          'rounded-[var(--inkblot-radius-md)]',
                          'bg-[var(--inkblot-semantic-color-background-secondary)]',
                          'px-[var(--inkblot-spacing-2)] py-[var(--inkblot-spacing-1)]',
                          '[font:var(--inkblot-semantic-typography-body-small)]',
                          'text-[var(--inkblot-semantic-color-text-secondary)]'
                        )}
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <EmailComposeActionButtons
              onSendNow={handleSendNow}
              onSchedule={handleSchedule}
              onSaveDraft={handleSaveDraft}
            />
          </div>
        )}
      </div>
    </div>
  )
}
