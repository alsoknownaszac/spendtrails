import { groq } from 'next-sanity'

// Homepage queries
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    title,
    hero {
      headline,
      subheadline,
      primaryCta,
      secondaryCta,
      backgroundImage
    },
    features[] {
      _key,
      iconName,
      title,
      description
    },
    stats[] {
      _key,
      value,
      suffix,
      label
    },
    testimonials[] {
      _key,
      quote,
      author,
      role,
      company,
      avatar
    },
    seo
  }
`

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
    favicon,
    socialMedia,
    seo
  }
`

// Generic page query
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seo
  }
`

// Features page query
export const featuresPageQuery = groq`
  *[_type == "featuresPage"][0] {
    _id,
    title,
    hero {
      headline,
      subheadline
    },
    mainFeatures[] {
      _key,
      iconName,
      title,
      description,
      benefits[]
    },
    additionalFeatures[] {
      _key,
      iconName,
      title,
      description
    },
    seo
  }
`

// Pricing page query
export const pricingPageQuery = groq`
  *[_type == "pricingPage"][0] {
    _id,
    title,
    hero {
      headline,
      subheadline
    },
    plans[] {
      _key,
      name,
      price,
      period,
      description,
      features[],
      cta,
      ctaVariant,
      popular
    },
    faqs[] {
      _key,
      question,
      answer
    },
    seo
  }
`