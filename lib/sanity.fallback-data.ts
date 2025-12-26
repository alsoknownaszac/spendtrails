/**
 * Fallback data store for Sanity CMS
 * 
 * This file provides static content that matches the Sanity schema structure
 * and is used when Sanity is not configured or unavailable.
 */

// Type definitions matching Sanity schema structure
export interface FallbackHomepageData {
  _id: string
  _type: 'homepage'
  title: string
  hero: {
    headline: string
    highlightText?: string
    subheadline: string
    primaryCta: {
      text: string
      url: string
      variant?: string
      size?: string
    }
    secondaryCta?: {
      text: string
      url: string
      variant?: string
      size?: string
    }
    backgroundImage?: any
  }
  stats: Array<{
    _key: string
    value: number
    suffix?: string
    prefix?: string
    label: string
    animationDuration?: number
  }>
  features: Array<{
    _key: string
    iconName: string
    title: string
    description: string
    benefits?: string[]
  }>
  featuresHeadline: string
  featuresSubheadline: string
  testimonials: Array<{
    _key: string
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: any
    rating?: number
  }>
  testimonialsHeadline: string
  securitySection: {
    headline: string
    subheadline: string
  }
  finalCta: {
    headline: string
    subheadline: string
  }
  seo?: {
    title?: string
    description?: string
    image?: any
    keywords?: string[]
  }
}

export interface FallbackSiteSettingsData {
  _id: string
  _type: 'siteSettings'
  title: string
  description: string
  logo?: any
  favicon?: any
  socialMedia?: {
    twitter?: string
    facebook?: string
    linkedin?: string
    instagram?: string
  }
  seo?: {
    title?: string
    description?: string
    image?: any
    keywords?: string[]
  }
}

export interface FallbackPageData {
  _id: string
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  content?: any
  seo?: {
    title?: string
    description?: string
    image?: any
    keywords?: string[]
  }
}

export interface FallbackFeaturesPageData {
  _id: string
  _type: 'featuresPage'
  title: string
  hero: {
    headline: string
    subheadline: string
  }
  mainFeatures: Array<{
    _key: string
    iconName: string
    title: string
    description: string
    benefits: string[]
  }>
  additionalFeatures: Array<{
    _key: string
    iconName: string
    title: string
    description: string
  }>
  seo?: {
    title?: string
    description?: string
    image?: any
    keywords?: string[]
  }
}

export interface FallbackPricingPageData {
  _id: string
  _type: 'pricingPage'
  title: string
  hero: {
    headline: string
    subheadline: string
  }
  plans: Array<{
    _key: string
    name: string
    price: number
    period: string
    description: string
    features: string[]
    cta: {
      text: string
      url: string
      variant?: string
    }
    ctaVariant?: string
    popular?: boolean
  }>
  faqs: Array<{
    _key: string
    question: string
    answer: string
  }>
  seo?: {
    title?: string
    description?: string
    image?: any
    keywords?: string[]
  }
}

