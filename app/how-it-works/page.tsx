import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { TrustBadges } from "@/components/sections/trust-badges"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Link2, BarChart3, Target, Lightbulb, Shield, Clock, Smartphone } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Spendtrails helps you take control of your finances in four simple steps. Connect your accounts, see your spending, set goals, and get insights.",
}

const steps = [
  {
    step: 1,
    icon: Link2,
    title: "Connect your accounts",
    description:
      "Securely link your bank accounts, credit cards, and investment accounts. We use read-only access with bank-level encryption—we can never move your money.",
    highlights: ["Supports thousands of institutions", "Bank-level 256-bit encryption", "Read-only access only"],
  },
  {
    step: 2,
    icon: BarChart3,
    title: "See your spending clearly",
    description:
      "All your transactions are automatically categorized and organized. See exactly where your money goes with clear, intuitive visualizations.",
    highlights: ["Automatic transaction categorization", "Real-time balance updates", "Visual spending breakdowns"],
  },
  {
    step: 3,
    icon: Target,
    title: "Set budgets and goals",
    description:
      "Create custom budgets for any category. Set savings goals and track your progress. Get notified when you're approaching your limits.",
    highlights: ["Flexible budget categories", "Progress tracking", "Smart notifications"],
  },
  {
    step: 4,
    icon: Lightbulb,
    title: "Get insights and take control",
    description:
      "Receive personalized insights about your spending habits. Identify opportunities to save and make informed financial decisions.",
    highlights: ["Personalized recommendations", "Spending trend analysis", "Actionable insights"],
  },
]

const additionalInfo = [
  {
    icon: Clock,
    title: "Quick Setup",
    description: "Most users are up and running in under 5 minutes.",
  },
  {
    icon: Shield,
    title: "Always Secure",
    description: "Your data is protected with enterprise-grade security.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Access on iOS, Android, or any web browser.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Getting started is simple
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Spendtrails is designed to give you financial clarity in minutes, not hours. Here's how it works.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {steps.map((item, index) => (
                <AnimatedSection
                  key={item.step}
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
                            <item.icon className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
                          </div>
                        </div>
                        {/* Step badge */}
                        <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg">
                          {item.step}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-3/5">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Step {item.step}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{item.title}</h2>
                      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                      <ul className="mt-6 space-y-3">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3 text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {highlight}
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

        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">What you can expect</h2>
              <p className="mt-4 text-muted-foreground">A seamless experience from download to daily use.</p>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
              {additionalInfo.map((item, index) => (
                <AnimatedSection key={item.title} animation="fade-in-up" delay={index * 150}>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Security Reassurance */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Built with security first</h2>
              <p className="mt-4 text-muted-foreground">
                Your financial data is protected with the same security standards used by major banks.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={200} className="mx-auto mt-10 max-w-3xl">
              <TrustBadges variant="default" />
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <AnimatedSection animation="fade-in-up">
                <h2 className="text-center text-2xl font-semibold text-foreground sm:text-3xl">Common questions</h2>
              </AnimatedSection>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <AnimatedSection animation="slide-in-left" delay={100}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-foreground">Is my data safe?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We use 256-bit encryption and read-only connections. We can never move your money, and we never
                      sell your data.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slide-in-right" delay={200}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-foreground">How long does setup take?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Most users are up and running in under 5 minutes. Simply download, create an account, and connect.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slide-in-left" delay={300}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-foreground">What accounts can I connect?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Spendtrails supports thousands of financial institutions including banks, credit cards, and
                      investments.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slide-in-right" delay={400}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-foreground">Is Spendtrails free?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Spendtrails offers a free tier with core features. Premium features are available with a
                      subscription.
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection animation="fade-in-up" delay={500} className="mt-10 text-center">
                <Button asChild variant="outline">
                  <Link href="/about#security">Learn more about security</Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          variant="compact"
          headline="Ready to get started?"
          subheadline="Download Spendtrails free and see your finances clearly in minutes."
        />
      </main>

      <Footer />
    </div>
  )
}
