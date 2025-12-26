import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import { PiggyBank, Receipt, RefreshCw, Target, TrendingUp, Home, Smartphone, Zap, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore all Spendtrails features: smart budgeting, bill tracking, subscription management, savings goals, investment tracking, and rent reporting.",
}

const mainFeatures = [
  {
    icon: PiggyBank,
    title: "Smart Budgeting",
    description:
      "Create custom budgets for any spending category. See your progress in real-time and get notified before you overspend. Our intelligent categorization learns from your habits.",
    benefits: ["Custom budget categories", "Real-time spending alerts", "Month-over-month comparisons"],
  },
  {
    icon: Receipt,
    title: "Bill Tracking",
    description:
      "Never miss a payment again. Spendtrails automatically detects your recurring bills and sends timely reminders. See all upcoming bills at a glance.",
    benefits: ["Automatic bill detection", "Payment reminders", "Due date calendar view"],
  },
  {
    icon: RefreshCw,
    title: "Subscription Manager",
    description:
      "Find and track all your subscriptions in one place. Identify forgotten services draining your account and understand the true cost of your recurring expenses.",
    benefits: ["Find hidden subscriptions", "Track renewal dates", "Calculate monthly impact"],
  },
  {
    icon: Target,
    title: "Savings Goals",
    description:
      "Set savings targets for what matters to you—a vacation, emergency fund, or big purchase. Track your progress and celebrate milestones along the way.",
    benefits: ["Visual progress tracking", "Multiple simultaneous goals", "Automated goal projections"],
  },
  {
    icon: TrendingUp,
    title: "Investment Tracking",
    description:
      "See your investment accounts alongside your everyday spending. Get a complete picture of your financial health without switching between apps.",
    benefits: ["Portfolio overview", "Performance tracking", "Net worth calculations"],
  },
  {
    icon: Home,
    title: "Rent Reporting",
    description:
      "Build your credit history by reporting your rent payments. Turn your largest monthly expense into an opportunity to improve your financial future.",
    benefits: ["Build credit history", "Report to major bureaus", "No impact on existing credit"],
  },
]

const additionalFeatures = [
  {
    icon: Smartphone,
    title: "Multi-platform Access",
    description: "Access your finances on iOS, Android, or web. Your data syncs seamlessly across all devices.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get real-time alerts for large transactions, low balances, and unusual activity.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Export detailed spending reports for tax preparation, budgeting reviews, or personal records.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Features that bring clarity
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every feature in Spendtrails is designed with one goal: helping you understand and control your
                finances.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {mainFeatures.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={100}
                >
                  <div
                    className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon Visual */}
                    <div className="flex w-full justify-center lg:w-2/5">
                      <div className="relative">
                        <div className="h-48 w-48 rounded-3xl bg-muted sm:h-56 sm:w-56" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 sm:h-28 sm:w-28">
                            <feature.icon className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-3/5">
                      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{feature.title}</h2>
                      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                      <ul className="mt-6 space-y-3">
                        {feature.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">And more</h2>
              <p className="mt-4 text-muted-foreground">
                Additional features that make Spendtrails a complete solution.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
              {additionalFeatures.map((feature, index) => (
                <AnimatedSection key={feature.title} animation="fade-in-up" delay={index * 150}>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison / Why Choose */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <AnimatedSection animation="fade-in-up">
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Why users choose Spendtrails</h2>
              </AnimatedSection>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <AnimatedSection animation="slide-in-left" delay={100}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="text-4xl font-bold text-primary">5 min</p>
                    <p className="mt-2 text-sm text-muted-foreground">Average setup time</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="fade-in-up" delay={200}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="text-4xl font-bold text-primary">$500+</p>
                    <p className="mt-2 text-sm text-muted-foreground">Average annual savings found</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slide-in-right" delay={300}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="text-4xl font-bold text-primary">4.8</p>
                    <p className="mt-2 text-sm text-muted-foreground">App Store rating</p>
                  </div>
                </AnimatedSection>
              </div>
              <AnimatedSection animation="fade-in-up" delay={400} className="mt-10">
                <Button asChild size="lg">
                  <Link href="/download">Try Spendtrails Free</Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection variant="compact" headline="See these features in action" subheadline="Download now and explore." />
      </main>

      <Footer />
    </div>
  )
}