// Fallback homepage data
export const fallbackHomepageData: FallbackHomepageData = {
  _id: 'fallback-homepage',
  _type: 'homepage',
  title: 'Homepage',
  hero: {
    headline: 'Take control of your financial future',
    highlightText: 'financial future',
    subheadline: 'Spendtrails helps you track expenses, set budgets, and make smarter financial decisions with beautiful, intuitive tools.',
    primaryCta: {
      text: 'Download Free',
      url: '/download',
      variant: 'default',
      size: 'lg'
    },
    secondaryCta: {
      text: 'Learn More',
      url: '/how-it-works',
      variant: 'outline',
      size: 'lg'
    }
  },
  stats: [
    {
      _key: 'stat-1',
      value: 2,
      suffix: 'M+',
      label: 'Active Users',
      animationDuration: 2000
    },
    {
      _key: 'stat-2',
      value: 4.8,
      label: 'App Store Rating',
      animationDuration: 1500
    },
    {
      _key: 'stat-3',
      value: 50,
      suffix: 'B+',
      prefix: '$',
      label: 'Tracked Annually',
      animationDuration: 2500
    }
  ],
  features: [
    {
      _key: 'feature-1',
      iconName: 'PiggyBank',
      title: 'Smart Budgeting',
      description: 'Set personalized budgets that adapt to your spending patterns and help you save more effectively.'
    },
    {
      _key: 'feature-2',
      iconName: 'CreditCard',
      title: 'Expense Tracking',
      description: 'Automatically categorize and track all your expenses across multiple accounts and cards.'
    },
    {
      _key: 'feature-3',
      iconName: 'TrendingUp',
      title: 'Investment Insights',
      description: 'Monitor your investment portfolio and get insights to optimize your financial growth.'
    },
    {
      _key: 'feature-4',
      iconName: 'Bell',
      title: 'Smart Alerts',
      description: 'Get notified about unusual spending, bill reminders, and budget milestones.'
    },
    {
      _key: 'feature-5',
      iconName: 'BarChart3',
      title: 'Financial Reports',
      description: 'Generate detailed reports and visualizations to understand your financial health.'
    },
    {
      _key: 'feature-6',
      iconName: 'Target',
      title: 'Goal Setting',
      description: 'Set and track financial goals with personalized recommendations and progress tracking.'
    }
  ],
  featuresHeadline: 'Everything you need for financial clarity',
  featuresSubheadline: 'From budgeting to investments, Spendtrails brings all your finances together.',
  testimonials: [
    {
      _key: 'testimonial-1',
      quote: 'Spendtrails completely changed how I manage my money. I finally understand where every dollar goes.',
      author: 'Sarah Chen',
      role: 'Marketing Manager',
      company: 'TechCorp',
      rating: 5
    },
    {
      _key: 'testimonial-2',
      quote: 'The budgeting features are incredible. I\'ve saved more in 6 months than I did in the previous 2 years.',
      author: 'Michael Rodriguez',
      role: 'Software Engineer',
      company: 'StartupXYZ',
      rating: 5
    },
    {
      _key: 'testimonial-3',
      quote: 'Simple, beautiful, and powerful. This app makes financial planning actually enjoyable.',
      author: 'Emily Johnson',
      role: 'Freelance Designer',
      rating: 5
    },
    {
      _key: 'testimonial-4',
      quote: 'The investment tracking feature helped me optimize my portfolio and increase returns by 15%.',
      author: 'David Park',
      role: 'Financial Analyst',
      company: 'InvestCo',
      rating: 5
    },
    {
      _key: 'testimonial-5',
      quote: 'Finally, a finance app that doesn\'t overwhelm me with complexity. Perfect for beginners.',
      author: 'Lisa Thompson',
      role: 'Teacher',
      rating: 5
    }
  ],
  testimonialsHeadline: 'Trusted by millions',
  securitySection: {
    headline: 'Your security is our priority',
    subheadline: 'We use bank-level encryption and never sell your data. Your financial information stays private.'
  },
  finalCta: {
    headline: 'Start your journey to financial clarity',
    subheadline: 'Download Spendtrails free and take the first step toward understanding your spending.'
  },
  seo: {
    title: 'Spendtrails - Take Control of Your Financial Future',
    description: 'Track expenses, set budgets, and make smarter financial decisions with Spendtrails. Join 2M+ users managing their money better.',
    keywords: ['expense tracking', 'budgeting app', 'financial planning', 'money management', 'personal finance']
  }
}

// Fallback site settings data
export const fallbackSiteSettingsData: FallbackSiteSettingsData = {
  _id: 'fallback-site-settings',
  _type: 'siteSettings',
  title: 'Spendtrails',
  description: 'Take control of your financial future with smart budgeting and expense tracking.',
  socialMedia: {
    twitter: 'https://twitter.com/spendtrails',
    facebook: 'https://facebook.com/spendtrails',
    linkedin: 'https://linkedin.com/company/spendtrails',
    instagram: 'https://instagram.com/spendtrails'
  },
  seo: {
    title: 'Spendtrails - Smart Financial Management',
    description: 'Take control of your financial future with smart budgeting and expense tracking.',
    keywords: ['expense tracking', 'budgeting', 'financial planning', 'money management']
  }
}

// Fallback features page data
export const fallbackFeaturesPageData: FallbackFeaturesPageData = {
  _id: 'fallback-features-page',
  _type: 'featuresPage',
  title: 'Features',
  hero: {
    headline: 'Powerful features for complete financial control',
    subheadline: 'Everything you need to track, budget, and optimize your finances in one beautiful app.'
  },
  mainFeatures: [
    {
      _key: 'main-feature-1',
      iconName: 'PiggyBank',
      title: 'Smart Budgeting',
      description: 'Create personalized budgets that adapt to your spending patterns and lifestyle changes.',
      benefits: [
        'Automatic budget adjustments based on spending patterns',
        'Category-based budget allocation',
        'Real-time budget tracking and alerts',
        'Monthly and yearly budget planning'
      ]
    },
    {
      _key: 'main-feature-2',
      iconName: 'CreditCard',
      title: 'Expense Tracking',
      description: 'Automatically categorize and track expenses across all your accounts and payment methods.',
      benefits: [
        'Automatic transaction categorization',
        'Multi-account synchronization',
        'Receipt scanning and storage',
        'Custom category creation'
      ]
    },
    {
      _key: 'main-feature-3',
      iconName: 'TrendingUp',
      title: 'Investment Monitoring',
      description: 'Track your investment portfolio performance and get insights for better decisions.',
      benefits: [
        'Real-time portfolio tracking',
        'Performance analytics and insights',
        'Asset allocation recommendations',
        'Market trend analysis'
      ]
    }
  ],
  additionalFeatures: [
    {
      _key: 'additional-feature-1',
      iconName: 'Bell',
      title: 'Smart Notifications',
      description: 'Get timely alerts about spending limits, bill due dates, and financial opportunities.'
    },
    {
      _key: 'additional-feature-2',
      iconName: 'BarChart3',
      title: 'Financial Reports',
      description: 'Generate comprehensive reports with beautiful visualizations of your financial data.'
    },
    {
      _key: 'additional-feature-3',
      iconName: 'Target',
      title: 'Goal Tracking',
      description: 'Set and monitor financial goals with progress tracking and achievement milestones.'
    },
    {
      _key: 'additional-feature-4',
      iconName: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit encryption and multi-factor authentication.'
    },
    {
      _key: 'additional-feature-5',
      iconName: 'Smartphone',
      title: 'Mobile & Web Access',
      description: 'Access your financial data anywhere with our mobile app and web dashboard.'
    },
    {
      _key: 'additional-feature-6',
      iconName: 'RefreshCw',
      title: 'Real-Time Sync',
      description: 'All your data syncs instantly across devices so you\'re always up to date.'
    }
  ],
  seo: {
    title: 'Features - Spendtrails Financial Management',
    description: 'Discover all the powerful features that make Spendtrails the best choice for managing your finances.',
    keywords: ['budgeting features', 'expense tracking', 'investment monitoring', 'financial reports']
  }
}

