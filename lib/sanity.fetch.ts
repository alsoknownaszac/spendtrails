import { client } from './sanity.client'
import { homepageQuery, siteSettingsQuery } from './sanity.queries'

export async function getHomepageData() {
  try {
    const data = await client.fetch(homepageQuery)
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

export async function getSiteSettings() {
  try {
    const data = await client.fetch(siteSettingsQuery)
    return data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Fallback data for when Sanity is not configured or data is missing
export const fallbackHomepageData = {
  title: 'Homepage',
  hero: {
    headline: 'Track all your cards and cash in one place',
    highlightText: 'in one place',
    subheadline: 'Connect your financial accounts, or enter expenses manually using our quick and intuitive Spendtrails apps. We help you with the financial means, so you can focus on your goals.',
    primaryCta: {
      text: 'Start Free Trial',
      url: '/download',
      variant: 'default',
      size: 'lg',
    },
    secondaryCta: {
      text: 'See How It Works',
      url: '/how-it-works',
      variant: 'outline',
      size: 'lg',
    },
  },
  stats: [
    {
      value: 2,
      suffix: 'M+',
      label: 'Active Users',
      animationDuration: 2000,
    },
    {
      value: 4.8,
      suffix: '',
      label: 'App Store Rating',
      animationDuration: 1500,
    },
    {
      value: 50,
      suffix: 'B+',
      prefix: '$',
      label: 'Tracked Annually',
      animationDuration: 2000,
    },
  ],
  features: [
    {
      iconName: 'PiggyBank',
      title: 'Smart Budgeting',
      description: 'Set custom budgets and see exactly where your money goes each month.',
    },
    {
      iconName: 'CreditCard',
      title: 'Bill Tracking',
      description: 'Never miss a payment with automatic bill detection and reminders.',
    },
    {
      iconName: 'TrendingUp',
      title: 'Savings Goals',
      description: 'Set targets and watch your progress toward financial milestones.',
    },
    {
      iconName: 'Bell',
      title: 'Subscription Manager',
      description: 'Track recurring charges and identify subscriptions you forgot about.',
    },
    {
      iconName: 'Wallet',
      title: 'Investment Tracking',
      description: 'See all your investments in one place alongside your spending.',
    },
    {
      iconName: 'BarChart3',
      title: 'Spending Insights',
      description: 'Understand your habits with clear, actionable insights.',
    },
  ],
  featuresHeadline: 'Everything you need for financial clarity',
  featuresSubheadline: 'From budgeting to investments, Spendtrails brings all your finances together.',
  testimonialsHeadline: 'Trusted by millions',
  securitySection: {
    headline: 'Your security is our priority',
    subheadline: 'We use bank-level encryption and never sell your data. Your financial information stays private.',
  },
  finalCta: {
    headline: 'Start your journey to financial clarity',
    subheadline: 'Download Spendtrails free and take the first step toward understanding your spending.',
  },
}