# Sanity CMS Implementation Plan - Remaining Phases

## ✅ Phase 1: COMPLETED
- Initial Sanity Setup & Configuration
- Schema Design & Content Models  
- Homepage Integration (Hero Section)

---

## Phase 2: Additional Pages Integration

### Task 4.1: About Page Integration
**Status**: Ready to implement

#### Implementation Steps:
1. **Create About Page Schema**
   ```typescript
   // sanity/schemas/documents/aboutPage.ts
   - Hero section
   - Mission cards integration with existing components
   - Vision cards integration with existing components
   - Values section
   - Security features section
   - Trust stats section
   ```

2. **Update About Page Component**
   ```typescript
   // app/about/page.tsx
   - Fetch data from Sanity
   - Integrate with existing MissionCardsSection and VisionCardsSection
   - Preserve all existing animations and styling
   - Add fallback data support
   ```

3. **Create About-Specific Queries**
   ```typescript
   // lib/sanity.queries.ts
   export const aboutPageQuery = groq`
     *[_type == "aboutPage"][0] {
       _id,
       title,
       hero { headline, subheadline },
       missionCards[] { iconName, title, description },
       visionCards[] { iconName, title, description, highlight },
       values[] { iconName, title, description },
       securityFeatures[] { iconName, title, description },
       trustStats[] { value, label },
       seo
     }
   `
   ```

### Task 4.2: Features Page Integration
**Status**: Schema created, ready for component integration

#### Implementation Steps:
1. **Update Features Page Component**
   ```typescript
   // app/features/page.tsx
   - Fetch data using existing featuresPageQuery
   - Replace static feature arrays with dynamic content
   - Maintain existing layout and animations
   ```

2. **Create Features Data Fetching**
   ```typescript
   // lib/sanity.fetch.ts
   export async function getFeaturesPageData() {
     const data = await client.fetch(featuresPageQuery)
     return data || fallbackFeaturesData
   }
   ```

### Task 4.3: Pricing Page Integration
**Status**: Schema created, ready for component integration

#### Implementation Steps:
1. **Update Pricing Page Component**
   ```typescript
   // app/pricing/page.tsx
   - Fetch data using existing pricingPageQuery
   - Replace static plans array with dynamic content
   - Replace static FAQs with CMS content
   - Maintain existing styling and animations
   ```

2. **Create Pricing Data Fetching**
   ```typescript
   // lib/sanity.fetch.ts
   export async function getPricingPageData() {
     const data = await client.fetch(pricingPageQuery)
     return data || fallbackPricingData
   }
   ```

### Task 4.4: How It Works Page Integration
**Status**: Needs schema creation

#### Implementation Steps:
1. **Create How It Works Schema**
   ```typescript
   // sanity/schemas/documents/howItWorksPage.ts
   - Hero section
   - Process steps array
   - Additional info cards
   - FAQ preview section
   ```

2. **Update How It Works Component**
   ```typescript
   // app/how-it-works/page.tsx
   - Fetch data from Sanity
   - Replace static steps array
   - Maintain existing step-by-step layout
   ```

---

## Phase 3: Advanced Features & Components

### Task 5.1: Dynamic Navigation & Footer
**Status**: Not started

#### Implementation Steps:
1. **Create Navigation Schema**
   ```typescript
   // sanity/schemas/objects/navigation.ts
   - Menu items with nested structure
   - CTA buttons in header
   - Footer links and sections
   ```

2. **Update Header Component**
   ```typescript
   // components/layout/header.tsx
   - Fetch navigation data
   - Support dynamic menu items
   - Maintain existing responsive behavior
   ```

3. **Update Footer Component**
   ```typescript
   // components/layout/footer.tsx
   - Fetch footer data from site settings
   - Dynamic social media links
   - Dynamic footer sections
   ```

### Task 5.2: Testimonials Integration
**Status**: Schema created, needs component integration

#### Implementation Steps:
1. **Update Testimonials Marquee**
   ```typescript
   // components/sections/testimonials-marquee.tsx
   - Fetch testimonials from homepage data
   - Support dynamic testimonial content
   - Maintain existing marquee animations
   ```

2. **Create Testimonials Management**
   ```typescript
   // sanity/schemas/objects/testimonial.ts (already created)
   - Add to homepage schema integration
   - Support avatar images
   - Rating system
   ```

### Task 5.3: Trust Badges Integration
**Status**: Schema created, needs component integration

#### Implementation Steps:
1. **Update Trust Badges Component**
   ```typescript
   // components/sections/trust-badges.tsx
   - Fetch trust badges from site settings
   - Support dynamic badge images and descriptions
   - Maintain existing styling variants
   ```

2. **Create Trust Badge Management**
   ```typescript
   // Add to siteSettings schema
   - Trust badges array
   - Badge images and descriptions
   - Display order management
   ```

---

## Phase 4: Content Management & SEO

### Task 6.1: SEO Integration
**Status**: Schema created, needs implementation

#### Implementation Steps:
1. **Create SEO Helper Functions**
   ```typescript
   // lib/sanity.seo.ts
   export function generateMetadata(seoData, fallbackTitle) {
     return {
       title: seoData?.title || fallbackTitle,
       description: seoData?.description,
       openGraph: {
         title: seoData?.title,
         description: seoData?.description,
         images: seoData?.image ? [urlFor(seoData.image).url()] : [],
       },
     }
   }
   ```

2. **Update All Page Components**
   ```typescript
   // Add to each page component
   export async function generateMetadata() {
     const data = await getPageData()
     return generateMetadata(data.seo, 'Default Title')
   }
   ```

### Task 6.2: Image Optimization
**Status**: Basic setup complete, needs enhancement