// Fallback pricing page data
export const fallbackPricingPageData: FallbackPricingPageData = {
  _id: 'fallback-pricing-page',
  _type: 'pricingPage',
  title: 'Pricing',
  hero: {
    headline: 'Simple, transparent pricing',
    subheadline: 'Choose the plan that works best for your financial goals. All plans include our core features.'
  },
  plans: [
    {
      _key: 'plan-free',
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started with basic financial tracking.',
      features: [
        'Track up to 3 accounts',
        'Basic expense categorization',
        'Monthly budget planning',
        'Mobile app access',
        'Email support'
      ],
      cta: {
        text: 'Get Started Free',
        url: '/download',
        variant: 'outline'
      }
    },
    {
      _key: 'plan-pro',
      name: 'Pro',
      price: 9.99,
      period: 'month',
      description: 'Advanced features for serious financial management.',
      features: [
        'Unlimited accounts',
        'Advanced categorization & rules',
        'Investment portfolio tracking',
        'Custom financial reports',
        'Goal setting & tracking',
        'Priority support',
        'Data export'
      ],
      cta: {
        text: 'Start Pro Trial',
        url: '/download',
        variant: 'default'
      },
      popular: true
    },
    {
      _key: 'plan-family',
      name: 'Family',
      price: 19.99,
      period: 'month',
      description: 'Comprehensive financial management for families.',
      features: [
        'Everything in Pro',
        'Up to 6 family members',
        'Shared budgets & goals',
        'Family spending insights',
        'Allowance management',
        'Parental controls',
        'Family financial education'
      ],
      cta: {
        text: 'Start Family Trial',
        url: '/download',
        variant: 'default'
      }
    }
  ],
  faqs: [
    {
      _key: 'faq-1',
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing adjustments.'
    },
    {
      _key: 'faq-2',
      question: 'Is my financial data secure?',
      answer: 'Absolutely. We use bank-level 256-bit encryption and never store your banking credentials. Your data is protected with the same security standards used by major financial institutions.'
    },
    {
      _key: 'faq-3',
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      _key: 'faq-4',
      question: 'Can I use Spendtrails offline?',
      answer: 'Yes, the mobile app works offline for viewing your data and adding manual transactions. Changes sync automatically when you\'re back online.'
    }
  ],
  seo: {
    title: 'Pricing - Spendtrails Plans & Features',
    description: 'Choose the perfect Spendtrails plan for your needs. Free plan available with premium features starting at $9.99/month.',
    keywords: ['spendtrails pricing', 'budgeting app cost', 'financial planning subscription']
  }
}

// Generic fallback page data generator
export const createFallbackPageData = (slug: string, title: string): FallbackPageData => ({
  _id: `fallback-page-${slug}`,
  _type: 'page',
  title,
  slug: {
    current: slug
  },
  content: null,
  seo: {
    title: `${title} - Spendtrails`,
    description: `Learn more about ${title.toLowerCase()} at Spendtrails.`,
    keywords: [title.toLowerCase(), 'spendtrails']
  }
})

// Fallback data store interface
export interface FallbackDataStore {
  getHomepage(): FallbackHomepageData
  getSiteSettings(): FallbackSiteSettingsData
  getPage(slug: string): FallbackPageData | null
  getFeaturesPage(): FallbackFeaturesPageData
  getPricingPage(): FallbackPricingPageData
}

// Main fallback data store implementation
export const fallbackDataStore: FallbackDataStore = {
  getHomepage(): FallbackHomepageData {
    return fallbackHomepageData
  },

  getSiteSettings(): FallbackSiteSettingsData {
    return fallbackSiteSettingsData
  },

  getPage(slug: string): FallbackPageData | null {
    // Define known pages with their titles
    const knownPages: Record<string, string> = {
      'about': 'About Us',
      'privacy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'contact': 'Contact Us',
      'security': 'Security',
      'how-it-works': 'How It Works'
    }

    const title = knownPages[slug]
    if (title) {
      return createFallbackPageData(slug, title)
    }

    return null
  },

  getFeaturesPage(): FallbackFeaturesPageData {
    return fallbackFeaturesPageData
  },

  getPricingPage(): FallbackPricingPageData {
    return fallbackPricingPageData
  }
}

// Note: fallbackHomepageData is already exported above as a const export