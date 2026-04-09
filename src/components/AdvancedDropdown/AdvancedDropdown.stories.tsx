import type { Meta, StoryObj } from '@storybook/react-vite'
import { Globe, Mail, Phone, Settings, Shield, User, Zap } from 'lucide-react'
import { AdvancedDropdown } from './AdvancedDropdown'

const meta = {
  title: 'Components/AdvancedDropdown',
  component: AdvancedDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdvancedDropdown>

export default meta

type Story = StoryObj<typeof meta>

const basicOptions = [
  { value: 'crm', label: 'CRM' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const manyOptions = [
  { value: 'crm', label: 'CRM', description: 'Customer relationship management' },
  { value: 'sales', label: 'Sales', description: 'Pipeline and deals' },
  { value: 'marketing', label: 'Marketing', description: 'Campaigns and outreach' },
  { value: 'analytics', label: 'Analytics', description: 'Reports and dashboards' },
  { value: 'finance', label: 'Finance', description: 'Invoicing and payments' },
  { value: 'support', label: 'Support', description: 'Tickets and help desk' },
  { value: 'hr', label: 'Human Resources', description: 'People operations' },
  { value: 'engineering', label: 'Engineering', description: 'Product development' },
  { value: 'design', label: 'Design', description: 'UI/UX and branding' },
  { value: 'legal', label: 'Legal', description: 'Compliance and contracts' },
]

const iconOptions = [
  { value: 'user', label: 'Profile', icon: <User className="size-4" /> },
  { value: 'mail', label: 'Email', icon: <Mail className="size-4" /> },
  { value: 'phone', label: 'Phone', icon: <Phone className="size-4" /> },
  { value: 'settings', label: 'Settings', icon: <Settings className="size-4" /> },
  { value: 'security', label: 'Security', icon: <Shield className="size-4" /> },
  { value: 'integrations', label: 'Integrations', icon: <Zap className="size-4" /> },
  { value: 'language', label: 'Language', icon: <Globe className="size-4" /> },
]

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a module',
  },
}

export const WithSearch: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Select a department',
    searchPlaceholder: 'Search departments...',
  },
}

export const WithIcons: Story = {
  args: {
    options: iconOptions,
    placeholder: 'Choose a setting',
  },
}

export const Clearable: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'sales',
    clearable: true,
  },
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'crm',
    disabled: true,
  },
}

export const DisabledItems: Story = {
  args: {
    options: [
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused', disabled: true },
      { value: 'archived', label: 'Archived' },
      { value: 'deleted', label: 'Deleted', disabled: true },
    ],
    placeholder: 'Select status',
  },
}