#### Implementation Steps:
1. **Enhanced Image Component**
   ```typescript
   // components/sanity/sanity-image.tsx (already created)
   - Add responsive image support
   - Implement blur placeholders
   - Add lazy loading optimization
   ```

2. **Image Processing Pipeline**
   ```typescript
   // lib/sanity.image.ts (already created)
   - Add more image transformation helpers
   - Implement WebP format support
   - Add responsive breakpoint helpers
   ```

---

## Phase 5: Advanced CMS Features

### Task 7.1: Preview Mode
**Status**: Client setup complete, needs implementation

#### Implementation Steps:
1. **Create Preview API Routes**
   ```typescript
   // app/api/preview/route.ts
   export async function GET(request: Request) {
     // Enable preview mode
     // Redirect to preview page
   }
   
   // app/api/exit-preview/route.ts
   export async function GET() {
     // Disable preview mode
   }
   ```

2. **Add Preview Components**
   ```typescript
   // components/sanity/preview-provider.tsx
   - Live preview integration
   - Preview mode indicator
   - Exit preview functionality
   ```

### Task 7.2: Webhooks & Revalidation
**Status**: Not started

#### Implementation Steps:
1. **Create Webhook Handler**
   ```typescript
   // app/api/revalidate/route.ts
   export async function POST(request: Request) {
     // Verify webhook signature
     // Revalidate specific pages
     // Return success response
   }
   ```

2. **Configure Sanity Webhooks**
   ```typescript
   // Documentation for setting up webhooks in Sanity dashboard
   - Document publish/unpublish events
   - Specific page revalidation
   - Cache invalidation strategies
   ```

---

## Phase 6: Production Optimization

### Task 8.1: Performance Optimization
**Status**: Not started

#### Implementation Steps:
1. **Implement ISR (Incremental Static Regeneration)**
   ```typescript
   // Update all page components
   export const revalidate = 3600 // 1 hour
   ```

2. **Add Loading States**
   ```typescript
   // components/ui/loading-skeleton.tsx
   - Create skeleton components for each section
   - Implement loading states for dynamic content
   ```

3. **Optimize Bundle Size**
   ```typescript
   // Dynamic imports for Sanity Studio
   - Lazy load Studio components
   - Code splitting for CMS-related code
   ```

### Task 8.2: Error Handling & Monitoring
**Status**: Not started

#### Implementation Steps:
1. **Enhanced Error Boundaries**
   ```typescript
   // components/sanity/sanity-error-boundary.tsx
   - Graceful fallback for Sanity errors
   - Error reporting integration
   - Fallback content display
   ```

2. **Monitoring Integration**
   ```typescript
   // lib/sanity.monitoring.ts
   - Track CMS fetch errors
   - Monitor performance metrics
   - Alert on content issues
   ```

---

## Implementation Priority

### High Priority (Next Steps)
1. **About Page Integration** - Leverage existing animated components
2. **Features Page Integration** - Schema already created
3. **Pricing Page Integration** - Schema already created

### Medium Priority
1. **How It Works Page** - Create schema and integrate
2. **Testimonials Integration** - Connect to existing marquee
3. **SEO Implementation** - Improve search visibility

### Low Priority (Future Enhancements)
1. **Preview Mode** - For content editors
2. **Webhooks** - For automatic revalidation
3. **Advanced Monitoring** - For production optimization

---

## File Structure (Complete)

```
sanity/
├── schemas/
│   ├── documents/
│   │   ├── homepage.ts ✅
│   │   ├── aboutPage.ts ⏳
│   │   ├── featuresPage.ts ✅
│   │   ├── pricingPage.ts ✅
│   │   ├── howItWorksPage.ts ⏳
│   │   ├── page.ts ✅
│   │   └── siteSettings.ts ✅
│   ├── objects/
│   │   ├── hero.ts ✅
│   │   ├── feature.ts ✅
│   │   ├── testimonial.ts ✅
│   │   ├── stats.ts ✅
│   │   ├── seo.ts ✅
│   │   ├── cta.ts ✅
│   │   ├── trustBadge.ts ✅
│   │   ├── appStoreButton.ts ✅
│   │   ├── richText.ts ✅
│   │   ├── pricingPlan.ts ✅
│   │   ├── faq.ts ✅
│   │   └── navigation.ts ⏳
│   └── index.ts ✅

lib/
├── sanity.client.ts ✅
├── sanity.image.ts ✅
├── sanity.queries.ts ✅
├── sanity.fetch.ts ✅
├── sanity.seo.ts ⏳
└── sanity.monitoring.ts ⏳

components/
├── sanity/
│   ├── portable-text.tsx ✅
│   ├── sanity-image.tsx ✅
│   ├── preview-provider.tsx ⏳
│   └── sanity-error-boundary.tsx ⏳
└── sections/
    └── hero-section.tsx ✅

app/
├── studio/[[...index]]/page.tsx ✅
├── api/
│   ├── preview/route.ts ⏳
│   ├── exit-preview/route.ts ⏳
│   └── revalidate/route.ts ⏳
└── (pages with Sanity integration)
    ├── page.tsx ✅ (Homepage)
    ├── about/page.tsx ⏳
    ├── features/page.tsx ⏳
    ├── pricing/page.tsx ⏳
    └── how-it-works/page.tsx ⏳
```

**Legend:**
- ✅ Completed
- ⏳ Planned/In Progress
- ❌ Not Started

---

## Getting Started with Next Phase

To continue the implementation:

1. **Choose a page to integrate** (recommend About page first)
2. **Create the schema** (if not already created)
3. **Update the page component** to fetch from Sanity
4. **Add fallback data** to ensure it works without Sanity
5. **Test both scenarios** (with and without Sanity configured)

Each phase builds upon the solid foundation we've established, ensuring a smooth and incremental implementation process.