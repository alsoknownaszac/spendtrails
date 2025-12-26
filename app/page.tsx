import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AppStoreButtons } from "@/components/ui/app-store-buttons"
import { TrustBadges } from "@/components/sections/trust-badges"
import { FeatureCard } from "@/components/sections/feature-card"
import { HeroSection } from "@/components/sections/hero-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee"
import { getHomepageData, fallbackHomepageData } from "@/lib/sanity.fetch"

export default async function HomePage() {
  // Fetch data from Sanity, fallback to static data if not available
  const homepageData = await getHomepageData() || fallbackHomepageData
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Now powered by Sanity */}
        <HeroSection data={homepageData.hero} />

        {/* Stats Section */}
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20">
              {homepageData.stats?.map((stat: any, index: number) => (
                <AnimatedSection key={index} animation="scale-in" delay={index * 150} className="text-center">
                  <p className="text-3xl font-bold text-primary sm:text-4xl">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix || ""} 
                      duration={stat.animationDuration || 2000}
                    />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </AnimatedSection>
              )) || (
                // Fallback stats if none in Sanity
                <>
                  <AnimatedSection animation="scale-in" delay={0} className="text-center">
                    <p className="text-3xl font-bold text-primary sm:text-4xl">
                      <AnimatedCounter end={2} suffix="M+" />
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Active Users</p>
                  </AnimatedSection>
                  <div className="hidden h-12 w-px bg-border sm:block" />
                  <AnimatedSection animation="scale-in" delay={150} className="text-center">
                    <p className="text-3xl font-bold text-primary sm:text-4xl">
                      <AnimatedCounter end={4.8} suffix="" duration={1500} />
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">App Store Rating</p>
                  </AnimatedSection>
                  <div className="hidden h-12 w-px bg-border sm:block" />
                  <AnimatedSection animation="scale-in" delay={300} className="text-center">
                    <p className="text-3xl font-bold text-primary sm:text-4xl">
                      $<AnimatedCounter end={50} suffix="B+" />
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Tracked Annually</p>
                  </AnimatedSection>
                </>
              )}
              {/* Add separators between stats */}
              {homepageData.stats && homepageData.stats.length > 1 && (
                <>
                  <div className="hidden h-12 w-px bg-border sm:block" />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section - Now powered by Sanity */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {homepageData.featuresHeadline || "Everything you need for financial clarity"}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {homepageData.featuresSubheadline || "From budgeting to investments, Spendtrails brings all your finances together."}
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {homepageData.features?.map((feature: any, index: number) => (
                <AnimatedSection key={feature.title || index} animation="fade-in-up" delay={index * 100}>
                  <FeatureCard
                    iconName={feature.iconName}
                    title={feature.title}
                    description={feature.description}
                    variant="large"
                  />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fade-in" delay={600} className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/features">Explore All Features</Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Security Section - Now powered by Sanity */}
        <section className="bg-muted/50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {homepageData.securitySection?.headline || "Your security is our priority"}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {homepageData.securitySection?.subheadline || "We use bank-level encryption and never sell your data. Your financial information stays private."}
              </p>
            </AnimatedSection>

            <AnimatedSection animation="scale-in" delay={200} className="mx-auto mt-12 max-w-3xl">
              <TrustBadges variant="default" />
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={400} className="mt-12 text-center">
              <Button asChild variant="link" className="text-primary">
                <Link href="/about#security">Learn more about our security practices</Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials section */}
        <TestimonialsMarquee />

        {/* Final CTA - Now powered by Sanity */}
        <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
          {/* Glow effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                {homepageData.finalCta?.headline || "Start your journey to financial clarity"}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                {homepageData.finalCta?.subheadline || "Download Spendtrails free and take the first step toward understanding your spending."}
              </p>
              <div className="mt-10 flex justify-center">
                <AppStoreButtons />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
