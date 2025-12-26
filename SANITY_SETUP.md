# Sanity CMS Integration Setup

This guide will help you set up Sanity CMS for your Spendtrails project.

## Quick Start

1. **Create a Sanity account** at [sanity.io](https://sanity.io)

2. **Initialize Sanity project**:
   ```bash
   npx sanity@latest init
   ```
   
   Follow the prompts:
   - Create a new project
   - Choose a project name (e.g., "Spendtrails CMS")
   - Use the default dataset configuration
   - Choose "Clean project with no predefined schemas"

3. **Update environment variables**:
   Copy your project ID and update `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token_here
   ```

4. **Start your development server**:
   ```bash
   pnpm dev
   ```

5. **Access Sanity Studio**:
   Visit `http://localhost:3000/studio` to access your CMS

## Creating Your First Content

1. **Go to the Studio** at `http://localhost:3000/studio`
2. **Sign in** with the same account you used for Sanity
3. **Create a Homepage document**:
   - Click "Create" → "Homepage"
   - Fill in the hero section content
   - Add features, stats, and testimonials
   - Publish the document

## Content Structure

### Homepage Content
- **Hero Section**: Main headline, subheadline, and CTAs
- **Stats**: Animated counters (Active Users, Rating, etc.)
- **Features**: Feature cards with icons and descriptions
- **Security & CTA sections**: Customizable text content

### Available Icons
The system supports these Lucide React icons:
- PiggyBank, CreditCard, TrendingUp, Bell, Wallet, BarChart3
- Target, Receipt, RefreshCw, Home, Smartphone, Zap
- Eye, Users, Heart, Brain, Globe, GraduationCap
- Shield, Lock, Server, Lightbulb

## Fallback Behavior

If Sanity is not configured or content is missing, the site will automatically use fallback data that matches your current static content. This ensures your site always works.

## File Structure

```
sanity/
├── schemas/
│   ├── documents/
│   │   ├── homepage.ts
│   │   ├── page.ts
│   │   └── siteSettings.ts
│   ├── objects/
│   │   ├── hero.ts
│   │   ├── feature.ts
│   │   ├── testimonial.ts
│   │   └── seo.ts
│   └── index.ts
├── sanity.config.ts
└── sanity.cli.ts

lib/
├── sanity.client.ts
├── sanity.image.ts
├── sanity.queries.ts
└── sanity.fetch.ts

components/
└── sanity/
    ├── portable-text.tsx
    └── sanity-image.tsx
```

## Next Steps

1. **Create content** for all your pages in the Studio
2. **Customize schemas** in `sanity/schemas/` as needed
3. **Add more page types** following the existing patterns
4. **Deploy your Studio** when ready for production

## Troubleshooting

### Common Issues

1. **"Project not found" error**:
   - Check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
   - Ensure the project exists in your Sanity dashboard

2. **Studio not loading**:
   - Verify you're accessing `http://localhost:3000/studio`
   - Check browser console for errors
   - Ensure all Sanity packages are installed

3. **Images not displaying**:
   - Check `next.config.mjs` has Sanity domains configured
   - Verify image assets exist in Sanity

### Getting Help

- Check the [Sanity documentation](https://www.sanity.io/docs)
- Visit the [Next.js + Sanity guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- Create an issue in this repository

## Production Deployment

When deploying to production:

1. **Set environment variables** in your hosting platform
2. **Deploy Sanity Studio** (optional):
   ```bash
   cd sanity
   npx sanity deploy
   ```
3. **Configure CORS** in Sanity dashboard for your domain
4. **Set up webhooks** for automatic rebuilds (optional)